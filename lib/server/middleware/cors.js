"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CORS {
    use(req, res, next) {
        let { headers, method } = req;
        let { origin } = headers;
        if (origin)
            res.set('Access-Control-Allow-Origin', origin);
        if (method === 'OPTIONS' || method === 'GET') {
            const accessControlHeaders = {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': '*'
            };
            if (headers['access-control-request-headers'])
                accessControlHeaders['Access-Control-Allow-Headers'] = headers['access-control-request-headers'];
            res.set(accessControlHeaders);
        }
        if (method === 'OPTIONS') {
            res.end();
        }
        else {
            next();
        }
    }
}
exports.CORS = CORS;
//# sourceMappingURL=cors.js.map