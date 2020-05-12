const fs = require('fs');
const path = require('path');

const makeUpdate = function (dataDir) {
  return function (dataId, data, callback) {
    fs.open(
      path.join(dataDir, `${dataId}.json`),
      'r+',
      (err, fileDescriptor) => {
        if (err) {
          callback(new Error('Unable to open file for updating.'));
          return;
        }

        fs.ftruncate(fileDescriptor, err => {
          if (err) {
            callback(new Error('Error truncating data file before update.'));
            return;
          }

          const fileContent = JSON.stringify(data);

          fs.writeFile(fileDescriptor, fileContent, err => {
            if (err) {
              callback(new Error('Error writing file.'));
              return;
            }

            fs.close(fileDescriptor, err => {
              if (err) {
                callback(new Error('Error closeing file after update.'));
                return;
              }
              callback(false);
            });
          });
        });
      },
    );
  };
};

module.exports = makeUpdate;
