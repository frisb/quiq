import http from 'http';
import https from 'https';
import _ from 'lodash';

import { Logger } from 'writeln';
import { urlParser, IRequestOptions, IResponse } from '../../shared';

const logger = new Logger('Web Client');

export function request({ url, method, headers, body }: IRequestOptions): Promise<IResponse<string>> {
	return new Promise((resolve, reject) => {
		let { protocol, host, port, path, query }  = urlParser.parse(url);

		let isSSL = protocol === 'https';
		let sData: string;

		path += query || '';

		if (body) {
			sData = JSON.stringify(body);

			if (!headers)
				headers = {};

			headers['Content-Length'] = sData ? Buffer.byteLength(sData) : 0
		}

		let options: http.RequestOptions = {
			host,
			port: parseInt(port || (isSSL ? '443' : '80'), 10),
			path,
			method,
			headers
		};

		let client = isSSL ? https : http;

		logger.debug('request %o', _.extend(options, { body: body || '' }));

		let req = (<any> client).request(options, function (res: http.IncomingMessage): void {
			let data = '';

			res.setEncoding('utf8');

			res.on('data', function (chunk: string) {
				if (chunk !== null)
					data += chunk;
			});

			res.on('end', function () {
				let response = {
					code: res.statusCode,
					data
				};

				logger.debug('response %o', response);

				resolve(response);
			});
		});

		req.on('error', function (e: Error) {
			logger.error('Error %o', e);

			reject(e);
		});

		if ((method === 'POST' || method === 'PUT') && sData) {
			req.write(sData);
		}

		req.end();
	});
}
