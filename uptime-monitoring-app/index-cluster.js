const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const config = require('./config');
const helpers = require('./lib/helpers');
const makeSMSClient = require('./lib/smsClient');

const makeServer = require('./server');
const makeWorker = require('./worker');
const makeCli = require('./cli');

const routes = require('./routes');

const logger = require('./lib/logger');

logger.info('Available Routes');
routes
  .map(({ method, path }) => `${method}\t\t: ${path}`)
  .forEach(info => logger.info(info));

const __CURRENT_DIR = process.cwd();
const __DATA_DIR = path.join(__CURRENT_DIR, '.data');
const smsClient = makeSMSClient(config);
const staticFolder = path.join(__CURRENT_DIR, 'public');

// Make instance of webserver and worker
const server = makeServer(routes, helpers, staticFolder);
const worker = makeWorker({
  interval: 60000,
  dataDirectory: __DATA_DIR,
  smsClient,
});

// If the cluster is main then run worker and cli only
// and fork the processes
if (cluster.isMaster) {
  worker.init();

  const cli = makeCli({ logger });

  setTimeout(function () {
    cli.init();
  }, 100);

  for (let cpuIdx = 0; cpuIdx < os.cpus().length; cpuIdx++) {
    cluster.fork();
  }
} else {
  // The server should response to all request with a string
  http.createServer(server).listen(config.httpPort, () => {
    logger.warning(
      `The server is listenning on port ${config.httpPort} in ${config.envName} mode`
    );
  });

  https
    .createServer(
      {
        key: fs.readFileSync('./https/key.pem'),
        cert: fs.readFileSync('./https/cert.pem'),
      },
      server
    )
    .listen(config.httpsPort, () => {
      logger.warning(
        `The server is listenning on port ${config.httpsPort} in ${config.envName} mode`
      );
    });
}
