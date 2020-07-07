const path = require('path');
const fs = require('fs');

function makeRender(viewFolder) {
  return function (viewFile, callback, layoutView = undefined) {
    // TODO: if layout view provided wrap the content withint layoutView content
    var filePath = path.join(viewFolder, viewFile);

    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        callback(new Error('Unable render template.'));
        return;
      }

      callback(false, content);
    });
  };
}

module.exports = makeRender;
