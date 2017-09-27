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
const WebSocket = require("ws");
const events_1 = require("events");
const writeln_1 = require("writeln");
const state_1 = require("./state");
const logger = new writeln_1.Writeln('Transport');
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
    connect(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.socket === null) {
                    logger.info(`Connecting to ${address} ...`);
                    let ws = new WebSocket(address || this.address, [this.protocol]);
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
                        logger.warn('error', err);
                        reject(err);
                    });
                    ws.on('message', (data) => {
                        let obj = JSON.parse(data);
                        logger.debug('< Received', obj);
                        this.emit('message', obj);
                    });
                    this.socket = ws;
                }
                else if (this.state === state_1.State.OPEN) {
                    resolve();
                }
                else {
                    reject('Socket exists but readyState is ' + this.state);
                }
            });
        });
    }
    disconnect() {
        if (this.socket !== null)
            this.socket.close();
    }
    send(message) {
        if (this.state === state_1.State.OPEN) {
            this.socket.send(message);
            logger.info('> Sent', message);
            this.emit('sent', message);
        }
        else {
            this.emit('error', 'send connectivity');
        }
    }
}
exports.BaseTransport = BaseTransport;
//# sourceMappingURL=base.js.map