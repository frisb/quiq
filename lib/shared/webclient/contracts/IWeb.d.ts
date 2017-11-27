import { IWebClient } from './IWebClient';
import { IJsonWebClient } from './IJsonWebClient';
import { IAuthWebClient } from './IAuthWebClient';
import { IAuthToken } from './IAuthToken';
export interface IWeb<TAuthToken extends IAuthToken> {
    WebClient: {
        new (userAgent?: string): IWebClient;
    };
    JsonWebClient: {
        new (userAgent?: string): IJsonWebClient;
    };
    AuthWebClient: {
        new (userAgent?: string): IAuthWebClient<TAuthToken>;
    };
}
