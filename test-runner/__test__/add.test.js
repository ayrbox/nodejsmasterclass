const assert = require('assert');
const add = require('../app/add');
const unit = {};

unit['add: should return a number'] = function (done) {
  var val = add(10, 1);
  assert.equal(typeof val, 'number');
  done();
};

// Assert that the getANumber function is returning 1
unit['add: should return sum'] = function (done) {
  var val = add(20, 10);
  assert.equal(val, 30);
  done();
};

// Assert that the getANumber function is returning 2
unit['add: should not return wrong sum'] = function (done) {
  var val = add(1, 2);
  assert.notEqual(val, 2);
  done();
};

unit['add: should add number with precision value'] = function (done) {
  var val = add(1.1, 2.2);
  assert.notEqual(val, 3.3);
  done();
};

unit['add: throws error on string input'] = function (done) {
  assert.throws(function () {
    add('100', 100);
  }, TypeError);
  done();
};

module.exports = unit;
