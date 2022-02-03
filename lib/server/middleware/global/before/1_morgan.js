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
exports.Morgan = void 0;
const morgan_1 = __importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
let Morgan = class Morgan {
    use(req, res, next) {
        (0, morgan_1.default)('dev', {
            skip: function () {
                return typeof (req.ID) !== 'undefined';
            }
        })(req, res, next);
    }
};
Morgan = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before', priority: 50 })
], Morgan);
exports.Morgan = Morgan;
//# sourceMappingURL=1_morgan.js.map