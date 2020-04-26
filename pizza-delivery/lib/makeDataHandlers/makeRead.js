const fs = require("fs");
const path = require("path");

const makeRead = function (dataDir) {
  return function (dataId, callback) {
    fs.readFile(
      path.join(dataDir, `${dataId}.json`),
      "utf8",
      (err, fileContent) => {
        if (!err && fileContent) {
          // TODO: use generic function to parse data
          const parsedData = JSON.parse(fileContent);
          callback(false, parsedData);
        } else {
          callback(err, fileContent);
        }
      }
    );
  };
};

module.exports = makeRead;
