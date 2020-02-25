const makePing = () => {
  return function(data, callback) {
    callback(200);  
  }
}

module.exports = makePing;