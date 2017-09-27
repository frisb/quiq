"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("../tokenizer");
const writeln_1 = require("writeln");
const logger = new writeln_1.Writeln('Token Wrapper Interceptor');
function TokenWrapper(signing, ...fieldNames) {
    const tokenizer = new tokenizer_1.Tokenizer(signing);
    class TokenWrapper {
        intercept(action, payload) {
            let { ipv4, hostname, socket } = action.request;
            let channelOrigin = `${hostname}:${socket.localPort}`;
            let include = [];
            for (let i = 0, { length } = fieldNames; i < length; i++) {
                let name = fieldNames[i];
                if (payload[name])
                    include.push(name);
            }
            logger.debug('Wrapping', { payload, include });
            return tokenizer.wrap(ipv4, channelOrigin, payload, include);
        }
    }
    return TokenWrapper;
}
exports.TokenWrapper = TokenWrapper;
//# sourceMappingURL=tokenwrapper.js.map