/**
 * Helper files for hashing
 */

const crypto = require('crypto');
const { hashingSecret } = require('../config');


const HASH_ALGORITHM = 'sha256';
const hash = function(toHash) {
  if (typeof(toHash) !== 'string' && toHash.length < 0) {
    return false;
  }

  return crypto
    .createHmac(HASH_ALGORITHM, hashingSecret)
    .update(toHash)
    .digest('hex');
}

module.exports = {
  hash,
};