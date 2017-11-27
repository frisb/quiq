import { RequestFunction, IAuthWebClient, IAuthToken } from '../contracts/index';
export { IAuthWebClient };
export declare function AuthWebClient<TAuthToken extends IAuthToken>(request: RequestFunction, TokenClass: {
    new (): TAuthToken;
}): {
    new (userAgent?: string): IAuthWebClient<TAuthToken>;
};
