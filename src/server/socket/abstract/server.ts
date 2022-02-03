import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { process } from 'ipaddr.js';
import { Logger } from 'writeln';
import { IWSServerOptions, IWSSocket, ISession, IIncomingMessage } from '../contracts';
import { Tokenizer, NoTokenError } from '../../tokenizer';
import { AbstractClient } from './client';
import { AbstractGateway } from './gateway';
import { AbstractSession } from './session';

const logger = new Logger('WebSocket Server');

interface IX { origin: string; secure: boolean; req: IncomingMessage }
type T = (res: boolean, code?: number, message?: string) => void;

export abstract class AbstractServer<TSession extends ISession, TClient extends AbstractClient<TSession, any>, TGateway extends AbstractGateway<TSession>> {

	/**
	 * Get session
	 * @param {string} id
	 */
	public static getSession<S extends AbstractSession<S, C, G>, C extends AbstractClient<S, any>, G extends AbstractGateway<S>>(id: string): S {
		return <S> AbstractSession.get<S, C, G>(id);
	}

	private tokenizer: Tokenizer = null;

	public constructor(options: IWSServerOptions) {
		const wsServer = new WebSocket.Server(Object.assign(options, { verifyClient: options.verifyClient || this.verifyClient.bind(this) }));

		const { signing } = options;

		if (signing)
			this.tokenizer = new Tokenizer(signing);

		wsServer.on('connection', (socket: IWSSocket, request: IIncomingMessage<any>): void => {
			const { tokenData, protocol } = request;

			const SessionType = this.getSessionClass(protocol);
			const ClientType = this.getClientClass(protocol);
			const GatewayType = this.getGatewayClass(protocol);

			let session: TSession;
			const client = new ClientType(socket, request);

			if (tokenData && tokenData.sessionID) {
				session = <any> AbstractServer.getSession(tokenData.sessionID);
			}

			if (session) {
				logger.debug(`Resuming existing session ${ session.ID }`);

				session.client = client;
			}
			else {
				let gateway: TGateway;

				if (GatewayType)
					gateway = new GatewayType();

				session = new SessionType(client, gateway);

				logger.debug(`Creating new session ${ session.ID } with client${ gateway ? ' and gateway' : '' }`);

				session
					// .on('registered', function () {
					// 	// add to B: dict
					// })
					.on('end', function (code: number, reason: string) {
						// remove from dictionary
						// session = null;

						// abortHandshake(socket, code, reason);
						client.close();
					});
			}
		});
	}

	protected useTokens(protocol: string): boolean {
		return this.tokenizer !== null;
	}

	protected abstract getSessionClass(protocol: string): { new(client: TClient, gateway: TGateway): TSession };

	protected abstract getClientClass(protocol: string): { new(socket: IWSSocket, request: IncomingMessage): TClient };

	protected abstract getGatewayClass(protocol: string): { new(): TGateway };

	private async verifyClient(info: IX, callback: T) {
		const req = info.req as IIncomingMessage<any>;
		const {
			url,
			headers: { host, ['sec-websocket-protocol']: protocol },
			socket: { remoteAddress, localPort }
		} = req;

		req.protocol = protocol as string;

		let ipv4 = process(remoteAddress).toString();
		let channelHost = host;

		if (channelHost.indexOf(':') < 0)
			channelHost += `:${ localPort }`;

		if (ipv4 === '::1')
			ipv4 = '127.0.0.1';

		if (this.useTokens(req.protocol)) {
			// try {
				if (url.length > 20) {
					const token = url.substr(1);

					req.tokenData = await this.tokenizer.unwrap(ipv4, channelHost, token);
					req.ipv4 = ipv4;

					callback(true);
				}
				else {
					throw new NoTokenError();
				}
			// }
			// catch (err) {
			// 	callback(false, err.httpCode, err.message);
			// }
		}
		else {
			callback(true);
		}
	}
}
