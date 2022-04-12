const mongo = require('mongoose');
const schema = new mongo.Schema({
  blogId: {
    type: String,
  },
  ip: {
    type: String,
  }
})

module.exports = mongo.model('BrowserIp', schema);
