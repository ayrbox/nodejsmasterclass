const path = require("path");

const { DATADIR } = require("../../context");
const logger = require("../../lib/makeLogger")("handlers:users");

const makeRender = require("../../lib/makeRender");

const makeDataHandler = require("../../lib/makeDataHandlers");
const makeCreateUser = require("./makeCreateUser");
const makeReadUser = require("./makeReadUser");
const makeUpdateUser = require("./makeUpdateUser");
const makeDeleteUser = require("./makeDeleteUser");
const makeLoginHandler = require("./makeLoginHandler");
const makeSignupHandler = require("./makeSignupHandler");
const makeLoggedOutHandler = require("./makeLoggedOutHandler");

const db = makeDataHandler(DATADIR, "users");

const createUser = makeCreateUser({ db, logger });
const readUser = makeReadUser({ db, logger });
const updateUser = makeUpdateUser({ db, logger });
const deleteUser = makeDeleteUser({ db, logger });

// Pages UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const loginHandler = makeLoginHandler(render, {});
const signupHandler = makeSignupHandler(render, {});
const loggedOutHandler = makeLoggedOutHandler(render, {});

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  loginHandler,
  signupHandler,
  loginHandler,
  loggedOutHandler
};
