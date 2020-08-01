const makeCheckHandlers = require("../handlers/checks");
const db = require("../lib/data");

const {
  createHandler,
  getHandler,
  updateHandler,
  deleteHandler,
} = makeCheckHandlers({
  db,
  logger: undefined,
});

module.exports = [
  {
    path: "/api/checks",
    method: "POST",
    handler: createHandler,
  },
  {
    path: "/api/checks",
    method: "GET",
    handler: getHandler,
  },
  {
    path: "/api/checks",
    method: "PUT",
    handler: updateHandler,
  },
  {
    path: "/api/checks",
    method: "DELETE",
    handler: deleteHandler,
  },
];
