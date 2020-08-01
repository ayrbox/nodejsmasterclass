const makeReadUser = function (db, logger, helpers) {
  return function (data, callback) {
    const { phone } = data.query;
    if (!helpers.validateStringRequired(phone)) {
      return callback(400, {
        error: 'Invalid phone number',
      });
    }

    db.read('users', phone, (err, data) => {
      if (err) {
        return callback(404);
      } else if (!err && data) {
        const { firstName, lastName, tosAgreement, checks } = data;

        callback(200, {
          firstName,
          lastName,
          phone,
          tosAgreement,
          checks,
        });
      }
    });
  };
};

module.exports = makeReadUser;
