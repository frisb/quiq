import { RequestFunction, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken } from './contracts/index';
import { WebClient } from './generic';
import { JsonWebClient } from './json';
import { AuthWebClient } from './auth';
import { AuthToken } from './auth/token';

export * from './contracts';
export { AuthToken }

export function WebClientFactory(request: RequestFunction, AuthTokenClass?: { new(): AuthToken }) {
	return {
		WebClient: WebClient(request),
		JsonWebClient: JsonWebClient(request),
		AuthWebClient: AuthWebClient(request, AuthTokenClass)
	};
}
