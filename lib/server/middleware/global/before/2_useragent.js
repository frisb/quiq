"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const routing_controllers_1 = require("routing-controllers");
let UserAgent = class UserAgent {
    use(req, res, next) {
        let userAgent = req.headers['user-agent'];
        if (!userAgent || userAgent.toLowerCase() !== 'libwww-perl') {
            next();
        }
    }
};
UserAgent = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before', priority: 40 })
], UserAgent);
exports.UserAgent = UserAgent;
//# sourceMappingURL=2_useragent.js.map