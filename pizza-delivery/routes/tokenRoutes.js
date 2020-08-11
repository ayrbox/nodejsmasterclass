const {
  createToken,
  readToken,
  updateToken,
  deleteToken
} = require("../handlers/tokens");

module.exports = [
  {
    path: "api/tokens",
    method: "POST",
    handler: createToken
  },
  {
    path: "api/tokens",
    method: "GET",
    handler: readToken,
    secure: true
  },
  {
    path: "api/tokens",
    method: "PUT",
    handler: updateToken,
    secure: true
  },
  {
    path: "api/tokens",
    method: "DELETE",
    handler: deleteToken,
    secure: true
  }
];
