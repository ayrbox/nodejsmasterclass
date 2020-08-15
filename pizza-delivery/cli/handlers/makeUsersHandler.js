const { printHorizonatalLine, padSpace, toTitleCase } = require("../utils");

const printUser = function(user) {
  const { name, email, phone, address, signupDate } = user;

  console.log(padSpace("Name:", "RIGHT", 14), name);
  console.log(padSpace("Email:", "RIGHT", 14), email);
  console.log(padSpace("Phone:", "RIGHT", 14), phone);
  console.log(padSpace("Address:", "RIGHT", 14), address);
  console.log(
    padSpace("Signup Date:", "RIGHT", 14),
    new Date(signupDate).toString()
  );
  printHorizonatalLine();
};

const makeUserHandler = function({ db, fileLogger }) {
  return function(_, options) {
    if (options.id) {
      const userId = options.id;
      db.read(userId, function(errorReadingUser, userData) {
        if (errorReadingUser) {
          console.log(`Unexpected error reading user for ${userId}`);
          return;
        }
        printUser(userData);
      });
      return;
    }

    fileLogger.readLog(function(err, data) {
      if (err) {
        console.log("Unexpected error reading orders");
        return;
      }

      const logs = data.split(/\r?\n/);
      logs.forEach(logData => {
        try {
          if (logData.trim()) {
            const user = JSON.parse(logData.trim());
            printUser(user);
          }
        } catch {}
      });
    });
  };
};

module.exports = makeUserHandler;
