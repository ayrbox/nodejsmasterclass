const logMiddleware = require('./logMiddleware');
const authToken = require('./authToken');

module.exports = [logMiddleware, authToken];
