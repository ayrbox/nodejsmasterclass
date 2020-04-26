const fs = require("fs");
const path = require("path");

const makeDelete = function (dataDir) {
  return function (dataId, callback) {
    fs.unlink(path.join(dataDir, `${dataId}.json`), err => {
      if (err) {
        callback(new Error("Unable to delete file."));
        return;
      }
      callback(false);
    });
  };
};

module.exports = makeDelete;
