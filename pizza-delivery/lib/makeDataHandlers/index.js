const path = require('path');

const makeCreate = require('./makeCreate');
const makeRead = require('./makeRead');
const makeUpdate = require('./makeUpdate');
const makeDelete = require('./makeDelete');

const makeDataHandlers = function(baseDir, dataType) {
  const dataPath = path.join(baseDir, dataType) ;

  const create = makeCreate(dataPath);
  const read = makeRead(dataPath);
  const update = makeUpdate(dataPath);
  const delete_ = makeDelete(dataPath);

  return {
    create,
    read,
    update,
    delete: delete_,
  }
}

module.exports = makeDataHandlers;
