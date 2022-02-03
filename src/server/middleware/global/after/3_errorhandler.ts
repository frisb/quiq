// import * as errorhandler from 'errorhandler';

import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'writeln';

interface IErrorResponse {
	error: {
		code: number;
		message: string;
		stack?: string;
	}
}

const logger = new Logger('Error Handler Middleware');
const env = process.env.NODE_ENV || 'dev';

@Middleware({ type: 'after', priority: 10 })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
	public error(error: any, req: Request, res: Response, next: NextFunction) {
		let { method, headers, body } = req;
		let { httpCode, message, stack } = error;
		let response: IErrorResponse = {
			error: {
				code: httpCode,
				message
			}
		};

		logger.error(message, {
			method: method.toLocaleUpperCase(),
			headers,
			body,
			stack
		});

		if (env !== 'production') {
			// errorhandler()(error, req, res, next);

			response.error.stack = stack;
		}

		res.status(httpCode || 500).json(response);
	}
}
