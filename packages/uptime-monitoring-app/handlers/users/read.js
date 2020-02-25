const makeReadUser = function(db) {
  return function(data, callback) {
    const { phone } = data.queryStringObject;
    if(!validateStringRequired(phone)) {
      return callback(400, {
        error: 'Invalid phone number'
      });
    }
    
    db.read('users', phone, (err, data) => {
      if (err) {
        return callback(404);
      } else if(!err && data) {
        const {
          firstName,
          lastName,
          tosAgreement,
        } = data;

        callback(200, {
          firstName,
          lastName,
          phone,
          tosAgreement,
        });

      }
    });
  };
}

module.exports = makeReadUser;
