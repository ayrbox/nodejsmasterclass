/**
 * Command Handlers
 * */

const exitHandler = require("./exitHandler");
const makeHelpHandler = require("./helpHandler");
const statsHandler = require("./statsHandler");
const makeMenuHandler = require("./menuHandler");
const makeOrderHandler = require("./makeOrderHandler");
const makeUserHandler = require("./makeUsersHandler");

const { DATADIR, LOG_DIR } = require("../../context");

const makeFileLogger = require("../../lib/makeFileLogger");
const makeDataHandler = require("../../lib/makeDataHandlers");
const dbMenu = makeDataHandler(DATADIR, "menu");
const dbOrder = makeDataHandler(DATADIR, "order");
const dbUser = makeDataHandler(DATADIR, "users");

const orderFileLogger = makeFileLogger(LOG_DIR, "orders");
const userFileLogger = makeFileLogger(LOG_DIR, "users");

// TODO: remove handler
const handler = function(command, args) {
  console.log(`TODO: Command (${command}) not implemented yet.`);
};

const commands = [
  {
    command: "help",
    description: "Help for cli."
  },
  {
    command: "man",
    description: "Alias for help."
  },
  {
    command: "exit",
    description: "Exit application",
    handler: exitHandler
  },
  {
    command: "stats",
    description:
      "Get statistics on the underlying operating system and resource utilization.",
    handler: statsHandler
  },
  {
    command: "menu",
    description: "List all the menu items available.",
    handler: makeMenuHandler({ db: dbMenu })
  },
  {
    command: "orders",
    description:
      "List detail of recent orders. Options --id <ORDERID> Returns details of order.",
    handler: makeOrderHandler({
      db: dbOrder,
      fileLogger: orderFileLogger
    })
  },
  {
    command: "users",
    description:
      "List detail of users recently signup. Option --id <USERID> Returns detail of specified users.",
    handler: makeUserHandler({
      db: dbUser,
      fileLogger: userFileLogger
    })
  }
];

// Special kind handle which need to read command and descripton
// Handle function is attached to command when exporting modules
const helpHandler = makeHelpHandler(commands);
const HELP_COMMANDS = ["man", "help"];

module.exports = commands.map(_ => {
  if (HELP_COMMANDS.includes(_.command)) {
    return {
      ..._,
      handler: helpHandler
    };
  } else {
    return _;
  }
});
