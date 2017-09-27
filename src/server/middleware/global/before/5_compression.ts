import * as compression from 'compression';

import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'before', priority: 5 })
export class Compression implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		compression()(req, res, next);
	}
}
