import { RequestFunction, IWeb, IAuthToken } from './contracts/index';
import { AuthToken } from './auth/token';
export * from './contracts/index';
export { AuthToken };
export declare function WebClientFactory<TAuthToken extends IAuthToken>(request: RequestFunction, AuthTokenClass?: {
    new (): TAuthToken;
}): IWeb<TAuthToken>;
