const makeDelete = function (baseDir, fileSystemModule, pathModule) {
  return function (dir, file, callback) {
    // unlink the file
    fileSystemModule.unlink(
      pathModule.join(baseDir, dir, `${file}.json`),
      err => {
        if (err) {
          callback('error deleting file');
        }

        callback(false);
      },
    );
  };
};

module.exports = makeDelete;
