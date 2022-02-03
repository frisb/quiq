"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlEncodedBodyParser = exports.JsonBodyParser = void 0;
const body_parser_1 = require("body-parser");
class JsonBodyParser {
    use(req, res, next) {
        (0, body_parser_1.json)()(req, res, next);
    }
}
exports.JsonBodyParser = JsonBodyParser;
class UrlEncodedBodyParser {
    use(req, res, next) {
        (0, body_parser_1.urlencoded)({ extended: true })(req, res, next);
    }
}
exports.UrlEncodedBodyParser = UrlEncodedBodyParser;
//# sourceMappingURL=bodyparser.js.map