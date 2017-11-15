import { IRequestOptions, IResponse, RequestFunction } from './contracts';

export function AbstractWebClient(request: RequestFunction) {
	return class AbstractWebClient {
		constructor(public userAgent?: string) {}

		public request(options: IRequestOptions) {
			if (!options.headers)
				options.headers = {};

			options.headers['User-Agent'] = this.userAgent;

			return request(options);
		}
	}
}