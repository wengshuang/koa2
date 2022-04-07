const mongoose = require('mongoose')

const TagsSchema = new mongoose.Schema({
  name: String,
  creatTime: { type: Date, default: Date.now }
})


const member = mongoose.model('tags', TagsSchema)

module.exports = member
