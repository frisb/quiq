import { EventEmitter } from 'events';
import { IConnection, ISession } from '../contracts';
export declare abstract class AbstractConnection<TSession extends ISession> extends EventEmitter implements IConnection {
    [key: string]: any;
    protected session: TSession;
    init(session: ISession): void;
    close(): void;
    abstract onInit(): void;
    abstract onClosed(): void;
    readonly abstract isInitialized: boolean;
}
