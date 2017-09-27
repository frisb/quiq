"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
class JsonBodyParser {
    use(req, res, next) {
        body_parser_1.json()(req, res, next);
    }
}
exports.JsonBodyParser = JsonBodyParser;
class UrlEncodedBodyParser {
    use(req, res, next) {
        body_parser_1.urlencoded()(req, res, next);
    }
}
exports.UrlEncodedBodyParser = UrlEncodedBodyParser;
//# sourceMappingURL=bodyparser.js.map