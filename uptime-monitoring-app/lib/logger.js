
const CONSOLE_COLOR_CODES = {
  debug: '\x1b[32m%s\x1b[0m',
  warning: '\x1b[33m%s\x1b[0m',
  info: '\x1b[36m%s\x1b[0m',
  fatal: '\x1b[35m%s\x1b[0m',
};

const log = function(message, color) {
  // TODO: sanity check for color
  console.log(CONSOLE_COLOR_CODES[color], message);
}

const debug = function(message) {
  log(message, 'debug');
}

const warning = function(message) {
  log(message, 'warning');
}

const info = function(message) {
  log(message, 'info');
}

const fatal = function(message) {
  log(message, 'fatal');
}

module.exports = {
  debug,
  warning,
  info,
  fatal,
};
