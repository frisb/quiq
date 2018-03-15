"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AbstractWebClient(request) {
    return class AbstractWebClient {
        constructor(userAgent) {
            this.userAgent = userAgent;
        }
        request(options) {
            if (this.userAgent) {
                if (!options.headers)
                    options.headers = {};
                options.headers['User-Agent'] = this.userAgent;
            }
            return request(options);
        }
    };
}
exports.AbstractWebClient = AbstractWebClient;
//# sourceMappingURL=abstract.js.map