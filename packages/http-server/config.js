/** 
 * Create and export configuration variables
 */

// container for all the environment
const environments = {
  staging: {
    envName: 'Staging environment',
    port: 3000,
  },
  production: {
    envName: 'Production environment',
    port: 5000,
  },
};


// export as per environment
const env = (process.env.NODE_ENV || '').toLowerCase();

module.exports = environments[env] || environments.staging;
