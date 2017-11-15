"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_1 = require("./generic");
const json_1 = require("./json");
const index_1 = require("./auth/index");
const token_1 = require("./auth/token");
exports.AuthToken = token_1.AuthToken;
function WebClientFactory(request, AuthTokenClass) {
    return {
        WebClient: generic_1.WebClient(request),
        JsonWebClient: json_1.JsonWebClient(request),
        AuthWebClient: index_1.AuthWebClient(request, AuthTokenClass)
    };
}
exports.WebClientFactory = WebClientFactory;
//# sourceMappingURL=index.js.map