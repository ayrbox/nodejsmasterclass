const {
  listMenu,
} = require('../handlers/menu');

module.exports = [{
  path: '/menus',
  method: 'GET',
  handler: listMenu,
  secure: true,
}];
