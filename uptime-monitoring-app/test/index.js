const unit = require('../__test__/unit');
// const api = erquire('../__test__/api');

const tests = { unit };

const countTest = require('./makeCounter')(tests);
const produceTestReport = require('./report');

// Run all the tests, collecting the errors and successes
const runTests = function () {
  var errors = [];
  var successes = 0;
  var limit = countTest();
  var counter = 0;
  for (var key in tests) {
    if (tests.hasOwnProperty(key)) {
      var subTests = tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (function () {
            var tmpTestName = testName;
            var testValue = subTests[testName];
            // Call the test
            try {
              testValue(function () {
                // If it calls back without throwing, then it succeeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                counter++;
                successes++;
                if (counter === limit) {
                  produceTestReport(limit, successes, errors);
                }
              });
            } catch (e) {
              // If it throws, then it failed, so capture the error thrown and log it in red
              errors.push({
                name: testName,
                error: e,
              });
              console.log('\x1b[31m%s\x1b[0m', tmpTestName);
              counter++;
              if (counter === limit) {
                produceTestReport(limit, successes, errors);
              }
            }
          })();
        }
      }
    }
  }
};

runTests();
