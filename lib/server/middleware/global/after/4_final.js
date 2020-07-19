"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Final = void 0;
const routing_controllers_1 = require("routing-controllers");
let Final = class Final {
    use(req, res, next) {
    }
};
Final = __decorate([
    routing_controllers_1.Middleware({ type: 'after', priority: 0 })
], Final);
exports.Final = Final;
//# sourceMappingURL=4_final.js.map