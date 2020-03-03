/** 
 * Create and export configuration variables
 */

// container for all the environment
const environments = {
  staging: {
    envName: 'Staging environment',
    httpPort: 3099,
    httpsPort: 3091,
    hashingSecret: 'thisissecr3at',
    maxChecks: 10,
    fromPhone: '+12055089327',
    accountSID: 'ACc041fe75158c333bbb87681773ece9e9',
    authToken: '8838feaaddc81ba35f1931d40cf853a6',
    apiHost: 'api.twilio.com',
  },
  production: {
    envName: 'Production environment',
    httpPort: 5000,
    httpsPort: 5001,
    hashingSecret: 'thisissecr3at',
    maxChecks: 5,
  },
};


// export as per environment
const env = (process.env.NODE_ENV || '').toLowerCase();

module.exports = environments[env] || environments.staging;
