const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const config = require('./config');
const helpers = require('./lib/helpers');
const makeServer = require('./server');
const makeWorker = require('./worker');

const routes = require('./routes');

console.log('Available Routes', JSON.stringify(routes, null, 2));


const __CURRENT_DIR = process.cwd(); 
const __DATA_DIR = path.join(__CURRENT_DIR, '.data'); 

// Make instance of webserver and worker
const server = makeServer(routes, helpers);
const worker = makeWorker({
  interval: 1000,
  dataDirectory: __DATA_DIR,
});

// The server should response to all request with a string
http.createServer(server).listen(config.httpPort, () => {
  console.log(`The server is listenning on port ${config.httpPort} in ${config.envName} mode`);
});

https.createServer({
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'), 
}, server).listen(config.httpsPort, () => {
  console.log(`The server is listenning on port ${config.httpsPort} in ${config.envName} mode`);
});


worker.init();
