'use strict';

const assert = require('assert');
const { server } = require('./components/server');
const { AbstractServer, AbstractSession, AbstractClient, AbstractGateway } = require('../lib/server/socket');

class Session extends AbstractSession {

}

class Client extends AbstractClient {
	onTest() {
		this.session.gateway.test();
	}
}

class Gateway extends AbstractGateway {
	test() {

	}
}

class Server extends AbstractServer {
	constructor() {
		super({
			server,
			signing: {
				secret: 'test',
				expirySeconds: 1800,
				algorithm: 'HS256'
			}
		});
	}

	getSessionClass() {
		return Session;
	}

	getClientClass(protocol) {
		if (protocol === 'test-protocol')
			return Client;
	}

	getGatewayClass() {
		return Gateway;
	}
}

let s = new Server();