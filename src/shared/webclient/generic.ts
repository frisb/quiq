import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse, IWebClient } from './contracts/index';
import { AbstractWebClient } from './abstract';

export function WebClient(request: RequestFunction) {
	return class WebClient extends AbstractWebClient(request) implements IWebClient {
		public async get(url: string, headers?: IRequestHeaders) {
			return await this.request({ method: 'GET', url, headers });
		}

		public async post(url: string, body: any, headers?: IRequestHeaders) {
			return await this.request({ method: 'POST', url, body, headers });
		}

		public async put(url: string, body: any, headers?: IRequestHeaders) {
			return await this.request({ method: 'PUT', url, body, headers });
		}

		public async delete(url: string, headers?: IRequestHeaders) {
			return await this.request({ method: 'DELETE', url, headers });
		}
	}
}
