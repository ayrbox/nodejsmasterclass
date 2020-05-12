const makeAlertUser = function (smsClient) {
  return function ({ phone, method, protocol, url, state }) {
    const message = `Alert: your check for ${method.toUpperCase()} ${protocol}://${url} is currently ${state}`;
    smsClient.send({ phone, message }, function (err) {
      if (!err) {
        console.log('User is alerted');
      } else {
        console.log('Error sending SMS alert');
      }
    });
  };
};

module.exports = makeAlertUser;
