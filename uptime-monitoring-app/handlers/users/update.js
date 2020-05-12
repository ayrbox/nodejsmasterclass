const makeUserUpdate = function (db, logger, helpers) {
  return function (data, callback) {
    // Update user with new datak
    // TODO: Allow only authenticated user to update data

    const { firstName, lastName, phone, password } = data.payload;

    if (!phone) {
      callback(400, new Error('Phone number is missing'));
      return;
    }

    if (!(firstName || lastName || password)) {
      callback(400, new Error('Require fields to update'));
      return;
    }

    db.read('users', phone, function (err, userData) {
      if (err || !data) {
        callback(404, new Error('User not found.'));
      }

      const dataToStore = {
        firstName: firstName || userData.firstName,
        lastName: lastName || userData.lastName,
        hashedPassword:
          (password && helpers.hash(password)) || userData.hashedPassword,
        phone: userData.phone,
        tosAgreement: userData.tosAgreement,
      };

      db.update('users', phone, dataToStore, function (err) {
        if (err) {
          callback(500, new Error('Unable to update user'));
          return;
        }
        callback(200);
      });
    });
  };
};

module.exports = makeUserUpdate;
