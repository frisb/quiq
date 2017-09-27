'use strict';

const assert = require('assert');
const { Token } = require('../lib/server/webclient/token');

const access_token = '12345';
const expires_in = 2;

describe('Web Token', function () {
	it('should test valid after 1sec', function (done) {
		this.timeout(5000);

		let token = new Token();
		token.refresh({ access_token, expires_in });

		setTimeout(function () {
			assert.equal(token.isValid, true);
			done();
		}, 1000);
	});

	it('should test invalid after 2.5sec', function (done) {
		this.timeout(5000);

		let token = new Token();
		token.refresh({ access_token, expires_in });

		setTimeout(function () {
			assert.equal(token.isValid, false);
			done();
		}, 2500);
	});

	it('should emit expired event', function (done) {
		this.timeout(5000);

		let token = new Token();
		token.refresh({ access_token, expires_in });

		token.on('expired', done);
	});
});