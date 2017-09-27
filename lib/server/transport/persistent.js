"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writeln_1 = require("writeln");
const base_1 = require("./base");
const state_1 = require("./state");
const logger = new writeln_1.Writeln('Persistent Transport');
class PersistentTransport extends base_1.BaseTransport {
    constructor(options) {
        super(options);
        this.reconnectTimerID = null;
        this.mustReconnect = true;
        this.retryInterval = options.retryInterval || -1;
        this
            .on('connected', () => {
            if (this.reconnectTimerID !== null) {
                clearInterval(this.reconnectTimerID);
                this.reconnectTimerID = null;
            }
        })
            .on('disconnected', () => {
            if (this.retryInterval > 0 && this.mustReconnect)
                this.reconnect();
        });
    }
    disconnect(mustReconnect) {
        if (typeof (mustReconnect) !== 'undefined' && mustReconnect === false)
            this.mustReconnect = false;
        super.disconnect();
    }
    send(message) {
        super.send(JSON.stringify(message));
    }
    reconnect() {
        let { retryInterval } = this;
        if (retryInterval > 0 && this.reconnectTimerID === null) {
            this.reconnectTimerID = setInterval(() => {
                if (this.state !== state_1.State.OPEN) {
                    logger.info(`retrying in ${Math.floor(retryInterval / 1000)}sec`);
                    this.connect();
                }
            }, retryInterval);
        }
    }
}
exports.PersistentTransport = PersistentTransport;
//# sourceMappingURL=persistent.js.map