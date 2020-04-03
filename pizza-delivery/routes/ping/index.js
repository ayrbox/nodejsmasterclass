
module.exports = [{
  path: '/ping',
  method: 'GET',
  handler: (_, callback) => callback(200, { message: 'PONG'}),
}]