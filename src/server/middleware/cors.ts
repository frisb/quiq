import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

export class CORS implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		let { headers, method } = req;
		let { origin } = headers;

		if (origin)
			res.set('Access-Control-Allow-Origin', <string> origin);

		if (method === 'OPTIONS' || method === 'GET') {
			const accessControlHeaders = {
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Methods': '*'
			} as any;

			if (headers['access-control-request-headers'])
				accessControlHeaders['Access-Control-Allow-Headers'] = headers['access-control-request-headers'];

			res.set(accessControlHeaders);
		}

		if (method === 'OPTIONS') {
			res.end();
		}
		else {
			next();
		}
	}
}