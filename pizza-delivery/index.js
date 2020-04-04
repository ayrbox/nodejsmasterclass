const http = require('http');
const path = require('path');


const Server = require('./server');
const routes = require('./routes');
const makeLogger = require('./lib/makeLogger');


const server = Server({
  routes,
});
const logger = makeLogger('main');

// const makeDataHandler = require('./lib/makeDataHandlers');
// const usersData = makeDataHandler(DATADIR, 'users');

const port = 8080;

http.createServer(server).listen(port, () => {
  logger.warning(`The server is listening on port ${port}`);
});