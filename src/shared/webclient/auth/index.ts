import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse, IAuthWebClient, IWrappedToken } from '../contracts/index';
import { JsonWebClient } from '../json';
import { AuthToken } from './token';

export { IAuthWebClient }

export function AuthWebClient<TAuthToken extends AuthToken>(request: RequestFunction, TokenClass: { new(): TAuthToken }): { new(userAgent?: string): IAuthWebClient<TAuthToken> } {
	return class AuthWebClient extends JsonWebClient(request) implements IAuthWebClient<TAuthToken> {
		public token = new TokenClass();

		public async authorize(url: string, body: any, token?: string): Promise<IWrappedToken> {
			token = token || this.token.access;

			let headers: IRequestHeaders;

			if (token !== null)
				headers = { 'Authorization': `Bearer ${ token }` };

			let { data } = await this.post<IWrappedToken>(url, body, headers);

			let { access_token, expires_in } = data;

			if (access_token && expires_in)
				this.token.refresh(data);

			return data;
		}
	}
}