import { RequestFunction, IWebClient } from './contracts/index';
export { IWebClient };
export declare function WebClient(request: RequestFunction): {
    new (userAgent?: string): IWebClient;
};
