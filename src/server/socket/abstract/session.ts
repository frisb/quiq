import { EventEmitter } from 'events';
import { ISession } from '../contracts';
import { AbstractClient } from './client';
import { AbstractGateway } from './gateway';
import { generateID } from '../../idgenerator';

export abstract class AbstractSession<TSession extends AbstractSession<TSession, TClient, TGateway>, TClient extends AbstractClient<TSession, any>, TGateway extends AbstractGateway<TSession>>
extends EventEmitter
implements ISession {
	public static add(session: ISession): void {
		this.cache[session.ID] = session;
	}

	public static get<S extends AbstractSession<S, C, G>, C extends AbstractClient<S, any>, G extends AbstractGateway<S>>(id: string): AbstractSession<S, C, G> {
		return <S> this.cache[id];
	}

	// public static createInstance<S extends Session<S, C, G>, C extends Client<S>, G extends Gateway<S>>(SessionType: { new(c: C, g: G): S }, client: C, gateway?: G): Session<S, C, G> {
	// 	return new SessionType(client, gateway);
	// }

	public static remove(id: string): void {
		this.cache[id] = null;
		delete this.cache[id];
	}

	private static cache: { [id: string]: ISession; } = {};

	public ID: string;

	private _client: TClient = null;
	private _gateway: TGateway = null;
	private _backgroundTimerID: NodeJS.Timer = null;

	public get client(): TClient {
		return this._client;
	}

	public set client(val: TClient) {
		if (val !== null) {
			this._client = val;

			this._client.on('close', (code: number, message: string) => {
				this.client = null;

				let min = this.backgroundMins;

				if (min > 0) {
					this._backgroundTimerID = setTimeout(() => this.end(code, message), min * 60 * 1000);
				}
				else {
					this.end(code, message);
				}
			});

			if (this._backgroundTimerID !== null) {
				clearTimeout(this._backgroundTimerID);
				this._backgroundTimerID = null;
			}

			this._client.init(this);
		}
	}

	public get gateway(): TGateway {
		return this._gateway;
	}

	public set gateway(val: TGateway) {
		if (val !== null) {
			this._gateway = val;
			this._gateway.init(this);
		}
	}

  public constructor(client: TClient, gateway: TGateway = null) {
		super();

		this.ID = generateID();

		// gateway must be added before client for client to access
		this.gateway = gateway;
		this.client = client;

		AbstractSession.add(this);
  }

	public end(code?: number, message?: string) {
		if (this.client !== null) {
			this.client.close();
			this.client = null;
		}

		if (this.gateway !== null) {
			this.gateway.close();
			this.gateway = null;
		}

		this.emit('end', code, message);
		AbstractSession.remove(this.ID);
	}

	public abstract get backgroundMins(): number;
}
