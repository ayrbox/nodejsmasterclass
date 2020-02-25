const fs = require('fs');
const path = require('path');

const helpers = require('../helpers');
const makeCreate = require('./create');
const makeDelete = require('./delete');
const makeRead = require('./read');
const makeUpdate = require('./update');

const BASE_DIR = path.join(__dirname, '../.data');

const create = makeCreate(BASE_DIR, fs, path);
const delete_ = makeDelete(BASE_DIR, fs, path);
const read = makeRead(BASE_DIR, fs, path, helpers);
const update = makeUpdate(BASE_DIR, fs, path);


module.exports = {
  create,
  delete: delete_,
  read,
  update,
};
