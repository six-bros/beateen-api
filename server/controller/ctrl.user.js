'use strict';
const async = require('async');
const models = require('../model-instnace');
const common = require('../../core/common');
const crypto = require('crypto');
const ctrlUser = {};

/**
 * 회원 가입
 */
ctrlUser.createUser = (data, cb) => {
  data.password = crypto.createHash('md5').update(data.password).digest('hex');
  const tasks = [
    (cb) => {
      models.User.findOne({where: {and: [{email: data.email}, {email: {neq: null}}]}}, (err, result) => {
        if (result !== null) {
          err = new Error('이미 사용중인 이메일입니다.');
          err.statusCode = 400;
          err.errorCode = 402;
        }
        cb(err);
      });
    },
    (cb) => common.createModel(models.User, data, cb)
  ];
  async.waterfall(tasks, cb);
};

/**
 * 로그아웃
 */
ctrlUser.logoutUser = (userInfo, cb) => {
  // const tasks = [
  //   (cb) => models.User.logout(userInfo.accessTokenId, (err) => cb(err)),
  //   (cb) => common.findById(models.User, userInfo.userId, cb),
  //   (user, cb) => common.updateAttributes(user, {pushToken: null}, cb)
  // ];
  // async.waterfall(tasks, (err) => cb(err, {success: true}));
};


/**
 * 로그인
 */
ctrlUser.loginUser = (data, cb) => {
  const tasks = [
    (cb) => {
      models.User.findOne({where: {email: data.email}}, (err, userInfo) => {
        if (userInfo === null) {
          err = new Error('이메일 또는 비밀번호를 다시 확인해주세요');
          err.statusCode = 400;
          err.errorCode = 205;
        }
        cb(err, userInfo);
      });
    },
    (userInfo, cb) => compareToPassword(userInfo, crypto.createHash('md5').update(data.password).digest('hex'), (err) => cb(err, userInfo)),
    (cb) => models.User.login({email: email, password: password}, cb)
  ];
  async.waterfall(tasks, cb);
};


/**
 * 사용자 페이지
 */
ctrlUser.findUserById = (id, myId, cb) => {
};

/**
 * 계정삭제
 */
ctrlUser.deleteUser = (userId, cb) => {
  const tasks = [
    (cb) => common.findById(models.User, userId, cb),
    (user, cb) => deleteUserData(userId, cb)
  ];
  async.waterfall(tasks, (err) => {
    cb(err, {success: true});
  });
};

/**
 * 비밀번호 매칭
 */
function compareToPassword(user, password, cb) {
  user.hasPassword(password, (err, isMatch) => {
    if (!isMatch) {
      err = new Error('이메일 또는 비밀번호를 다시 확인해주세요');
      err.statusCode = 400;
      err.errorCode = 205;
    }
    cb(err, user);
  });
}


/**
 * 회원 탈퇴시 필요 없는 로그성 데이터를 삭제한다.
 *
 * tasks 순서
 * 1. AccessToken 삭제
 */
const deleteUserData = (userId, cb) => {
  const tasks = [
    (cb) => common.destroyAll(models.AccessToken, {userId: userId}, cb)
  ];
  async.parallel(tasks, cb);
};

module.exports = ctrlUser;
