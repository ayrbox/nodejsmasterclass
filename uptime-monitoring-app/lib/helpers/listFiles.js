const fs = require('fs');
const path = require('path');

const DATAFILE_EXTENTION = '.json';

module.exports = function (dir, callback) {
  fs.readdir(dir, function (err, data) {
    if (err) {
      callback(err, data);
      return;
    }

    const fileList = (data || [])
      .filter(
        fileName => path.extname(fileName).toLowerCase() === DATAFILE_EXTENTION,
      )
      .map(fileName => fileName.replace(DATAFILE_EXTENTION, ''));
    callback(false, fileList);
  });
};
