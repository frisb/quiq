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
const Persistent_1 = require("./Persistent");
const webclient_1 = require("../webclient");
class TokenizedTransport extends Persistent_1.PersistentTransport {
    constructor(options) {
        super(options);
        let { tokenAddress, tokenPayload, userAgent } = options;
        this.tokenAddress = tokenAddress;
        this.tokenPayload = tokenPayload;
        this.webClient = new webclient_1.AuthWebClient(userAgent);
    }
    connect() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { access_token } = yield this.preflite();
                return yield _super("connect").call(this, `${this.address}/${access_token}`);
            }
            catch (err) {
                if (err.name === 'ConnectivityError') {
                    this.emit('error', 'token connectivity');
                }
                else {
                    this.emit('error', err);
                }
            }
        });
    }
    preflite() {
        return __awaiter(this, void 0, void 0, function* () {
            let { webClient } = this;
            let { isValid, access } = webClient.token;
            if (isValid) {
                return { token_type: 'bearer', access_token: access };
            }
            else {
                let { tokenAddress, tokenPayload } = this;
                return yield webClient.authorize(tokenAddress, tokenPayload);
            }
        });
    }
}
exports.TokenizedTransport = TokenizedTransport;
//# sourceMappingURL=tokenized.js.map