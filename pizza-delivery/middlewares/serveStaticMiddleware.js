const path = require('path');
const fs = require('fs');

const mimeTypes = {
  txt: 'text/plain',
  css: 'text/css',
  js: 'text/javascript',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
  html: 'text/html',
  favicon: 'image/x-icon',
};

function serveStaticMiddleware(staticFolder) {
  return function (req, res, next) {
    const filePath = path.join(staticFolder, req.path);

    const ext = filePath.match(/\w+$/i)[0];

    fs.readFile(filePath, function (err, content) {
      if (err) {
        next();
        return;
      }

      const contentType = mimeTypes[ext] || 'text/plain';

      res.setHeader('Content-Type', contentType);
      res.writeHead(200);

      if (typeof payload === 'string') {
        res.end(content);
      } else if (
        typeof payload === 'object' &&
        contentType === 'application/json'
      ) {
        res.end(JSON.stringify(content));
      } else {
        res.end(content);
      }
    });
  };
}

module.exports = serveStaticMiddleware;
