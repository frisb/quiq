"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizedTransport = void 0;
const persistent_1 = require("./persistent");
const webclient_1 = require("../webclient");
class TokenizedTransport extends persistent_1.PersistentTransport {
    constructor(options) {
        super(options);
        let { tokenAddress, tokenPayload, userAgent } = options;
        this.tokenAddress = tokenAddress;
        this.tokenPayload = tokenPayload;
        this.webClient = new webclient_1.AuthWebClient(userAgent);
    }
    async connect() {
        try {
            let { access_token } = await this.preflite();
            return await super.connect(`${this.address}/${access_token}`);
        }
        catch (err) {
            if (err.name === 'ConnectivityError') {
                this.emit('error', 'token connectivity');
            }
            else {
                this.emit('error', err);
            }
        }
    }
    async preflite() {
        let { webClient } = this;
        let { isValid, access } = webClient.token;
        if (isValid) {
            return { token_type: 'bearer', access_token: access };
        }
        else {
            let { tokenAddress, tokenPayload } = this;
            return await webClient.authorize(tokenAddress, tokenPayload);
        }
    }
}
exports.TokenizedTransport = TokenizedTransport;
//# sourceMappingURL=tokenized.js.map