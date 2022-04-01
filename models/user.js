const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  auth: [String]

})
const user = mongoose.model('users', UsersSchema)





module.exports = user
