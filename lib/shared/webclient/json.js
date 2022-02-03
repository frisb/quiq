"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebClient = void 0;
const abstract_1 = require("./abstract");
function JsonWebClient(request) {
    async function jsonRequest(options) {
        if (!options.headers)
            options.headers = {};
        options.headers['Content-Type'] = 'application/json';
        let response = await request(options);
        response.data = JSON.parse(response.data);
        return response;
    }
    return class JsonWebClient extends (0, abstract_1.AbstractWebClient)(jsonRequest) {
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
exports.JsonWebClient = JsonWebClient;
//# sourceMappingURL=json.js.map