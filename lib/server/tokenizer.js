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
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = require("jsonwebtoken");
const writeln_1 = require("writeln");
const logger = new writeln_1.Writeln('Tokenizer');
class IpAddressError extends routing_controllers_1.HttpError {
    constructor() {
        super(401, 'Unauthorized');
    }
}
exports.IpAddressError = IpAddressError;
class HostError extends routing_controllers_1.HttpError {
    constructor() {
        super(401, 'Unauthorized');
    }
}
exports.HostError = HostError;
class NoTokenError extends routing_controllers_1.HttpError {
    constructor() {
        super(403, 'Forbidden');
    }
}
exports.NoTokenError = NoTokenError;
class TokenInvalidError extends routing_controllers_1.HttpError {
    constructor(err) {
        super(498, 'Token expired/invalid');
        logger.error(err.message, err);
    }
}
exports.TokenInvalidError = TokenInvalidError;
class Tokenizer {
    constructor(signing) {
        this.signing = signing;
    }
    wrap(remoteIP, channelOrigin, data, include) {
        let { expirySeconds, secret, algorithm } = this.signing;
        let options = { expiresIn: expirySeconds, algorithm };
        data.ip = remoteIP;
        data.origin = channelOrigin;
        let accessToken = jsonwebtoken_1.sign(data, secret, options);
        let wrappedToken = {
            access_token: accessToken,
            token_type: 'bearer',
            expires_in: expirySeconds
        };
        if (include) {
            for (let i = 0, { length } = include; i < length; i++) {
                let key = include[i];
                let val = data[key];
                if (val)
                    wrappedToken[key] = val;
            }
        }
        return wrappedToken;
    }
    unwrap(remoteIP, channelOrigin, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let { algorithm, secret } = this.signing;
            return new Promise(function (resolve, reject) {
                let algorithms = [algorithm];
                let options = { algorithms };
                jsonwebtoken_1.verify(token, secret, options, function (err, data) {
                    if (err) {
                        reject(new TokenInvalidError(err));
                    }
                    else {
                        let { ip, origin } = data;
                        if (ip !== remoteIP) {
                            reject(new IpAddressError());
                        }
                        else if (origin !== channelOrigin) {
                            reject(new HostError());
                        }
                        else {
                            let tokenData = {};
                            for (let key in data) {
                                if (key !== 'iat' && key !== 'exp' && key !== 'ip')
                                    tokenData[key] = data[key];
                            }
                            resolve(tokenData);
                        }
                    }
                });
            });
        });
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map