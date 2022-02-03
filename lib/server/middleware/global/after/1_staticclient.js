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
exports.StaticClient = void 0;
const routing_controllers_1 = require("routing-controllers");
const express_1 = __importDefault(require("express"));
const env = process.env.NODE_ENV || 'dev';
const clientPath = `${process.cwd()}/client/${env}`;
let StaticClient = class StaticClient {
    use(req, res, next) {
        if (!res.finished) {
            express_1.default.static(clientPath)(req, res, next);
        }
        else {
            next();
        }
    }
};
StaticClient = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after', priority: 30 })
], StaticClient);
exports.StaticClient = StaticClient;
//# sourceMappingURL=1_staticclient.js.map