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
const http_1 = require("http");
const ipaddr_js_1 = require("ipaddr.js");
const writeln_1 = require("writeln");
const tokenizer_1 = require("../../tokenizer");
const session_1 = require("./session");
const logger = new writeln_1.Writeln('WebSocket Server');
function abortConnection(socket, code, message, err) {
    if (socket.writable) {
        message = message || http_1.STATUS_CODES[code];
        socket.write(`HTTP/1.1 ${code} ${http_1.STATUS_CODES[code]}\r\n` +
            'Connection: close\r\n' +
            'Content-type: text/html\r\n' +
            `Content-Length: ${Buffer.byteLength(message)}\r\n` +
            '\r\n' +
            message);
    }
    socket.destroy();
    logger.error(`${code} ${message}`, err);
}
class AbstractServer extends WebSocket.Server {
    constructor(options) {
        super(options);
        this.tokenizer = null;
        let { signing } = options;
        if (signing)
            this.tokenizer = new tokenizer_1.Tokenizer(signing);
        this.on('connection', (socket, request) => {
            let { protocol, tokenData } = socket;
            let SessionType = this.getSessionClass(protocol);
            let ClientType = this.getClientClass(protocol);
            let GatewayType = this.getGatewayClass(protocol);
            let session;
            let client = new ClientType(socket, request);
            if (tokenData && tokenData.sessionID) {
                session = AbstractServer.getSession(tokenData.sessionID);
            }
            if (session) {
                logger.debug(`Resuming existing session ${session.ID}`);
                session.client = client;
            }
            else {
                let gateway;
                if (GatewayType)
                    gateway = new GatewayType();
                session = new SessionType(client, gateway);
                logger.debug(`Creating new session ${session.ID} with client${gateway ? ' and gateway' : ''}`);
                session
                    .on('end', function (code, reason) {
                    client.close();
                });
            }
        });
    }
    static getSession(id) {
        return session_1.AbstractSession.get(id);
    }
    handleUpgrade(request, socket, upgradeHead, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientSocket = yield this.baseUpgrade(request, socket, upgradeHead);
            let { url, headers } = request;
            let { remoteAddress, localPort } = socket;
            let ipv4 = ipaddr_js_1.process(remoteAddress).toString();
            let channelHost = headers.host;
            if (channelHost.indexOf(':') < 0)
                channelHost += `:${localPort}`;
            if (ipv4 === '::1')
                ipv4 = '127.0.0.1';
            if (this.useTokens(clientSocket.protocol)) {
                try {
                    if (url.length > 20) {
                        let token = url.substr(1);
                        let tokenData = yield this.tokenizer.unwrap(ipv4, channelHost, token);
                        clientSocket.tokenData = tokenData;
                        clientSocket.ipv4 = ipv4;
                        callback(clientSocket);
                    }
                    else {
                        throw new tokenizer_1.NoTokenError();
                    }
                }
                catch (err) {
                    abortConnection(socket, err.httpCode, err.message, err);
                }
            }
            else {
                callback(clientSocket);
            }
        });
    }
    useTokens(protocol) {
        return this.tokenizer !== null;
    }
    baseUpgrade(request, socket, upgradeHead) {
        return new Promise((resolve) => super.handleUpgrade(request, socket, upgradeHead, resolve));
    }
}
exports.AbstractServer = AbstractServer;
//# sourceMappingURL=server.js.map