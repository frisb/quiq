"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("../tokenizer");
function TokenDetector(signing, isOptional = false) {
    const tokenizer = new tokenizer_1.Tokenizer(signing);
    class TokenDetector {
        use(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                let { ipv4, hostname, socket, authorizationBearer } = req;
                let channelHost = `${hostname}:${socket.localPort}`;
                if (authorizationBearer) {
                    let token = authorizationBearer;
                    let tokenData = yield tokenizer.unwrap(ipv4, channelHost, token);
                    req.tokenData = tokenData;
                    next();
                }
                else if (isOptional) {
                    next();
                }
                else {
                    throw new tokenizer_1.NoTokenError();
                }
            });
        }
        ;
    }
    return TokenDetector;
}
exports.TokenDetector = TokenDetector;
//# sourceMappingURL=tokendetector.js.map