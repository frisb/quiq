import { RequestFunction, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken, IWeb, IAuthToken } from './contracts/index';
import { WebClient } from './generic';
import { JsonWebClient } from './json';
import { AuthWebClient } from './auth/index';
import { AuthToken } from './auth/token';

export * from './contracts/index';
export { AuthToken };

export function WebClientFactory<TAuthToken extends IAuthToken>(request: RequestFunction, AuthTokenClass?: { new(): TAuthToken }): IWeb<TAuthToken> {
	return {
		WebClient: WebClient(request),
		JsonWebClient: JsonWebClient(request),
		AuthWebClient: AuthWebClient<TAuthToken>(request, AuthTokenClass)
	};
}
