"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const writeln_1 = require("writeln");
const logger = new writeln_1.Logger('Error Handler Middleware');
const env = process.env.NODE_ENV || 'dev';
let ErrorHandler = class ErrorHandler {
    error(error, req, res, next) {
        let { method, headers, body } = req;
        let { httpCode, message, stack } = error;
        let response = {
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
            response.error.stack = stack;
        }
        res.status(httpCode || 500).json(response);
    }
};
ErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after', priority: 10 })
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=3_errorhandler.js.map