/** 
 * Create and export configuration variables
 */

// container for all the environment
const environments = {
  staging: {
    envName: 'Staging environment',
    httpPort: 3000,
    httpsPort: 3001,
    hashingSecret: 'thisissecr3at',
  },
  production: {
    envName: 'Production environment',
    httpPort: 5000,
    httpsPort: 5001,
    hashingSecret: 'thisissecr3at',
  },
};


// export as per environment
const env = (process.env.NODE_ENV || '').toLowerCase();

module.exports = environments[env] || environments.staging;
