const http = require('http');
const https = require('https');
const fs = require('fs');

const config = require('./config');
const helpers = require('./lib/helpers');
const makeServer = require('./server');


const handlers = require('./handlers');
// Define a request router
const routers = {
  ping: handlers.ping,
  users: handlers.users,
}

// Make instance of webserver
const server = makeServer(routers, helpers);

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
