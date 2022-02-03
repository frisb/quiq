import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const env = process.env.NODE_ENV || 'dev';
const clientPath = `${ process.cwd() }/client/${ env }`;

@Middleware({ type: 'after', priority: 30 })
export class StaticClient implements ExpressMiddlewareInterface {
	public use(req: Request, res: Response, next?: NextFunction): any {
		if (!res.finished) {
			express.static(clientPath)(req, res, next);
		}
		else {
			next();
		}
	}
}
