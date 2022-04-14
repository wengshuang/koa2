const mongoose = require('mongoose')
const dburl = process.env.npm_lifecycle_event === 'dev' ? 'mongodb://localhost:27017/wengdemo' : 'mongodb://mongoAdmin:changeMe@124.222.245.36:27017/admin'
module.exports = () => {
  mongoose.connect(dburl, {
    useNewUrlParser: true
  }).then(() => {
    console.log('success')
  }).catch((e) => {
    console.log('erroe', e)
  })
}
