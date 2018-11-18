"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
function WebClient(request) {
    return class WebClient extends abstract_1.AbstractWebClient(request) {
        async get(url, headers) {
            return await this.request({ method: 'GET', url, headers });
        }
        async post(url, body, headers) {
            return await this.request({ method: 'POST', url, body, headers });
        }
        async put(url, body, headers) {
            return await this.request({ method: 'PUT', url, body, headers });
        }
        async delete(url, headers) {
            return await this.request({ method: 'DELETE', url, headers });
        }
    };
}
exports.WebClient = WebClient;
//# sourceMappingURL=generic.js.map