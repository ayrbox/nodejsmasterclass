const makeUserUpdate = function(db) {
  return (data, callback) => {
    const { phone } = data.query;
    if(!validateStringRequired(phone)) {
      return callback(400, {
        error: 'Invalid phone number'
      });
    }
  }
}

module.exports = makeUserUpdate;
