module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'signup.tpl.html',
      function (err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, 'text/html');
      },
      {
        ...appData,
        title: 'Sign Up',
        description: 'Please sign up to order pizza online.',
        message: '',
      },
      '_loginLayout.tpl.html'
    );
  };
};
