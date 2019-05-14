/// <reference types="node" />
import { IncomingMessage } from 'http';
import { IWSServerOptions, IWSSocket, ISession, IIncomingMessage } from '../../contracts';
import { Tokenizer } from '../../../tokenizer';
import { AbstractClient } from '../client';
import { AbstractGateway } from '../gateway';
import { AbstractSession } from '../session';
export declare abstract class AbstractServer<TSession extends ISession, TClient extends AbstractClient<TSession>, TGateway extends AbstractGateway<TSession>> {
    static getSession<S extends AbstractSession<S, C, G>, C extends AbstractClient<S>, G extends AbstractGateway<S>>(id: string): S;
    readonly tokenizer: Tokenizer;
    constructor(options: IWSServerOptions);
    protected useTokens(protocol: string): boolean;
    protected abstract getSessionClass(protocol: string): {
        new (client: TClient, gateway: TGateway): TSession;
    };
    protected abstract getClientClass(protocol: string): {
        new (socket: IWSSocket, request: IncomingMessage): TClient;
    };
    protected abstract getGatewayClass(protocol: string): {
        new (): TGateway;
    };
    protected onConnected(socket: IWSSocket, request: IIncomingMessage): void;
    private createServer;
    private verifyClient;
}
