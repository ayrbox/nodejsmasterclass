const makeCreateCheck = function ({ db, logger, helpers }) {
  return function (data, callback) {
    // paylod: { protocol, url, method, successCodes, timeouts }

    // Validate
    const { protocol, url, method, successCodes, timeouts } = data.payload;
    if (!['http', 'https'].includes(protocol)) {
      callback(400, new Error('Invalid check protocol'));
      return;
    }

    if (!['POST', 'GET', 'PUT', 'DELETE'].includes(method)) {
      callback(400, new Error('Invalid check method'));
      return;
    }

    const { token } = data.headers || false;
    db.read('tokens', token, function (err, tokenData) {
      if (err || !tokenData) {
        callback(403);
        return;
      }

      const { phone } = tokenData;
      db.read('users', phone, function (err, userData) {
        if (err || !userData) {
          callback(403);
          return;
        }

        const { checks } = userData;
        if ((checks || []).length >= 5) {
          //config.maxChecks
          callback(400, new Error('User already has maximum number of checks'));
          return;
        }

        const checkId = helpers.createRandomString(20);
        const checkObject = {
          id: checkId,
          phone,
          protocol,
          url,
          method,
          successCodes,
          timeouts,
        };

        db.create('checks', checkId, checkObject, function (err) {
          if (err) {
            callback(500, 'Unable to store check');
            return;
          }

          userData.checks = checks || [];
          userData.checks.push(checkId);

          db.update('users', phone, userData, function (err) {
            if (err) {
              callback(500, 'Unable to update user with checks');
              return;
            }

            callback(200, checkObject);
          });
        });
      });
    });
  };
};

module.exports = makeCreateCheck;
