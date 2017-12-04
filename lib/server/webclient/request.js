"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const _ = require("lodash");
const writeln_1 = require("writeln");
const shared_1 = require("../../shared");
const logger = new writeln_1.Writeln('Web Client');
function request({ url, method, headers, body }) {
    return new Promise((resolve, reject) => {
        let { protocol, host, port, path, query } = shared_1.urlParser.parse(url);
        let isSSL = protocol === 'https';
        let sData;
        path += query || '';
        if (!headers)
            headers = {};
        headers['User-Agent'] = this.userAgent;
        if (body) {
            sData = JSON.stringify(body);
            headers['Content-Length'] = sData ? Buffer.byteLength(sData) : 0;
        }
        let options = {
            host,
            port: parseInt(port || (isSSL ? '443' : '80'), 10),
            path,
            method,
            headers
        };
        let client = isSSL ? https : http;
        logger.debug('request', _.extend(options, { body: body || '' }));
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
                logger.debug('response', response);
                resolve(response);
            });
        });
        req.on('error', function (e) {
            logger.error('Error', e);
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