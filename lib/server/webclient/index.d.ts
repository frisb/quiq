import { IWebClient, IJsonWebClient, IAuthWebClient } from '../../shared';
import { Token } from './token';
export declare const WebClient: new (userAgent?: string) => IWebClient, JsonWebClient: new (userAgent?: string) => IJsonWebClient, AuthWebClient: new (userAgent?: string) => IAuthWebClient<Token>;
export * from '../../shared/webclient';
