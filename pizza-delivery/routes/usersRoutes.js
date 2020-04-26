const {
  createUser,
  deleteUser,
  updateUser,
  readUser
} = require("../handlers/users");

module.exports = [
  {
    path: "/users",
    method: "POST",
    handler: createUser
  },
  {
    path: "/users",
    method: "DELETE",
    handler: deleteUser,
    secure: true
  },
  {
    path: "/users",
    method: "PUT",
    handler: updateUser,
    secure: true
  },
  {
    path: "/users",
    method: "GET",
    handler: readUser,
    secure: true
  }
];
