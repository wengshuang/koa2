const mongoose = require('mongoose')
module.exports = () => {
  mongoose.connect('mongodb://mongoAdmin:changeMe@124.222.245.36:27017/admin', {
    useNewUrlParser: true
  }).then(() => {
    console.log('success')
  }).catch((e) => {
    console.log('erroe', e)
  })
}
