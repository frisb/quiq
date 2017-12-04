/// <reference types="node" />
import { IWSSocket, IClient, ISession, IEnvelope, Message } from '../contracts';
import { AbstractConnection } from './connection';
import { IncomingMessage } from 'http';
export declare abstract class AbstractClient<TSession extends ISession> extends AbstractConnection<TSession> implements IClient {
    socket: IWSSocket;
    constructor(socket: IWSSocket, request: IncomingMessage);
    readonly isInitialized: boolean;
    close(): void;
    send(payloadOrPromise: any): Promise<{}>;
    error(code: number, message: string, error?: Error): void;
    abstract parseEnvelope(payload: string): IEnvelope<any>;
    abstract parseMessage(envelope: IEnvelope<any>): Message<any>;
    abstract getEventName(message: any): string;
    private sendSync(payload);
}
