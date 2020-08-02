const path = require('path');

const logMiddleware = require('./logMiddleware');
const authToken = require('./authToken');
const makeServeStatic = require('./serveStaticMiddleware');

const serveStatic = makeServeStatic(path.join(process.cwd(), 'public'));

module.exports = [logMiddleware, serveStatic, authToken];
