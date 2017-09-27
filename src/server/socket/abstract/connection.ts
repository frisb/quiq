import { EventEmitter } from 'events';
import { IConnection, ISession } from '../contracts';

export abstract class AbstractConnection<TSession extends ISession>
extends EventEmitter
implements IConnection {
	[key: string]: any;

	protected session: TSession = null;

	public init(session: ISession) {
    this.session = <TSession> session;

    this.onInit();
	}

	public close() {
		this.removeAllListeners();
		this.onClosed();
	}

	public abstract onInit(): void;

	public abstract onClosed(): void;

	public abstract get isInitialized(): boolean;
}
