"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractConnection = void 0;
const events_1 = require("events");
class AbstractConnection extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.session = null;
    }
    init(session) {
        this.session = session;
        this.onInit();
    }
    close() {
        this.removeAllListeners();
        this.onClosed();
    }
}
exports.AbstractConnection = AbstractConnection;
//# sourceMappingURL=connection.js.map