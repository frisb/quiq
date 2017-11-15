import { HttpError } from 'routing-controllers';
import { ISigningOptions } from './contracts';
import { IWrappedToken } from '../shared/';
export declare class IpAddressError extends HttpError {
    constructor();
}
export declare class HostError extends HttpError {
    constructor();
}
export declare class NoTokenError extends HttpError {
    constructor();
}
export declare class TokenInvalidError extends HttpError {
    constructor(err: Error);
}
export declare class Tokenizer {
    signing: ISigningOptions;
    constructor(signing: ISigningOptions);
    wrap(remoteIP: string, channelOrigin: string, data: any, include?: string[]): IWrappedToken;
    unwrap(remoteIP: string, channelOrigin: string, token: string): Promise<{}>;
}
