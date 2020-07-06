const makeUserHandler = require("../handlers/users");

const db = require("../lib/data");

// Making handlers
const {
  createHandler,
  deleteHandler,
  updateHandler,
  readHandler,
} = makeUserHandler(db, null);

module.exports = [
  {
    path: "/api/users",
    method: "POST",
    handler: createHandler,
  },
  {
    path: "/api/users",
    method: "DELETE",
    handler: deleteHandler,
  },
  {
    path: "/api/users",
    method: "PUT",
    handler: updateHandler,
  },
  {
    path: "/api/users",
    method: "GET",
    handler: readHandler,
  },
];
