import { IWebClient } from './IWebClient';
import { IJsonWebClient } from './IJsonWebClient';
import { IAuthWebClient } from './IAuthWebClient';

export interface IWeb<TAuthToken> {
	WebClient: { new(userAgent?: string): IWebClient };
	JsonWebClient: { new(userAgent?: string): IJsonWebClient };
	AuthWebClient: { new(userAgent?: string): IAuthWebClient<TAuthToken> };
}
