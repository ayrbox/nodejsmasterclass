module.exports = [
  {
    path: '/error',
    method: 'GET',
    handler: () => {
      debugger;
      throw new Error('Example Error');
    },
  },
];
