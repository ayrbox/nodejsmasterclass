const http = require('http');
const url = require('url');

const PORT = 3000;

// Define handlers functions
const handlers = {
  notFound: (data, cb) => {
    cb(404);
  },
  helloHandlers: (data, cb) => {
    cb(200, {
      message: 'Hello World',
    });
  },
};

// Define router array with method, path and handler
const routers = [
  {
    method: 'get',
    path: '/hello',
    handler: handlers.helloHandlers,
  },
];

// create http server that listen to specified port
http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // prase url including query string
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, ''); // get path from url without / at the end
    const method = req.method.toLowerCase(); // get http method in lowerchase

    // Find router that matches pathname and method
    // else fall back to not found router
    const route = routers.find(r => r.method === method && r.path === path) || {
      handler: handlers.notFound,
    };

    // Call router handler
    route.handler({}, (status = 200, payload = {}) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(payload));
    });
  })
  .listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
  });
