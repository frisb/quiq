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
const json_1 = require("../json");
function AuthWebClient(request, TokenClass) {
    return class AuthWebClient extends json_1.JsonWebClient(request) {
        constructor() {
            super(...arguments);
            this.token = new TokenClass();
        }
        authorize(url, body, token) {
            return __awaiter(this, void 0, void 0, function* () {
                token = token || this.token.access;
                let headers;
                if (token !== null)
                    headers = { 'Authorization': `Bearer ${token}` };
                let { data } = yield this.post(url, body, headers);
                let { access_token, expires_in } = data;
                if (access_token && expires_in)
                    this.token.refresh(data);
                return data;
            });
        }
    };
}
exports.AuthWebClient = AuthWebClient;
//# sourceMappingURL=index.js.map