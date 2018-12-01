/* eslint-disable max-len,comma-dangle */
'use strict';

const ctrlMusic = require('../../server/controller/ctrl.Music');
const hilde = require('../../core/hide-remote-method');
const common = require('../../core/common')

module.exports = function (Music) {
  hilde.relationRemoteMethod(Music); // relation remote method 제거

  /**
   * Controller
   */
  Music.createMusic = ctrlMusic.createMusic;

  Music.remoteMethod('findMusicById', {
    description: '',
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

  Music.remoteMethod('createMusic', {
    description: '',
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

  Music.remoteMethod('createMusicCollaboration', {
    description: '',
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

};
