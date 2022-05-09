import { Middleware, ExpressMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'before', priority: 40 })
export class UserAgent implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		let userAgent = <string> req.headers['user-agent'];

		// if (!userAgent) {
		// 	next(new HttpError(403, 'Forbidden'));
		// }
		// else
			if (userAgent.toLowerCase() !== 'libwww-perl') {
			next();
		}
	}
}
