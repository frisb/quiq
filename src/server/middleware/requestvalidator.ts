import { ExpressMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'writeln';

const logger = new Logger('Request Validator');

interface ICollection {
	[key: string]: any;
}

class RequestValidatorError extends HttpError {
	constructor() {
		super(400, 'Bad Request');
	}
}

function validate(type: string, method: string, collection: ICollection, fieldNames: Array<string>) {
	for (let i = 0, {length} = fieldNames; i < length; i++) {
		let name: string = fieldNames[i];

		if (typeof collection[name] === 'undefined') {
			logger.error(`Header param "${ name }" not found in ${ type } for ${ method.toUpperCase() } request`, collection);

			throw new RequestValidatorError();
		}
	}
}

export function HeaderValidator(...fieldNames: string[]): any {
	class HeaderValidator implements ExpressMiddlewareInterface {
		public use(req: Request, res: Response, next?: NextFunction): any {
			let { headers, method } = req;

			validate('header', method, headers, fieldNames.map((header) => header.toLowerCase()));

			next();
		}
	}

	return HeaderValidator;
}

export function BodyValidator(...fieldNames: string[]): any {
	class BodyValidator implements ExpressMiddlewareInterface {
		public use(req: Request, res: Response, next?: NextFunction): any {
			let { body, method } = req;

			if (!body) {
				logger.error(`Body not found for ${ method.toUpperCase() } request`);

				throw new RequestValidatorError();
			}
			else {
				validate('body', method, body, fieldNames);
			}

			next();
		}
	}

	return BodyValidator;
}
