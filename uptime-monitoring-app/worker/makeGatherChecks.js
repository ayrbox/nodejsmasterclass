const validateCheckData = require('./validateCheckData');
const preformCheck = require('./performCheck');

const makeGatherChecks = function (workerContext) {
  const { db, helpers, checkFileDirectory, alertUser } = workerContext;

  return function () {
    helpers.listFiles(checkFileDirectory, function (err, checkFiles) {
      if (err || !checkFiles) {
        console.log('[ERROR]: No Checks', err);
        return;
      }

      checkFiles.forEach(function (check) {
        db.read('checks', check, function (err, originalCheckData) {
          if (err) {
            console.log('Error reading checks', check);
            return;
          }
          const isValid = validateCheckData(originalCheckData);

          console.log(
            '[VALIDATING]',
            originalCheckData.id,
            isValid ? 'VALID' : 'INVALID',
          );

          if (isValid) {
            preformCheck(originalCheckData, function ({ error, responseCode }) {
              const state =
                !error &&
                responseCode &&
                originalCheckData.successCodes.indexOf(responseCode) > -1
                  ? 'up'
                  : 'down';
              console.log('Response', originalCheckData.id, state);

              const alertWarranted =
                originalCheckData.lastChecked &&
                originalCheckData.state !== state;

              // update the check
              const updatedCheck = {
                ...originalCheckData,
                state,
                lastChecked: Date.now(),
              };

              db.update('checks', check, updatedCheck, function (err) {
                if (err) {
                  console.log('Error updating check');
                  return;
                }

                if (alertWarranted) {
                  alertUser({
                    ...originalCheckData,
                    state,
                  });
                }
              });
            });
          }
        });
      });
    });
  };
};

module.exports = makeGatherChecks;
