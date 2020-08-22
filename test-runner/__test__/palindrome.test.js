const assert = require('assert');
const isPalindrome = require('../app/isPalindrome');
const unit = {};

unit['isPalindrome: should return a boolean'] = function (done) {
  var val = isPalindrome('test');
  assert.equal(typeof val, 'boolean');
  done();
};

// Assert that the getANumber function is returning 1
unit['isPalindrome:: should return true for "civic"'] = function (done) {
  var val = isPalindrome('civic');
  assert.equal(val, true);
  done();
};

// Assert that the getANumber function is returning 2
unit['isPalindrome::: should return true for "Racecar"'] = function (done) {
  var val = isPalindrome('Racecar');
  assert.equal(val, true);
  done();
};

unit['isPalindrome: should return false for "Computer"'] = function (done) {
  var val = isPalindrome('Computer');
  assert.equal(val, false);
  done();
};

unit['isPalindrome: throws error on number input'] = function (done) {
  assert.throws(function () {
    isPalindrome(1001);
  }, TypeError);
  done();
};

unit['isPalindrome: throws error on array input'] = function (done) {
  assert.throws(function () {
    isPalindrome(['civic', 'racecar']);
  }, TypeError);
  done();
};

unit['isPalindrome: throws error on array input'] = function (done) {
  assert.throws(function () {
    isPalindrome({ str: 'civic' });
  }, TypeError);
  done();
};

module.exports = unit;
