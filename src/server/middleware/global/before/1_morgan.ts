import * as morgan from 'morgan';

import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import { IRequest } from '../../../contracts';

@Middleware({ type: 'before', priority: 1 })
export class Morgan implements ExpressMiddlewareInterface  {
	public use(req: IRequest, res: Response, next?: NextFunction): any {
		morgan('dev', {
			skip: function () {
				return typeof(req.ID) !== 'undefined';
			}
		})(req, res, next);
	}
}
