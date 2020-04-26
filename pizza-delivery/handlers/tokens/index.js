const { DATADIR } = require("../../context");
const logger = require("../../lib/makeLogger")("handlers:tokens");

const makeDataHandler = require("../../lib/makeDataHandlers");
const makeCreateToken = require("./makeCreateToken");
const makeReadToken = require("./makeReadToken");
const makeUpdateToken = require("./makeUpdateToken");
const makeDeleteToken = require("./makeDeleteToken");

const db = makeDataHandler(DATADIR, "tokens");
const dbUsers = makeDataHandler(DATADIR, "users");

const params = {
  db,
  dbUsers,
  logger
};

const createToken = makeCreateToken(params);
const readToken = makeReadToken(params);
const updateToken = makeUpdateToken(params);
const deleteToken = makeDeleteToken(params);

module.exports = {
  createToken,
  readToken,
  updateToken,
  deleteToken
};
