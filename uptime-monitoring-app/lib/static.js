const path = require('path');
const fs = require('fs');

function makeStatic(staticFolder) {
  return function (reqPath, callback) {
    const filePath = path.join(staticFolder, reqPath);

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) {
        callback(new Error('Error reading file'));
        return;
      }
      callback(false, content, 'text/plain');
    });
  };
}

module.exports = makeStatic;
