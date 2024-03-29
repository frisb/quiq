"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransport = void 0;
const ws_1 = __importDefault(require("ws"));
const events_1 = require("events");
const writeln_1 = require("writeln");
const state_1 = require("./state");
const logger = new writeln_1.Logger('Transport');
class BaseTransport extends events_1.EventEmitter {
    constructor({ address, protocol }) {
        super();
        this.socket = null;
        this.address = address;
        this.protocol = protocol;
    }
    get state() {
        return this.socket === null ? state_1.State.UNINITIALIZED : this.socket.readyState;
    }
    async connect(address = this.address) {
        return new Promise((resolve, reject) => {
            if (this.socket === null) {
                logger.info(`Connecting to ${address} ...`);
                try {
                    let ws = new ws_1.default(address || this.address, [this.protocol]);
                    ws.on('open', () => {
                        logger.info('connected');
                        this.emit('connected');
                        resolve();
                    });
                    ws.on('close', () => {
                        logger.info('disconnected');
                        this.emit('disconnected');
                        this.socket = null;
                    });
                    ws.on('error', (err) => {
                        this.emit('error', err);
                        logger.warn('error %o', err);
                        reject(err);
                    });
                    ws.on('message', (data) => {
                        let obj = JSON.parse(data);
                        logger.debug('< Received %o', obj);
                        this.emit('message', obj);
                    });
                    this.socket = ws;
                }
                catch (err) {
                    logger.error(`Connection failure to ${address} ...`);
                    reject(err);
                }
            }
            else if (this.state === state_1.State.OPEN) {
                resolve();
            }
            else {
                reject('Socket exists but readyState is ' + this.state);
            }
        });
    }
    disconnect() {
        if (this.socket !== null)
            this.socket.close();
    }
    send(message) {
        if (this.state === state_1.State.OPEN) {
            try {
                this.socket.send(message);
                logger.info('> Sent %o', message);
                this.emit('sent', message);
            }
            catch (err) {
                logger.error(`${err.message} %o`, err.stack);
            }
        }
        else {
            this.emit('error', 'send connectivity');
        }
    }
}
exports.BaseTransport = BaseTransport;
//# sourceMappingURL=base.js.map