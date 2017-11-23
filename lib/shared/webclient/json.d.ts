import { RequestFunction, IJsonWebClient } from './contracts/index';
export declare function JsonWebClient(request: RequestFunction): {
    new (userAgent?: string): IJsonWebClient;
};
