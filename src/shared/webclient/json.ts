import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse, IJsonWebClient } from './contracts';
import { AbstractWebClient } from './abstract';

export function JsonWebClient(request: RequestFunction) {
	async function jsonRequest<T>(options: IRequestOptions): Promise<IResponse<T>> {
		if (!options.headers)
			options.headers = {};

		options.headers['Content-Type'] = 'application/json';

		let response = await request(options);
		response.data = <T>JSON.parse(response.data);
		return response;
	}

	return class JsonWebClient extends AbstractWebClient(jsonRequest) implements IJsonWebClient {
		public async get<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>> {
			return await this.request({ method: 'GET', url, headers });
		}

		public async post<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>> {
			return await this.request({ method: 'POST', url, body, headers });
		}

		public async put<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>> {
			return await this.request({ method: 'PUT', url, body, headers });
		}

		public async delete<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>> {
			return await this.request({ method: 'DELETE', url, headers });
		}
	}
}