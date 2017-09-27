"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CORS {
    use(req, res, next) {
        let { headers, method } = req;
        let { origin } = headers;
        if (origin)
            res.set('Access-Control-Allow-Origin', origin);
        if (method === 'OPTIONS') {
            res.set({
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': headers['access-control-request-headers']
            });
            res.end();
        }
        else {
            next();
        }
    }
}
exports.CORS = CORS;
//# sourceMappingURL=cors.js.map