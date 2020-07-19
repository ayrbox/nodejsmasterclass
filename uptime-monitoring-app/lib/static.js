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
  favicon: 'image/x-icon', // TODO
};

function makeStatic(staticFolder) {
  return function (reqPath, callback) {
    const filePath = path.join(staticFolder, reqPath);

    const ext = filePath.match(/\w+$/i)[0];

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) {
        callback(new Error('Error reading file'));
        return;
      }
      callback(false, content, mimeTypes[ext] || 'text/plain');
    });
  };
}

module.exports = makeStatic;
