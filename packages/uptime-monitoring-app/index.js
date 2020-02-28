const http = require('http');
const https = require('https');
const fs = require('fs');

const config = require('./config');
const helpers = require('./lib/helpers');
const makeServer = require('./server');

const routes = require('./routes');
console.log('Routes', JSON.stringify(routes));

// Make instance of webserver
const server = makeServer(routes, helpers);

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
