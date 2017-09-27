import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { IWSServerOptions, IWSSocket, ISession } from '../contracts';
import { AbstractClient } from './client';
import { AbstractGateway } from './gateway';
import { AbstractSession } from './session';
export declare abstract class AbstractServer<TSession extends ISession, TClient extends AbstractClient<TSession>, TGateway extends AbstractGateway<TSession>> extends WebSocket.Server {
    static getSession<S extends AbstractSession<S, C, G>, C extends AbstractClient<S>, G extends AbstractGateway<S>>(id: string): S;
    private tokenizer;
    constructor(options: IWSServerOptions);
    handleUpgrade(request: IncomingMessage, socket: Socket, upgradeHead: Buffer, callback: (cws: WebSocket) => void): Promise<void>;
    protected useTokens(protocol: string): boolean;
    protected abstract getSessionClass(protocol: string): {
        new (client: TClient, gateway: TGateway): TSession;
    };
    protected abstract getClientClass(protocol: string): {
        new (socket: IWSSocket): TClient;
    };
    protected abstract getGatewayClass(protocol: string): {
        new (): TGateway;
    };
    private baseUpgrade(request, socket, upgradeHead);
}
