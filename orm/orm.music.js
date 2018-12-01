
const ormMusic = {};

ormMusic.findMusicById = (id) => {
  return {
    where: {
      id: id
    },
    fields: ['id', 'title', 'albumImage' ],
    include: {
      relation: 'tracks',
      scope: {
        fields: ['musicId', 'userId', 'role', 'privateId', 'audioURL'],
        include: {
          relation: 'user',
          scope: {
            fields: ['id', 'name', 'profileImage', 'privateId']
          }
        }
      }
    }
  };
};



module.exports = ormMusic;
