import { IBaseTransportOptions } from './IBaseTransportOptions';
export interface IPersistentTransportOptions extends IBaseTransportOptions {
    retryInterval: number;
}
