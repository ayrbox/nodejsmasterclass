const fs = require('fs');
const path = require('path');

const makeCreate = function (dataDir) {
  return function(dataId, data, callback) {
    fs.open(path.join(dataDir, `${dataId}.json`), 'wx', (err, fileDescriptor) => {
      if(err) {
        callback(new Error('Could not create new file, it may already exists'));
        return;
      }

      const fileContent = JSON.stringify(data);
      fs.writeFile(fileDescriptor, fileContent, (err)  => {
        if(err) {
          callback(new Error('Error writing to file'));
          return;
        }

        fs.close(fileDescriptor, (err) => {
          if(err) {
            callback(new Error('Error closing file.'));
            return;
          }

          callback(false);
        });
      });
    });
  }
}

module.exports = makeCreate;
