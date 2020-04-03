const path = require('path');

const DATADIR = path.join(process.cwd(), '.data');

const makeLogger = require('./lib/makeLogger');
const logger = makeLogger('test', 'app');

logger.fatal('Hello Warning');

const makeDataHandler = require('./lib/makeDataHandlers');


const usersData = makeDataHandler(DATADIR, 'users');

// usersData.create('sabin@hotmail.com', {
//   name: 'Sabin',
//   email: 'sabin@hotmail.com'
// }, (err) => {
//   if(err) {
//     logger.fatal(err.message);
//     return;
//   }
//   logger.info('File created');
// })

// usersData.update('sabin@hotmail.com', {
//   name: 'Sabin Raj DANGOL',
//   email: 'sabin.raj@hotmail.com',
// }, function(err) {
//   if(err) {
//     logger.warning('Unable to update data');
//   } else {
//     logger.info('Data updated for sabin');
//   }
// })

// usersData.read('sabin@hotmail.com', (err, data) => {
//   if(err) {
//     logger.fatal(err);
//     return;
//   }
//   console.log(JSON.stringify(data, null, 4));
// });

// usersData.delete('sabin@hotmail.com', function(err) {
//   if(err) {
//     logger.warning('Unable to delete file');
//   } else {
//     logger.info('File deleted');
//   }
// });

