import 'reflect-metadata'; // this shim is required
import * as express from 'express';
import { useExpressServer, RoutingControllersOptions } from 'routing-controllers';

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

	(<Array<string | Function>> options.middlewares).unshift(`${ __dirname }/../middleware/global/**/*.js`);
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
