const makeDeleteUser = function(db) {
  return function(data, callback) {
    // Delete user datak
    // TODO: check authenciation and authorisation

    // Validate phone number
    const { phone } = data.queryString;

    if(!phone) {
      callback(400, new Error('Phone number is required'));
      return;
    } 

    db.read('users', phone, function(err, data) {
      if (err || !data) {
        callback(404);
        return;
      }

      db.delete('users', phone, function(err) {
        if (!err) {
          callback(500, new Error('Could not delete user'));
          return;
        }

        callback(200);
      });
    });
  }
};

module.exports = makeDeleteUser;
