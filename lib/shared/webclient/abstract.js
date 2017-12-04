"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AbstractWebClient(request) {
    return class AbstractWebClient {
        constructor(userAgent) {
            this.userAgent = userAgent;
        }
        request(options) {
            return request(options);
        }
    };
}
exports.AbstractWebClient = AbstractWebClient;
//# sourceMappingURL=abstract.js.map