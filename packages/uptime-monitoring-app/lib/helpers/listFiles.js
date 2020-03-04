const fs = require('fs');

module.exports = function(dir, callback) {
  fs.readdir(dir, function(err, data) {
    if(err) {
      callback(err, data);
      return;
    }

    const fileList = (data || []).map(fileName => fileName.replace('.json', ''));
    callback(false, fileList);
  });
}

