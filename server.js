import config from './config';
import express from 'express';

const server = express();

const busboy = require('connect-busboy');
server.use(busboy({
	highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));

// View
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

// Router
const router = require('./router.js');
server.use('/', router);

server.use(express.static('public'));

server.listen(config.port, config.host, () => {
	console.info('Express listening on port', config.port);
});