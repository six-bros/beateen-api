const ctrlMusic = {};

const async = require('async');
const common = require('../../core/common');
const models = require('../model-instnace');
const ormMusic = require('../../orm/orm.music');
const _ = require('lodash')

ctrlMusic.findMusicById = (id, cb) => {
  common.findOneModel(models.Music, ormMusic.findMusicById(id), (err, result) => cb(err, viewMusicDetails(result)))
};

ctrlMusic.findMusicMixTapes = (cb) => {
  const query =
    'select m.id, m.title, m.userId, m.albumImage from music m ' +
    'left join track r on r.musicId = m.id ' +
    'where r.role = "RP" ' +
    'group by m.id ' +
    'ORDER BY RAND() ' +
    'limit 12;'
   models.mysqlDs.connector.execute(query, [], cb);
};

ctrlMusic.findMusicBeats = (cb) => {
  const query =
    'select m.id, m.title, m.userId, m.albumImage from music m ' +
    'left join track r on r.musicId = m.id ' +
    'where r.role = "BM" ' +
    'group by m.id ' +
    'ORDER BY RAND() ' +
    'limit 12;'
  models.mysqlDs.connector.execute(query, [], cb);
};


ctrlMusic.createMusic = (_data, cb) => {
  const music = {
    title: _data.title,
    userId: _data.userId,
    albumImage: _data.albumImage
  }
  const tasks = [
    (cb) => common.createModel(models.Music, music, cb),
    (inst, cb) => {
      const track = {
        privateId: 'randomPrivateId',
        audioURL: _data.audioURL,
        role: _data.role,
        userId: _data.userId,
        musicId: inst.id
      }
      common.createModel(models.Track, track, cb)
    }
  ];
  async.waterfall(tasks, cb)
};

ctrlMusic.createCollaboration = (id, data, cb) => {
  data.role = 'RP';
  data.musicId = id;
  common.createModel(models.Track, data, cb);
}

const viewMusicDetails = (_music) => {
  const music = JSON.parse(JSON.stringify(_music));
  const tracks = music.tracks || []
  const ob = _.find(tracks, {role: 'RP'}) || _.find(tracks, {role: 'MM'})
  music.audioURL = ob.audioURL;
  const users = []
  _.forEach(tracks, track => {
    track.user.role = track.role
    users.push(track.user)
  })
  music.users = users
  delete music.tracks
  return music

}

module.exports = ctrlMusic;
