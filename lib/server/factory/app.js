"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
require("reflect-metadata");
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const _1_staticclient_1 = require("../middleware/global/after/1_staticclient");
const _1_morgan_1 = require("../middleware/global/before/1_morgan");
const _2_useragent_1 = require("../middleware/global/before/2_useragent");
const _3_secure_1 = require("../middleware/global/before/3_secure");
const _4_servefavicon_1 = require("../middleware/global/before/4_servefavicon");
const _5_compression_1 = require("../middleware/global/before/5_compression");
const _6_channel_1 = require("../middleware/global/before/6_channel");
const _2_staticpublic_1 = require("../middleware/global/after/2_staticpublic");
const _3_errorhandler_1 = require("../middleware/global/after/3_errorhandler");
const _4_final_1 = require("../middleware/global/after/4_final");
const env = process.env.NODE_ENV || 'dev';
function create(options) {
    if (!options)
        options = {};
    if (!options.middlewares)
        options.middlewares = [];
    options.middlewares.unshift(_1_morgan_1.Morgan, _2_useragent_1.UserAgent, _3_secure_1.Secure, _4_servefavicon_1.ServeFavicon, _5_compression_1.Compression, _6_channel_1.Channel, _1_staticclient_1.StaticClient, _2_staticpublic_1.StaticPublic, _3_errorhandler_1.ErrorHandler, _4_final_1.Final);
    options.defaultErrorHandler = false;
    const app = express();
    app.set('x-powered-by', false);
    app.set('etag', false);
    if (env === 'dev')
        app.locals.pretty = true;
    return routing_controllers_1.useExpressServer(app, options);
}
exports.create = create;
//# sourceMappingURL=app.js.map