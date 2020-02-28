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
