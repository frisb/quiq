"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const env = process.env.NODE_ENV || 'dev';
function create(options) {
    if (!options)
        options = {};
    if (!options.middlewares)
        options.middlewares = [];
    options.middlewares.unshift(`${__dirname}/../middleware/global/**/*.js`);
    options.defaultErrorHandler = false;
    const app = express();
    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'jade');
    app.set('x-powered-by', false);
    app.set('etag', false);
    if (env === 'dev')
        app.locals.pretty = true;
    return routing_controllers_1.useExpressServer(app, options);
}
exports.create = create;
//# sourceMappingURL=app.js.map