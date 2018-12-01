'use strict';
const async = require('async');
const _ = require('lodash');
const common = {};


/**
 * 현재 userId를 리턴한다
 */
common.getCurrentUserId = (ctx) => {
  const req = ctx && ctx.req;
  const accessToken = req && req.accessToken;
  return accessToken ? accessToken.userId : undefined;
};

common.updateAttributes = (inst, data, cb) => {
  inst.updateAttributes(data, cb);
};

common.createModel = (model, data, cb) => {
  model.create(data, cb);
};

common.count = (model, where, cb) => {
  model.count(where, cb);
};

common.findOneModel = (model, filter, cb) => {
  model.findOne(filter, (err, result) => {
    if (result === null) {
      err = new Error('게시물은 삭제됬거나 비공개 처리되었습니다.');
      err.statusCode = 404;
      err.name = 'Not found';
    }
    cb(err, result);
  });
};

common.findById = (models, id, cb) => {
  models.findById(id, cb);
};

common.findOneInstance = (models, filter, cb) => {
  models.findOne(filter, cb);
};

common.destroyById = (model, id, cb) => {
  model.destroyById(id, cb);
};

common.destroyAll = (model, where, cb) => {
  model.destroyAll(where, cb);
};

common.find = (model, filter, cb) => {
  model.find(filter, cb);
};

common.upsertWithWhere = (model, where, data, cb) => {
  model.upsertWithWhere(where, data, cb);
};

common.findOrCreate = (model, filter, data, cb) => {
  model.findOrCreate(filter, data, cb);
};

common.updateAll = (model, where, data, cb) => {
  model.updateAll(where, data, cb);
};


module.exports = common;
