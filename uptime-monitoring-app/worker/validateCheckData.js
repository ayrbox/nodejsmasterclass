const validateCheckData = function(checkData) {
  const d = (typeof(checkData) === 'object' && checkData !== null) ? checkData : {};
  const {
    id,
    phone,
    protocol,
    url,
    method,
    successCodes,
    timeouts,
  }  = d;

  return !!(id && phone && protocol && url && method && successCodes && timeouts);
}

module.exports = validateCheckData;
