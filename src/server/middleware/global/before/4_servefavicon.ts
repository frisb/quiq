import * as serveFavicon from 'serve-favicon';
import { existsSync } from 'fs';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

const filePath = `${ process.cwd() }/public/favicon.ico`;
const hasFavicon = existsSync(filePath);

@Middleware({ type: 'before', priority: 4 })
export class ServeFavicon implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		if (hasFavicon) {
			serveFavicon(filePath)(req, res, next);
		}
		else {
			next();
		}
	}
}
