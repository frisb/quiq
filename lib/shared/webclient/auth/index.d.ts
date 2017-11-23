import { RequestFunction, IAuthWebClient } from '../contracts/index';
import { AuthToken } from './token';
export { IAuthWebClient };
export declare function AuthWebClient<TAuthToken extends AuthToken>(request: RequestFunction, TokenClass: {
    new (): TAuthToken;
}): {
    new (userAgent?: string): IAuthWebClient<TAuthToken>;
};
