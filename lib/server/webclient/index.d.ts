import { IWebClient, IJsonWebClient, IAuthWebClient, AuthToken } from '../../shared';
export declare const WebClient: new (userAgent?: string) => IWebClient, JsonWebClient: new (userAgent?: string) => IJsonWebClient, AuthWebClient: new (userAgent?: string) => IAuthWebClient<AuthToken>;
export * from '../../shared/webclient';
