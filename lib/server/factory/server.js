"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http = require("http");
const https = require("https");
const writeln_1 = require("writeln");
const logger = new writeln_1.Logger('Server Factory');
function create(app, port, secureServerOptions) {
    port = normalizePort(port);
    let server = secureServerOptions ? https.createServer(secureServerOptions, app) : http.createServer(app);
    server.listen(port, function () {
        logger.info(`${secureServerOptions ? 'Secure ' : ''}Express server listening on port ${port}`);
    });
    server.on('error', function (err) {
        onError(err, port);
    });
    server.on('listening', function () {
        onListening(server, port);
    });
    return server;
}
exports.create = create;
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return;
}
function onError(err, port) {
    if (err.syscall !== 'listen') {
        throw err;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (err.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
}
function onListening(server, port) {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.debug('Listening on ' + bind);
}
//# sourceMappingURL=server.js.map