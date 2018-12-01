'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const ModelInst = require('./model-instnace');
// const common = require('../core/common');

const app = module.exports = loopback();
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.use(loopback.token({
  currentUserLiteral: 'me'
}));

boot(app, __dirname, function (err) {
  if (err) throw err;
  ModelInst.mysqlDs = app.dataSources.mysqlDs;
  ModelInst.User = (loopback.getModel('user'));
  ModelInst.AccessToken = (loopback.getModel('AccessToken'));
  if (require.main === module)
    app.start();
});
