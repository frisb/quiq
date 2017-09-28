import * as chalk from 'chalk';
import { Middleware, ExpressMiddlewareInterface, UseBefore } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import { process } from 'ipaddr.js';
import { generateID } from '../../../idgenerator';
import { Writeln } from 'writeln';
import { json, urlencoded } from 'body-parser';
import { IRequest } from '../../../contracts';
import { JsonBodyParser } from '../../bodyparser';

const logger = new Writeln('Channel Middleware');

@Middleware({ type: 'before', priority: 6 })
@UseBefore(JsonBodyParser)
export class Channel implements ExpressMiddlewareInterface {
	public async use(req: IRequest, res: Response, next: NextFunction): Promise<void> {
		await parseBody(req, res);

		let { method, url, headers, body } = req;
		let { authorization } = headers;

		let ID = generateID();
		let ipv4 = process(req.ip).toString(); // x-forwarded-for ?

		if (ipv4 === '::1')
			ipv4 = '127.0.0.1';

		let key = chalk.dim(`${ipv4}-${ID}`);

		req.ID = ID;
		req.ipv4 = ipv4;

		if (authorization && authorization.indexOf('Bearer') === 0)
			req.authorizationBearer = authorization.substr(7);

		req.intercept = {};

		logger.debug(`${ key } > ${ method } ${ url }`, {
			headers,
			body
		});

		let send = res.send;

		res.send = function (payload?: any): Response {
			let metadata = payload;

			if (metadata && res.getHeader('content-type') === 'application/json')
				metadata = JSON.parse(metadata);

			logger.debug(`${ key } < ${ res.statusCode }`, metadata);
			return send.apply(res, arguments);
		};

		next();
	}
}

async function parseBody(req: IRequest, res: Response): Promise<{}> {
	return new Promise(function (resolve) {
		switch (req.header('content-type')) {
			case 'application/json':
				json()(req, res, resolve);
				break;

			case 'application/x-www-form-urlencoded':
				urlencoded()(req, res, resolve);
				break;

			default:
				resolve();
				break;
		}
	});
}