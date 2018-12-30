const http = require('http');
const url = require('url');


const handlers = {
  notFound: (data, cb) => {
    cb(404); 
  },
  helloHandlers: (data, cb) => {
    cb(200, {
      message: 'Hello World'
    });
  }
};


const routers = [{
  method: 'get',
  path: '/hello',
  handler: handlers.helloHandlers 
}];


http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // prase url including query string
  const path = parsedUrl.pathname.replace(/^\/+$/g, '');
  const method = req.method.toLowerCase();

  const route = routers.find(r => r.method === method && r.path === path) || { handler: handlers.notFound };

  route.handler({}, (status = 200, payload = {}) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(status);
    res.end(JSON.stringify(payload));
  });
  
}).listen(3000, () => {
  console.log(`Server listenning on port 3000`); 
});
