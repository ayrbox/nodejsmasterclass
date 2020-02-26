
const makeUpdate = function(baseDir, fileSystemModule, pathModule) {
  return function(dir, file, data, callback) {
    // open 
    fileSystemModule.open(pathModule.join(baseDir, dir, `${file}.json`), 'r+', (err, fileDescriptor) => {
      if(err) {
        callback('Could not open the file for updating');
      }

      // truncate file
      fileSystemModule.ftruncate(fileDescriptor, err => {
        if (err) {
          callback('Error truncating file');
        }
      });

      const stringData = JSON.stringify(data);

      fileSystemModule.writeFile(fileDescriptor, stringData, (err) => {
        if(err) {
          callback('Error writing to file');
        }

        fileSystemModule.close(fileDescriptor, (err) => {
          if (err) {
            callback('Error closing file');
          }

          callback(false);
        });
      });
    });
  }
}

module.exports = makeUpdate;
