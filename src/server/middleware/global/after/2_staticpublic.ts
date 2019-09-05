import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import * as express from 'express';

const env = process.env.NODE_ENV || 'dev';

@Middleware({ type: 'after', priority: 20 })
export class StaticPublic implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		if (!res.finished) {
			express.static(`${ process.cwd() }/public`)(req, res, next);
		}
		else {
			next();
		}
	}
}
