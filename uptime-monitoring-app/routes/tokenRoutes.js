const db = require("../lib/data");
const helpers = require("../lib/helpers");

const makeTokenHandlers = require("../handlers/tokens");

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
} = makeTokenHandlers({ db, helpers });

module.exports = [
  {
    path: "/api/tokens",
    method: "POST",
    handler: createHandler,
  },
  {
    path: "/api/tokens",
    method: "GET",
    handler: readHandler,
  },
  {
    path: "/api/tokens",
    method: "PUT",
    handler: updateHandler,
  },
  {
    path: "/api/tokens",
    method: "DELETE",
    handler: deleteHandler,
  },
];
