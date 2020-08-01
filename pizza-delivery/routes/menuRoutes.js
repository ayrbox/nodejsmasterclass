const { listMenu, getMenu } = require('../handlers/menu');

module.exports = [
  {
    path: 'api/menus',
    method: 'GET',
    handler: listMenu,
    secure: true,
  },
  {
    path: 'api/menu',
    method: 'GET',
    handler: getMenu,
    secure: true,
  },
];
