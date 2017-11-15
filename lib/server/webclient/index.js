"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../../shared");
const token_1 = require("./token");
const request_1 = require("./request");
_a = shared_1.WebClientFactory(request_1.request, token_1.Token), exports.WebClient = _a.WebClient, exports.JsonWebClient = _a.JsonWebClient, exports.AuthWebClient = _a.AuthWebClient;
__export(require("../../shared/webclient"));
var _a;
//# sourceMappingURL=index.js.map