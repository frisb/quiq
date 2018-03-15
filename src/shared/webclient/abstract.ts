import { IRequestOptions, IResponse, RequestFunction } from './contracts/index';

export function AbstractWebClient(request: RequestFunction) {
	return class AbstractWebClient {
		constructor(public userAgent?: string) {}

		public request(options: IRequestOptions) {
			if (this.userAgent) {
				if (!options.headers)
					options.headers = {};

				options.headers['User-Agent'] = this.userAgent;
			}

			return request(options);
		}
	}
}