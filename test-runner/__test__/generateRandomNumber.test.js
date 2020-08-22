const assert = require('assert');
const generate = require('../app/generateRandomNumber');
const unit = {};

unit['generateRandomNumber: should return a number'] = function (done) {
  var val = generate();
  assert.equal(typeof val, 'number');
  done();
};

// Assert that the getANumber function is returning 1
unit[
  'generateRandomNumber: should return less than and equal 1000'
] = function (done) {
  var val = generate();
  assert.ok(val <= 1000);
  done();
};

// Assert that the getANumber function is returning 2
unit['generateRandomNumber: should return greater than 0'] = function (done) {
  var val = generate();
  assert.ok(val >= 0);
  done();
};

module.exports = unit;
