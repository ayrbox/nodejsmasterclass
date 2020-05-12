const http = require('http');

const Server = require('./server');
const middlewares = require('./middlewares');
const routes = require('./routes');
const makeLogger = require('./lib/makeLogger');

console.clear();
const server = Server({
  routes,
  middlewares,
});
const logger = makeLogger('main');

const port = 8080;

http.createServer(server).listen(port, () => {
  logger.warning(`The server is listening on port ${port}`);
});
