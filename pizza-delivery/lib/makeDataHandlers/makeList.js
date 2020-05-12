const fs = require('fs');
const path = require('path');

function readFileAsync(filepPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepPath, 'utf8', (err, fileContent) => {
      if (err && !fileContent) {
        reject(err);
      } else {
        // TODO: use generic function to parse data
        console.log(fileContent);
        resolve(JSON.parse(fileContent));
      }
    });
  });
}

const makeList = function (dataDir) {
  return function (callback) {
    fs.readdir(dataDir, function (err, files) {
      if (err) {
        callback(err, data);
        return;
      }

      const readPromises = (files || [])
        .filter(fileName => path.extname(fileName).toLowerCase() === '.json')
        .map(fileName => readFileAsync(path.join(dataDir, fileName)));

      Promise.all(readPromises)
        .then(data => {
          callback(false, data);
        })
        .catch(err => {
          callback(err, null);
        });
    });
  };
};

module.exports = makeList;
