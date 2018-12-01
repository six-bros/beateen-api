const doc = {};

doc.user = {
  request: {
    signUp: JSON.stringify({
      'name': 'string',
      'email': 'string',
      'password': 'string',
      'profileImage': 'string',
      'privateId': 'string'
    }, null, 6),
    signIn: JSON.stringify({
      'email': 'string',
      'password': 'string'
    }, null, 6)
  }
}

doc.music = {
  request: {
    create: JSON.stringify({
      'userId': 'string',
      'title': 'string',
      'albumImage': 'string',
      'audioURL': 'string',
      'role': 'BM or RP (Beat Maker / Raper)',
      'privateId': 'string'
    }, null, 6),
    collaborate: JSON.stringify({
      'userId': 'string',
      'audioURL': 'string',
      'role': 'BM or RP (Beat Maker / Raper)',
      'privateId': 'string'
    }, null, 6)
  }
}

module.exports = doc;
