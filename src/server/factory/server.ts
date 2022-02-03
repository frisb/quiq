import http from 'http';
import https from 'https';
import { Application } from 'express';
import { Logger } from 'writeln';
import ErrnoException = NodeJS.ErrnoException;

const logger = new Logger('Server Factory');

export function create(app: Application, port: number | string, secureServerOptions?: https.ServerOptions): http.Server | https.Server {
	port = normalizePort(port);

	let server = secureServerOptions ? https.createServer(secureServerOptions, app) : http.createServer(app);

	/**
	 * Listen on provided port, on all network interfaces.
	 */
	server.listen(port, function() {
		logger.info(`${secureServerOptions ? 'Secure ' : ''}Express server listening on port ${port}`);
	});

	server.on('error', function (err: Error) {

		onError(err, <number> port);
	});
	server.on('listening', function () {
		onListening(server, <number> port);
	});

	return server;
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any): number {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(err: ErrnoException, port: number) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server: http.Server | https.Server, port: number) {
  let addr = server.address();
  let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  logger.debug('Listening on ' + bind);
}
