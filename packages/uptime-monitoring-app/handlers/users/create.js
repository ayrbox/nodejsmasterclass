const {
  UserAlreadyExists,
  InvalidUserData,
} = require('./errors');

const makeCreateUser = function(db, logger) {
  return function(data, callback) {
    // validate required fields
    const { payload } = data;

    const rawData = ['firstName', 'lastName', 'phone', 'password', 'tosAgreement']
      .map(key => ({key, value: validateStringRequired(payload[key])}))

    const invalidData = rawData.find(d => !d.value);
    if (invalidData) {
      callback(new InvalidUserData(payload));
      return;
    }

    const {
      firstName,
      lastName,
      phone,
      password,
      tosAgreement,
    } = rawData.reduce((o, item) => {
      o[item.key] = item.value;
      return o; 
    }, {});
      
    //data make sure user does not exists
    db.read('users', phone, (err, data) => {
      if (!err) {
        callback(new UserAlreadyExists(phone));
        return;
      }

      // hash password
      const hashedPassword = helpers.hash(password);
      if (!hashedPassword) {
        callback(new Error('Could not hash the users password'));
        return;
      }

      db.create('users', phone, {
        firstName,
        lastName,
        phone,
        hashedPassword,
        tosAgreement
      }, (err) => {

        if (err) {
          // logger.log(err);
          console.log(err);
          callback(new Error('Unable to create user'));
          return;
        }

        callback(201);
      });
    });
  };
}

module.exports = makeCreateUser;