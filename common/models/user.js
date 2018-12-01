/* eslint-disable max-len,comma-dangle */
'use strict';

const ctrlUser = require('../../server/controller/ctrl.user');
const hilde = require('../../core/hide-remote-method');
const common = require('../../core/common')

module.exports = function (User) {
  hilde.relationRemoteMethod(User); // relation remote method 제거

  /**
   * Controller
   */
  User.createUser = ctrlUser.createUser;
  User.loginUser = ctrlUser.loginUser;
  User.logoutUser = ctrlUser.logoutUser;

  User.findUserById = ctrlUser.findUserById;
  User.deleteUser = ctrlUser.deleteUser;

  /**
   * Remote Method
   */
  User.remoteMethod('loginUser', {
    description: '이메일 로그인',
    accessType: 'EXECUTE',
    notes: [],
    accepts: [
      {arg: 'data', type: 'object', required: true, http: {source: 'body'}},
    ],
    returns: {arg: 'AccessToken', type: 'object', model: 'AccessToken', root: true},
    http: {source: 'path', path: '/login', verb: 'post'},
  });

  User.remoteMethod('logoutUser', {
    description: '로그아웃',
    accessType: 'EXECUTE',
    notes: [],
    accepts: [
      {
        arg: 'userId', type: 'number', http: (ctx) => {
          return common.getCurrentUserId(ctx);
        }
      }
    ],
    http: {verb: 'all', path: '/logout'},
  });

  User.remoteMethod('createUser', {
    description: '이메일 회원가입',
    accessType: 'WRITE',
    notes: [
    ],
    accepts: [
      {
        arg: 'data', type: 'object', description: '입력', http: {source: 'body'},
      },
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'post', path: '/'},
  });

  User.remoteMethod('findUserById', {
    description: '사용자 페이지',
    accessType: 'READ',
    notes: [],
    accepts: [
      {arg: 'id', type: 'any', required: true, http: {source: 'path'}, description: 'userId'}
    ],
    returns: {arg: 'pet Info', type: 'object', root: true},
    http: {path: '/:id', verb: 'get'},
  });

  User.remoteMethod('deleteUser', {
    accessType: 'WRITE',
    description: '회원탈퇴',
    notes: [],
    http: {verb: 'del', path: '/:id'},
    accepts: [
      {arg: 'id', type: 'any', http: {source: 'path'}, required: true, description: 'userId'},
    ],
    returns: {arg: 'data', root: true},
  });

};
