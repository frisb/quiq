"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthToken {
    constructor() {
        this.access = null;
        this.expires = null;
        this.expiryTimeoutID = null;
        this.startCountdown();
    }
    get isValid() {
        return this.access !== null && this.expires >= new Date();
    }
    refresh({ access_token, expires_in }) {
        this.access = access_token;
        let minExpirySeconds = expires_in >= 30 ? 30 : 0;
        let t = new Date();
        t.setSeconds(t.getSeconds() + expires_in - minExpirySeconds);
        this.expires = t;
        this.startCountdown();
    }
    stopCountdown() {
        if (this.expiryTimeoutID !== null) {
            clearTimeout(this.expiryTimeoutID);
            this.expiryTimeoutID = null;
        }
    }
    startCountdown() {
        if (this.expires !== null) {
            let delay = this.expires.getTime() - new Date().getTime();
            this.stopCountdown();
            if (delay > 0) {
                this.expiryTimeoutID = setTimeout(() => {
                    this.emit('expired');
                }, delay);
            }
            else {
                this.emit('expired');
            }
        }
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=token.js.map