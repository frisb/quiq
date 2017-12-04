import { IRequestOptions, IResponse, RequestFunction } from './contracts/index';

export function AbstractWebClient(request: RequestFunction) {
	return class AbstractWebClient {
		constructor(public userAgent?: string) {}

		public request(options: IRequestOptions) {
			return request(options);
		}
	}
}