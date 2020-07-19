"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebClient = void 0;
const json_1 = require("../json");
function AuthWebClient(request, TokenClass) {
    return class AuthWebClient extends json_1.JsonWebClient(request) {
        constructor() {
            super(...arguments);
            this.token = new TokenClass();
        }
        async authorize(url, body, token) {
            token = token || this.token.access;
            let headers;
            if (token !== null)
                headers = { 'Authorization': `Bearer ${token}` };
            let { data } = await this.post(url, body, headers);
            let { access_token, expires_in } = data;
            if (access_token && expires_in)
                this.token.refresh(data);
            return data;
        }
    };
}
exports.AuthWebClient = AuthWebClient;
//# sourceMappingURL=index.js.map