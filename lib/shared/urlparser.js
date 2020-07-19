"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const urlRegex = /^(https?):\/\/([-a-zA-Z0-9@%._\+~#=]{2,256}(?:\.[a-z]{2,6}\b)?)(?::(\d+))?([-a-zA-Z0-9@:%_\+.~#&//=]*)(\?.+)?$/;
function parse(url) {
    let match = url.match(urlRegex);
    if (match === null)
        throw new Error(`Invalid url "${url}"`);
    let [, protocol, host, port, path, query] = match;
    return {
        protocol,
        host,
        port,
        path,
        query
    };
}
exports.parse = parse;
//# sourceMappingURL=urlparser.js.map