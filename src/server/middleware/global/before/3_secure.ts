import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'before', priority: 3 })
export class Secure implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		let { path, protocol, hostname, url } = req;

		if (path === '/' && protocol !== 'https' && hostname.indexOf('localhost') < 0) {
			res.redirect(`https://${ hostname }${ url }`);
		}
		else {
			next();
		}
	}
}
