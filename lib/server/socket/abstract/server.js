"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const ipaddr_js_1 = require("ipaddr.js");
const writeln_1 = require("writeln");
const tokenizer_1 = require("../../tokenizer");
const session_1 = require("./session");
const logger = new writeln_1.Writeln('WebSocket Server');
class AbstractServer {
    constructor(options) {
        this.tokenizer = null;
        const wsServer = new WebSocket.Server(Object.assign(options, { verifyClient: options.verifyClient || this.verifyClient.bind(this) }));
        const { signing } = options;
        if (signing)
            this.tokenizer = new tokenizer_1.Tokenizer(signing);
        wsServer.on('connection', (socket, request) => {
            const { tokenData, protocol } = request;
            const SessionType = this.getSessionClass(protocol);
            const ClientType = this.getClientClass(protocol);
            const GatewayType = this.getGatewayClass(protocol);
            let session;
            const client = new ClientType(socket, request);
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
    useTokens(protocol) {
        return this.tokenizer !== null;
    }
    async verifyClient(info, callback) {
        const req = info.req;
        const { url, headers: { host, ['sec-websocket-protocol']: protocol }, socket: { remoteAddress, localPort } } = req;
        req.protocol = protocol;
        let ipv4 = ipaddr_js_1.process(remoteAddress).toString();
        let channelHost = host;
        if (channelHost.indexOf(':') < 0)
            channelHost += `:${localPort}`;
        if (ipv4 === '::1')
            ipv4 = '127.0.0.1';
        if (this.useTokens(req.protocol)) {
            if (url.length > 20) {
                const token = url.substr(1);
                req.tokenData = await this.tokenizer.unwrap(ipv4, channelHost, token);
                req.ipv4 = ipv4;
                callback(true);
            }
            else {
                throw new tokenizer_1.NoTokenError();
            }
        }
        else {
            callback(true);
        }
    }
}
exports.AbstractServer = AbstractServer;
//# sourceMappingURL=server.js.map