'use strict';
if (process.env.NODE_ENV !== 'init') {
  return;
}

const async = require('async');

module.exports = function (app) {
  const mysqlDs = app.dataSources.mysqlDs;
  const tables = [
    'user',
    'AccessToken',
    'ACL'
  ];

  const tasks = [
      (cb) => mysqlDs.autoupdate(tables, (err, result) => {
        console.info(`Loopback tables [${tables}] created in ${mysqlDs.adapter.name}`);
        cb(err, result);
      })
    ];
  async.series(tasks, (err) => {
    if (err) throw err;
    console.info('Project init setting finish');
    process.exit(0);
  });
};
