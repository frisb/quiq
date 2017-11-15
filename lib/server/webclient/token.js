"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const webclient_1 = require("../../shared/webclient");
class Token extends webclient_1.AuthToken {
    constructor() {
        super();
    }
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