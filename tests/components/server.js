'use strict';

const { factory } = require('../../lib/server');

const app = factory.app.create();
const server = factory.server.create(app, 9000);

exports.server = server;