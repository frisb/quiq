import * as WebSocket from 'ws';
import { IncomingMessage, STATUS_CODES } from 'http';
import { Socket } from 'net';
import { process } from 'ipaddr.js';
import { Writeln } from 'writeln';
import { IWSServerOptions, IWSSocket, ISession } from '../contracts';
import { Tokenizer, NoTokenError } from '../../tokenizer';
import { AbstractClient } from './client';
import { AbstractGateway } from './gateway';
import { AbstractSession } from './session';

const logger = new Writeln('WebSocket Server');

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @private
 */
function abortConnection (socket: Socket, code: number, message: string, err?: Error) {
	if (socket.writable) {
		message = message || STATUS_CODES[code];
		socket.write(
			`HTTP/1.1 ${ code } ${ STATUS_CODES[code] }\r\n` +
			'Connection: close\r\n' +
			'Content-type: text/html\r\n' +
			`Content-Length: ${ Buffer.byteLength(message) }\r\n` +
			'\r\n' +
			message
		);
	}

	socket.destroy();

	logger.error(`${ code } ${ message }`, err);
}

// export function protocol<TClient extends Client<ISession>>(test: string) {
// 	return function<TServer extends Server<ISession, TClient, Gateway<ISession>>>(target: TServer) {
//     // save a reference to the original constructor
// 		const original = target;

// 		// a utility function to generate instances of a class
// 		function construct(constructor: TServer, args: any) {
// 			function c(): void {
// 				return (<any> constructor).apply(this, args);
// 			}

// 			c.prototype = (<any> constructor).prototype;

// 			return new (<any> c)();
// 		}

// 		// the new constructor behaviour
// 		function f(...args: Array<any>) {
// 			console.log("New: " + (<any> original).name);
// 			return construct(original, args);
// 		}

// 		// copy prototype so intanceof operator still works
// 		f.prototype = (<any> original).prototype;

// 		// return new constructor (will override original)
// 		return f;
// 	};
// }

export abstract class AbstractServer<TSession extends ISession, TClient extends AbstractClient<TSession>, TGateway extends AbstractGateway<TSession>>
extends WebSocket.Server {

	/**
	 * Get session
	 * @param {string} id
	 */
	public static getSession<S extends AbstractSession<S, C, G>, C extends AbstractClient<S>, G extends AbstractGateway<S>>(id: string): S {
		return <S> AbstractSession.get<S, C, G>(id);
	}

	private tokenizer: Tokenizer = null;

	public constructor(options: IWSServerOptions) {
		super(options);

		let { signing } = options;

		if (signing)
			this.tokenizer = new Tokenizer(signing);

		this.on('connection', (...args: any[]): void => {
			let socket: IWSSocket = args[0];
			let { protocol, tokenData } = socket;

			let SessionType = this.getSessionClass(protocol);
			let ClientType = this.getClientClass(protocol);
			let GatewayType = this.getGatewayClass(protocol);

			let session: TSession;
			let client = new ClientType(socket);

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

						// abortConnection(socket, code, reason);
						client.close();
					});
			}
		});
	}

	public async handleUpgrade(request: IncomingMessage, socket: Socket, upgradeHead: Buffer, callback: (cws: WebSocket) => void) {
		let clientSocket = await this.baseUpgrade(request, socket, upgradeHead);

		let { url } = request;
		let { remoteAddress, localPort } = socket;
		let ipv4 = process(remoteAddress).toString();
		let channelHost = clientSocket.upgradeReq.headers.host;

		if (channelHost.indexOf(':') < 0)
			channelHost += `:${ localPort }`;

		if (ipv4 === '::1')
			ipv4 = '127.0.0.1';

		if (this.useTokens(clientSocket.protocol)) {
			try {
				if (url.length > 20) {
					let token = url.substr(1);
					let tokenData = await this.tokenizer.unwrap(ipv4, channelHost, token);

					clientSocket.tokenData = tokenData;
					clientSocket.ipv4 = ipv4;

					callback(clientSocket);
				}
				else {
					throw new NoTokenError();
				}
			}
			catch (err) {
				abortConnection(socket, err.httpCode, err.message, err);
			}
		}
		else {
			callback(clientSocket);
		}
	}

	protected useTokens(protocol: string): boolean {
		return this.tokenizer !== null;
	}

	protected abstract getSessionClass(protocol: string): { new(client: TClient, gateway: TGateway): TSession };

	protected abstract getClientClass(protocol: string): { new(socket: IWSSocket): TClient };

	protected abstract getGatewayClass(protocol: string): { new(): TGateway };

	private baseUpgrade(request: IncomingMessage, socket: Socket, upgradeHead: Buffer): Promise<any> {
		return new Promise((resolve) => super.handleUpgrade(request, socket, upgradeHead, resolve));
	}
}
