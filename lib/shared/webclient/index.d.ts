import { RequestFunction, IWeb } from './contracts/index';
import { AuthToken } from './auth/token';
export * from './contracts/index';
export { AuthToken };
export declare function WebClientFactory(request: RequestFunction, AuthTokenClass?: {
    new (): AuthToken;
}): IWeb<AuthToken>;
