const path = require('path');

const makeGatherChecks = function(workerContext) {
  const {
    db,
    helpers,
    checkFileDirectory,
  } = workerContext;


  return function() {
    helpers.listFiles(checkFileDirectory, function(err, checkFiles) {
      if(err || !checkFiles) {
        console.log('[ERROR]: No Checks', err);
        return;
      }

      checkFiles.forEach(function(check) {
        db.read('checks', check, function(err, originalCheckData) {
          if(err) {
            console.log('Error: reading checks', check);
            return;
          }

          // validateCheckData(originalCheckData);
        });
      });
    });
  }
}
module.exports = makeGatherChecks;
