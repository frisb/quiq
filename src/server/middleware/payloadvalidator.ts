import { ExpressMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Writeln } from 'writeln';

const logger = new Writeln('Payload Validator');

class PayloadError extends HttpError {
	constructor() {
		super(400, 'Bad Request');
	}
}

export function PayloadValidator(...fieldNames: string[]): any {
	class PayloadValidator implements ExpressMiddlewareInterface {
		public use(req: Request, res: Response, next?: NextFunction): any {
			let { body, method } = req;
			let isValid: Boolean = true;

			if (!body) {
				logger.error(`Body not found for ${ method.toUpperCase() } request`);

				isValid = false;
			}
			else {
				for (let i = 0, {length} = fieldNames; i < length; i++) {
					let name: string = fieldNames[i];

					if (!body[name]) {
						logger.error(`Body param "${ name }" not found in payload for ${ method.toUpperCase() } request`, body);

						isValid = false;
						break;
					}
				}
			}

			if (!isValid)
				throw new PayloadError();

			next();
		}
	}

	return PayloadValidator;
}
