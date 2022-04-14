const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  tagId: {
    type: String,
    required: true
  },
  tagName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  creatTime: { type: Date, default: Date.now }

})
module.exports = mongoose.model('blogs', schema)
