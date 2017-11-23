import { IWebClient } from './IWebClient';
import { IJsonWebClient } from './IJsonWebClient';
import { IAuthWebClient } from './IAuthWebClient';
import { AuthToken } from '../index';

export interface IWeb<TAuthToken extends AuthToken> {
	WebClient: { new(userAgent?: string): IWebClient };
	JsonWebClient: { new(userAgent?: string): IJsonWebClient };
	AuthWebClient: { new(userAgent?: string): IAuthWebClient<TAuthToken> };
}
