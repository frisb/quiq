/// <reference types="node" />
import { EventEmitter } from 'events';
import { State } from './state';
import { IBaseTransportOptions } from '../contracts';
export declare class BaseTransport extends EventEmitter {
    protected address: string;
    private socket;
    private protocol;
    constructor({ address, protocol }: IBaseTransportOptions);
    get state(): State;
    connect(address?: string): Promise<void>;
    disconnect(): void;
    send(message: string): void;
}
