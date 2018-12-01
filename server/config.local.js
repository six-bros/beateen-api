const packageFile = require('../package.json');
const version = packageFile.version.split('.').shift();

module.exports = {
  restApiRoot: '/api',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 80
};
