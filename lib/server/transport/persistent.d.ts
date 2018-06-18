import { BaseTransport } from './base';
import { IPersistentTransportOptions } from '../contracts';
export declare class PersistentTransport extends BaseTransport {
    private retryInterval;
    private reconnectTimerID;
    private mustReconnect;
    constructor(options: IPersistentTransportOptions);
    disconnect(mustReconnect?: boolean): void;
    send(message: any): void;
    private reconnect;
}
