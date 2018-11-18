import { IWSSocket, IClient, ISession, IEnvelope, Message, IIncomingMessage } from '../contracts';
import { AbstractConnection } from './connection';
export declare abstract class AbstractClient<TSession extends ISession> extends AbstractConnection<TSession> implements IClient {
    socket: IWSSocket;
    protected request: IIncomingMessage;
    constructor(socket: IWSSocket, request: IIncomingMessage);
    readonly isInitialized: boolean;
    close(): void;
    send(payloadOrPromise: any): Promise<{}>;
    error(code: number, message: string, error?: Error): void;
    abstract parseEnvelope(payload: string): IEnvelope<any>;
    abstract parseMessage(envelope: IEnvelope<any>): Message<any>;
    abstract getEventName(message: any): string;
    private sendSync;
}
