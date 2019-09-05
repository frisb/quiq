import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after', priority: 0 })
export class Final implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		// no next() called.
	}
}