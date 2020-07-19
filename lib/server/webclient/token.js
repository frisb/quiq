"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const events_1 = require("events");
const token_1 = require("../../shared/webclient/auth/token");
class Token extends token_1.AuthToken {
    emit(event, ...args) {
        return events_1.EventEmitter.prototype.emit.call(this, event, ...args);
    }
    on(event, listener) {
        events_1.EventEmitter.prototype.on.call(this, event, listener);
        return this;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map