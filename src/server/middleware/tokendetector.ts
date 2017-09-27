import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import { Tokenizer, NoTokenError } from '../tokenizer';
import { IRequest, ISigningOptions } from '../contracts';

export function TokenDetector(signing: ISigningOptions, isOptional = false): any {
	const tokenizer = new Tokenizer(signing);

	class TokenDetector implements ExpressMiddlewareInterface {
		public async use(req: IRequest, res: Response, next?: NextFunction): Promise<void> {
			let { ipv4, hostname, socket, authorizationBearer } = req;
			let channelHost = `${ hostname }:${ socket.localPort }`;

			if (authorizationBearer) {
				let token = authorizationBearer;
				let tokenData = await tokenizer.unwrap(ipv4, channelHost, token);

				req.tokenData = tokenData;

				next();
			}
			else if (isOptional) {
				next();
			}
			else {
				throw new NoTokenError();
			}
		};
	}

	return TokenDetector;
}
