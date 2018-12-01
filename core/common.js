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
  model.findOne(filter, cb);
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
