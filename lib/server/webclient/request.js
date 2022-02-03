"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const lodash_1 = __importDefault(require("lodash"));
const writeln_1 = require("writeln");
const shared_1 = require("../../shared");
const logger = new writeln_1.Logger('Web Client');
function request({ url, method, headers, body }) {
    return new Promise((resolve, reject) => {
        let { protocol, host, port, path, query } = shared_1.urlParser.parse(url);
        let isSSL = protocol === 'https';
        let sData;
        path += query || '';
        if (body) {
            sData = JSON.stringify(body);
            if (!headers)
                headers = {};
            headers['Content-Length'] = sData ? Buffer.byteLength(sData) : 0;
        }
        let options = {
            host,
            port: parseInt(port || (isSSL ? '443' : '80'), 10),
            path,
            method,
            headers
        };
        let client = isSSL ? https_1.default : http_1.default;
        logger.debug('request %o', lodash_1.default.extend(options, { body: body || '' }));
        let req = client.request(options, function (res) {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                if (chunk !== null)
                    data += chunk;
            });
            res.on('end', function () {
                let response = {
                    code: res.statusCode,
                    data
                };
                logger.debug('response %o', response);
                resolve(response);
            });
        });
        req.on('error', function (e) {
            logger.error('Error %o', e);
            reject(e);
        });
        if ((method === 'POST' || method === 'PUT') && sData) {
            req.write(sData);
        }
        req.end();
    });
}
exports.request = request;
//# sourceMappingURL=request.js.map