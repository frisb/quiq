import { json, urlencoded } from 'body-parser';

import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

export class JsonBodyParser implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		json()(req, res, next);
	}
}

export class UrlEncodedBodyParser implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		urlencoded()(req, res, next);
	}
}
