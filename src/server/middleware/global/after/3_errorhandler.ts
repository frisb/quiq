// import * as errorhandler from 'errorhandler';

import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Writeln } from 'writeln';

const logger = new Writeln('Error Handler Middleware');
const env = process.env.NODE_ENV || 'dev';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
	public error(error: any, req: Request, res: Response, next: NextFunction) {
		let { httpCode, message, stack } = error;
		let payload = {
			error: {
				code: httpCode,
				message,
				stack: {}
			}
		};

		logger.error(message, {
			error,
			payload: req.body
		});

		if (env !== 'production') {
			// errorhandler()(error, req, res, next);

			payload.error.stack = stack;
		}

		res.status(httpCode || 500).json(payload);
	}
}
