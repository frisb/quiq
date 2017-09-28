"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const writeln_1 = require("writeln");
const logger = new writeln_1.Writeln('Error Handler Middleware');
const env = process.env.NODE_ENV || 'dev';
let ErrorHandler = class ErrorHandler {
    error(error, req, res, next) {
        let { httpCode, message, stack } = error;
        let payload = {
            error: {
                code: httpCode,
                message,
                stack: {}
            }
        };
        logger.error(message, {
            error,
            payload: req.body
        });
        if (env !== 'production') {
            payload.error.stack = stack;
        }
        res.status(httpCode || 500).json(payload);
    }
};
ErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=3_errorhandler.js.map