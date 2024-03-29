"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const routing_controllers_1 = require("routing-controllers");
const chalk_1 = __importDefault(require("chalk"));
const ipaddr_js_1 = require("ipaddr.js");
const idgenerator_1 = require("../../../idgenerator");
const writeln_1 = require("writeln");
const body_parser_1 = require("body-parser");
const logger = new writeln_1.Logger('Channel Middleware');
let Channel = class Channel {
    async use(req, res, next) {
        await parseBody(req, res);
        let { method, url, headers, body } = req;
        let { authorization } = headers;
        authorization = authorization;
        let ID = (0, idgenerator_1.generateID)();
        let ipv4 = (0, ipaddr_js_1.parse)(req.ip).toString();
        if (ipv4 === '::1')
            ipv4 = '127.0.0.1';
        let key = chalk_1.default.gray.dim(`${ipv4}-${ID}`);
        req.ID = ID;
        req.ipv4 = ipv4;
        if (authorization && authorization.indexOf('Bearer') === 0)
            req.authorizationBearer = authorization.substr(7);
        req.intercept = {};
        logger.debug(`${key} > ${method} ${url}`, {
            headers,
            body
        });
        let send = res.send;
        res.send = function (payload) {
            let metadata = payload;
            if (metadata && res.getHeader('content-type') === 'application/json')
                metadata = JSON.parse(metadata);
            logger.debug(`${key} < ${res.statusCode} %o`, metadata);
            return send.apply(res, arguments);
        };
        next();
    }
};
Channel = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before', priority: 0 })
], Channel);
exports.Channel = Channel;
const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};
async function parseBody(req, res) {
    return new Promise(function (resolve) {
        switch (req.header('content-type')) {
            case 'application/json':
                (0, body_parser_1.json)({ verify: rawBodyBuffer })(req, res, resolve);
                break;
            case 'application/x-www-form-urlencoded':
                (0, body_parser_1.urlencoded)({ verify: rawBodyBuffer, extended: true })(req, res, resolve);
                break;
            default:
                resolve();
                break;
        }
    });
}
//# sourceMappingURL=6_channel.js.map