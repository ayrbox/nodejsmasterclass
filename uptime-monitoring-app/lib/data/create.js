const makeCreate = function (baseDir, fileSystemModule, pathModule) {
  return function (dir, file, data, callback) {
    fileSystemModule.open(
      pathModule.join(baseDir, dir, `${file}.json`),
      'wx',
      (err, fileDescriptor) => {
        if (err && !fileDescriptor) {
          callback('Could not create new file, it may already exists');
          return;
        }

        const stringData = JSON.stringify(data);
        fileSystemModule.writeFile(fileDescriptor, stringData, err => {
          if (err) {
            callback('Error writing to new file');
            return;
          }
          fileSystemModule.close(fileDescriptor, err => {
            if (err) {
              callback('Error closing new file');
              return;
            }

            callback(false);
          });
        });
      },
    );
  };
};

module.exports = makeCreate;
