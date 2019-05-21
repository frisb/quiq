/// <reference types="node" />
import { EventEmitter } from 'events';
import { ISession } from '../contracts';
import { AbstractClient } from './client';
import { AbstractGateway } from './gateway';
export declare abstract class AbstractSession<TSession extends AbstractSession<TSession, TClient, TGateway>, TClient extends AbstractClient<TSession, any>, TGateway extends AbstractGateway<TSession>> extends EventEmitter implements ISession {
    static add(session: ISession): void;
    static get<S extends AbstractSession<S, C, G>, C extends AbstractClient<S, any>, G extends AbstractGateway<S>>(id: string): AbstractSession<S, C, G>;
    static remove(id: string): void;
    private static cache;
    ID: string;
    private _client;
    private _gateway;
    private _backgroundTimerID;
    client: TClient;
    gateway: TGateway;
    constructor(client: TClient, gateway?: TGateway);
    end(code?: number, message?: string): void;
    abstract readonly backgroundMins: number;
}
