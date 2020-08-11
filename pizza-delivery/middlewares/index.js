const path = require("path");

const logMiddleware = require("./logMiddleware");
const authToken = require("./authToken");
const serveStaticMiddleware = require("./serveStaticMiddleware");
const cookieParser = require("./cookieParser");

const serveStatic = serveStaticMiddleware(path.join(process.cwd(), "public"));

module.exports = [logMiddleware, serveStatic, cookieParser, authToken];
