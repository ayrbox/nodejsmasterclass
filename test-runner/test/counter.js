// Test Counter

module.exports = function (tests) {
  let counter = 0;
  for (let key in tests) {
    if (tests.hasOwnProperty(key)) {
      let subTests = tests[key];
      for (let testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }
  return counter;
};
