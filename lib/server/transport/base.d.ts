import { EventEmitter } from 'events';
import { State } from './state';
import { IBaseTransportOptions } from '../contracts';
export declare class BaseTransport extends EventEmitter {
    protected address: string;
    private socket;
    private protocol;
    constructor({address, protocol}: IBaseTransportOptions);
    readonly state: State;
    connect(address?: string): Promise<{}>;
    disconnect(): void;
    send(message: string): void;
}
