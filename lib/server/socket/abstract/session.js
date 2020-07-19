"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSession = void 0;
const events_1 = require("events");
const idgenerator_1 = require("../../idgenerator");
class AbstractSession extends events_1.EventEmitter {
    constructor(client, gateway = null) {
        super();
        this._client = null;
        this._gateway = null;
        this._backgroundTimerID = null;
        this.ID = idgenerator_1.generateID();
        this.gateway = gateway;
        this.client = client;
        AbstractSession.add(this);
    }
    static add(session) {
        this.cache[session.ID] = session;
    }
    static get(id) {
        return this.cache[id];
    }
    static remove(id) {
        this.cache[id] = null;
        delete this.cache[id];
    }
    get client() {
        return this._client;
    }
    set client(val) {
        if (val !== null) {
            this._client = val;
            this._client.on('close', (code, message) => {
                this.client = null;
                let min = this.backgroundMins;
                if (min > 0) {
                    this._backgroundTimerID = setTimeout(() => this.end(code, message), min * 60 * 1000);
                }
                else {
                    this.end(code, message);
                }
            });
            if (this._backgroundTimerID !== null) {
                clearTimeout(this._backgroundTimerID);
                this._backgroundTimerID = null;
            }
            this._client.init(this);
        }
    }
    get gateway() {
        return this._gateway;
    }
    set gateway(val) {
        if (val !== null) {
            this._gateway = val;
            this._gateway.init(this);
        }
    }
    end(code, message) {
        if (this.client !== null) {
            this.client.close();
            this.client = null;
        }
        if (this.gateway !== null) {
            this.gateway.close();
            this.gateway = null;
        }
        this.emit('end', code, message);
        AbstractSession.remove(this.ID);
    }
}
exports.AbstractSession = AbstractSession;
AbstractSession.cache = {};
//# sourceMappingURL=session.js.map