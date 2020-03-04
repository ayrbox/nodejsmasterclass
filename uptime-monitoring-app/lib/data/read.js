
const makeRead = function(baseDir, fileSystemModule, pathModule, helpers) {
  return function(dir, file, callback) {
    fileSystemModule.readFile(pathModule.join(baseDir, dir, `${file}.json`), 'utf8', (err, data) => {
      if(!err && data) {
        const parseddata = helpers.parseJsonToObject(data);
        callback(false, parseddata)
      } else {
        callback(err, data);
      }
    });
  };
};

module.exports = makeRead;