import 'reflect-metadata'; // this shim is required
import * as express from 'express';
import { useExpressServer, RoutingControllersOptions, ExpressMiddlewareInterface } from 'routing-controllers';
import { StaticClient } from '../middleware/global/after/1_staticclient';
import { Morgan } from '../middleware/global/before/1_morgan';
import { UserAgent } from '../middleware/global/before/2_useragent';
import { Secure } from '../middleware/global/before/3_secure';
import { ServeFavicon } from '../middleware/global/before/4_servefavicon';
import { Compression } from '../middleware/global/before/5_compression';
import { Channel } from '../middleware/global/before/6_channel';
import { StaticPublic } from '../middleware/global/after/2_staticpublic';
import { ErrorHandler } from '../middleware/global/after/3_errorhandler';
import { Final } from '../middleware/global/after/4_final';

const env = process.env.NODE_ENV || 'dev';

export function create(options: RoutingControllersOptions): express.Application {
	if (!options)
		options = {};

	if (!options.middlewares)
		options.middlewares = [];

	// if (!options.controllers)
	// 	options.controllers = [];

	// if (!options.interceptors)
	// 	options.interceptors = [];

	(options.middlewares as Array<any>).unshift(
		Morgan,
		UserAgent,
		Secure,
		ServeFavicon,
		Compression,
		Channel,

		StaticClient,
		StaticPublic,
		ErrorHandler,
		Final
	);
	// (<Array<string | Function>> options.controllers).unshift(`${ __dirname }/../channel/controllers/global**/*.js`);
	// (<Array<string | Function>> options.controllers).unshift(`${ __dirname }/../channel/global/interceptors/**/*.js`);
	options.defaultErrorHandler = false;

	const app = express();

	//app.set('port', port);
	app.set('x-powered-by', false);
	app.set('etag', false);

	if (env === 'dev')
    app.locals.pretty = true;

	return useExpressServer(app, options);
}
