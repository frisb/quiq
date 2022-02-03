"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebClientFactory = exports.AuthToken = void 0;
const generic_1 = require("./generic");
const json_1 = require("./json");
const index_1 = require("./auth/index");
const token_1 = require("./auth/token");
Object.defineProperty(exports, "AuthToken", { enumerable: true, get: function () { return token_1.AuthToken; } });
__exportStar(require("./contracts/index"), exports);
function WebClientFactory(request, AuthTokenClass) {
    return {
        WebClient: (0, generic_1.WebClient)(request),
        JsonWebClient: (0, json_1.JsonWebClient)(request),
        AuthWebClient: (0, index_1.AuthWebClient)(request, AuthTokenClass)
    };
}
exports.WebClientFactory = WebClientFactory;
//# sourceMappingURL=index.js.map