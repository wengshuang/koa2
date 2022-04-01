const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: Number,
  city: String,
  creatTime: { type: Date, default: Date.now }
})


const member = mongoose.model('Member', MemberSchema)

module.exports = member
