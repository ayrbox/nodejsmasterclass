const { listMenu, getMenu } = require('../handlers/menu');

module.exports = [
  {
    path: '/menus',
    method: 'GET',
    handler: listMenu,
    secure: true,
  },
  {
    path: '/menu',
    method: 'GET',
    handler: getMenu,
    secure: true,
  },
];
