"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClient = void 0;
const connection_1 = require("./connection");
const writeln_1 = require("writeln");
const logger = new writeln_1.Logger('Client');
class AbstractClient extends connection_1.AbstractConnection {
    constructor(socket, request) {
        super();
        this.socket = socket;
        this.request = request;
        socket
            .on('message', (payload) => {
            logger.debug('payload %o', payload);
            try {
                let envelope = this.parseEnvelope(payload);
                let eventName = this.getEventName(envelope);
                let message = this.parseMessage(envelope);
                let handlerName = transformer(eventName);
                let handler = this[handlerName];
                if (handler) {
                    try {
                        let response = handler.call(this, message);
                        if (response)
                            this.send(response);
                    }
                    catch (err) {
                        this.error(400, err.message, err);
                    }
                }
                else {
                    logger.error(`Client does not implement "${handlerName}" handler.`);
                }
            }
            catch (e) {
                this.error(400, 'Bad Request', e);
            }
        })
            .on('close', (code, message) => {
            logger.debug(`Socket closed ${code} ${message}`);
            this.emit('close', code, message);
        });
        logger.debug('upgrade request url %o', request.url);
    }
    get isInitialized() {
        return this.socket !== null;
    }
    close() {
        if (this.socket !== null) {
            this.socket.terminate();
            this.socket = null;
            super.close();
        }
    }
    async send(payloadOrPromise) {
        return new Promise((resolve, reject) => {
            try {
                if (payloadOrPromise.then instanceof Function) {
                    payloadOrPromise
                        .then((payload) => this.sendSync(payload))
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    this.sendSync(payloadOrPromise);
                    resolve();
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    error(code, message, error) {
        this.send({
            error: {
                code,
                message
            }
        });
        logger.error(`${code} ${message} %o`, error);
    }
    ;
    sendSync(payload) {
        logger.debug('send %o', payload);
        try {
            this.socket.send(JSON.stringify(payload));
        }
        catch (err) {
            logger.error(`${err.message} %o`, err);
        }
    }
}
exports.AbstractClient = AbstractClient;
function transformer(eventName) {
    let fnName = upperFirst(eventName);
    if (fnName.indexOf(':') > -1) {
        let words = fnName.split(':');
        fnName = '';
        for (let i = 0, { length } = words; i < length; i++) {
            let word = words[i];
            fnName += (i === 0 ? word : upperFirst(word));
        }
    }
    return `on${fnName}`;
}
function upperFirst(word) {
    let str = '';
    for (let i = 0, { length } = word; i < length; i++) {
        let char = word.charAt(i);
        if (i === 0)
            char = char.toUpperCase();
        str += char;
    }
    return str;
}
//# sourceMappingURL=client.js.map