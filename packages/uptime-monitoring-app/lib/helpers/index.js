/**
 * Helper filesi
 */

const crypto = require('crypto');
const { inspect } = require('util');
const config = require('../../config');
const createRandomString = require('./createRandomString');

module.exports = {
  hash: (toHash) => {
    if (typeof(toHash) !== 'string' && toHash.length < 0) {
      return false;
    }

    return crypto
      .createHmac('sha256', config.hashingSecret)
      .update(toHash)
      .digest('hex');
  },

  parseJsonToObject: (toParse) => {
    try {
      return JSON.parse(toParse);
    } catch (err) {
      console.log('Error parsing: ', err);
      return {};
    }
  },
  validateStringRequired: value => (value || '').trim().length > 0 ? (value || '').trim() : false,
  createRandomString,
};
