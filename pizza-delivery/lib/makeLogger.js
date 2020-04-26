const util = require("util");
const CONSOLE_COLORS = {
  debug: "\x1b[32m%s\x1b[0m",
  warning: "\x1b[33m%s\x1b[0m",
  info: "\x1b[36m%s\x1b[0m",
  fatal: "\x1b[35m%s\x1b[0m"
};

function makeLogger(sectionKey, prefix = "app") {
  const debugLogger = util.debuglog(`${prefix}:${sectionKey}`);

  const log = function (message, color) {
    const consoleColor = CONSOLE_COLORS[color] || CONSOLE_COLORS.debug;
    debugLogger(consoleColor, message);
  };

  const debug = function (message) {
    log(message, "debug");
  };

  const warning = function (message) {
    log(message, "warning");
  };

  const info = function (message) {
    log(message, "info");
  };

  const fatal = function (message) {
    log(message, "fatal");
  };

  return {
    debug,
    warning,
    info,
    fatal
  };
}

module.exports = makeLogger;
