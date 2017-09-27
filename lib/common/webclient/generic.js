"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
function WebClient(request) {
    return class WebClient extends abstract_1.AbstractWebClient(request) {
        get(url, headers) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.request({ method: 'GET', url, headers });
            });
        }
        post(url, body, headers) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.request({ method: 'POST', url, body, headers });
            });
        }
        put(url, body, headers) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.request({ method: 'PUT', url, body, headers });
            });
        }
        delete(url, headers) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.request({ method: 'DELETE', url, headers });
            });
        }
    };
}
exports.WebClient = WebClient;
//# sourceMappingURL=generic.js.map