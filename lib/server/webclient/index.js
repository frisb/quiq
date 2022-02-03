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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebClient = exports.JsonWebClient = exports.WebClient = void 0;
const shared_1 = require("../../shared");
const token_1 = require("./token");
const request_1 = require("./request");
_a = (0, shared_1.WebClientFactory)(request_1.request, token_1.Token), exports.WebClient = _a.WebClient, exports.JsonWebClient = _a.JsonWebClient, exports.AuthWebClient = _a.AuthWebClient;
__exportStar(require("../../shared/webclient"), exports);
//# sourceMappingURL=index.js.map