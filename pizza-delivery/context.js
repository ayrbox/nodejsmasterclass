const path = require("path");
const DATADIR = path.join(process.cwd(), ".data");
const LOG_DIR = path.join(process.cwd(), ".logs");

module.exports = {
  DATADIR,
  LOG_DIR
};
