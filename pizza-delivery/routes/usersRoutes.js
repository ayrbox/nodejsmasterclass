const {
  createUser,
  deleteUser,
  updateUser,
  readUser,
  loginHandler,
  signupHandler,
  loggedOutHandler,
  accountPageHandler
} = require("../handlers/users");

module.exports = [
  {
    path: "api/users",
    method: "POST",
    handler: createUser
  },
  {
    path: "api/users",
    method: "DELETE",
    handler: deleteUser,
    secure: true
  },
  {
    path: "api/users",
    method: "PUT",
    handler: updateUser,
    secure: true
  },
  {
    path: "api/users",
    method: "GET",
    handler: readUser,
    secure: true
  },
  {
    path: "/login",
    method: "GET",
    handler: loginHandler,
    secure: false
  },
  {
    path: "/signup",
    method: "GET",
    handler: signupHandler,
    secure: false
  },
  {
    path: "/logged-out",
    method: "GET",
    handler: loggedOutHandler,
    secure: false
  },
  {
    path: "/account",
    method: "GET",
    handler: accountPageHandler,
    secure: true
  }
];
