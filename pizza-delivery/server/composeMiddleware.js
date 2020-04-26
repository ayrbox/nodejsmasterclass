function composeMiddleware(fnMiddlewares) {
  return (req, res, handler) => {
    const nextFn = fnMiddlewares.reduceRight((r, fn) => {
      return function () {
        fn(req, res, r);
      };
    }, handler);
    nextFn();
  };
}

module.exports = composeMiddleware;
