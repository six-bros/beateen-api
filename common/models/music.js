/* eslint-disable max-len,comma-dangle */
'use strict';

const ctrlMusic = require('../../server/controller/ctrl.music');
const hilde = require('../../core/hide-remote-method');
const common = require('../../core/common')
const doc = require('../../doc/document');

module.exports = function (Music) {
  hilde.relationRemoteMethod(Music); // relation remote method 제거

  /**
   * Controller
   */
  Music.findMusicById = ctrlMusic.findMusicById;
  Music.findMusicMixTapes = ctrlMusic.findMusicMixTapes;
  Music.findMusicBeats = ctrlMusic.findMusicBeats;

  Music.createMusic = ctrlMusic.createMusic;
  Music.createCollaboration = ctrlMusic.createCollaboration;

  Music.remoteMethod('findMusicById', {
    description: '음원 상세보기',
    accessType: 'READ',
    notes: [

    ],
    accepts: [
      {arg: 'id', type: 'any', required: true, http: {source: 'path'}, description: 'musicId'}
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'get', path: '/:id'},
  });

  Music.remoteMethod('findMusicMixTapes', {
    description: '음원 믹스테입 리스트 보기',
    accessType: 'READ',
    notes: [
    ],
    accepts: [
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'get', path: '/mixtapes'},
  });

  Music.remoteMethod('findMusicBeats', {
    description: '음원 비트 리스트 보기',
    accessType: 'READ',
    notes: [
    ],
    accepts: [
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'get', path: '/beats'},
  });

  Music.remoteMethod('createMusic', {
    description: '비트 업로드',
    accessType: 'WRITE',
    notes: [
      '### Request',
      `\t${doc.music.request.create}`
    ],
    accepts: [
      {
        arg: 'data', type: 'object', description: '입력', http: {source: 'body'},
      }
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'post', path: '/'},
  });

  Music.remoteMethod('createCollaboration', {
    description: '랩 업로드',
    accessType: 'WRITE',
    notes: [
      '### Request',
      `\t${doc.music.request.collaborate}`
    ],
    accepts: [
      {arg: 'id', type: 'any', required: true, http: {source: 'path'}, description: 'musicId'},
      {
        arg: 'data', type: 'object', description: '입력', http: {source: 'body'},
      },
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'put', path: '/:id'},
  });

};
