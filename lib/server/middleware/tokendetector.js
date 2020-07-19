"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDetector = void 0;
const tokenizer_1 = require("../tokenizer");
function TokenDetector(signing, isOptional = false) {
    const tokenizer = new tokenizer_1.Tokenizer(signing);
    class TokenDetector {
        async use(req, res, next) {
            let { ipv4, hostname, socket, authorizationBearer } = req;
            let channelHost = `${hostname}:${socket.localPort}`;
            if (authorizationBearer) {
                let token = authorizationBearer;
                let tokenData = await tokenizer.unwrap(ipv4, channelHost, token);
                req.tokenData = tokenData;
                next();
            }
            else if (isOptional) {
                next();
            }
            else {
                throw new tokenizer_1.NoTokenError();
            }
        }
        ;
    }
    return TokenDetector;
}
exports.TokenDetector = TokenDetector;
//# sourceMappingURL=tokendetector.js.map