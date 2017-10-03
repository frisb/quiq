"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const Token_1 = require("./Token");
const request_1 = require("./request");
_a = common_1.WebClientFactory(request_1.request, Token_1.Token), exports.WebClient = _a.WebClient, exports.JsonWebClient = _a.JsonWebClient, exports.AuthWebClient = _a.AuthWebClient;
__export(require("../../common/webclient"));
var _a;
//# sourceMappingURL=index.js.map