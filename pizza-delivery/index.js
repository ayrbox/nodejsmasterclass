const makeLogger = require('./lib/makeLogger');

const logger = makeLogger('test', 'app');

logger.fatal('Hello Warning');
