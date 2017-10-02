import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

export class CORS implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		let { headers, method } = req;
		let { origin } = headers;

		if (origin)
			res.set('Access-Control-Allow-Origin', <string> origin);

		if (method === 'OPTIONS') {
			res.set({
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': headers['access-control-request-headers']
			});

			res.end();
		}
		else {
			next();
		}
	}
}