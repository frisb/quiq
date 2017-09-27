import * as serveFavicon from 'serve-favicon';

import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'before', priority: 4 })
export class ServeFavicon implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		serveFavicon(`${ process.cwd() }/public/favicon.ico`)(req, res, next);
	}
}
