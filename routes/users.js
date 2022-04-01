const router = require('koa-router')()
// const { user } = require('../models')
const userControl = require('../controller/user')
router.prefix('/react-koa')


router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// router.post('/add', userControl.userAdd)


// router.post('/update', userControl.userUpdate)

// router.post('/del', userControl.userDel)


// router.get('/find', userControl.userFindAll)


// router.get('/find/:id', userControl.userFindById)

router.get('/login', userControl.userLogin)
router.post('/register', userControl.register)
router.post('/verify', userControl.verify)
router.post('/updatePassword', userControl.updatePassword)
router.get('/getUserInfo', userControl.getUserInfo)

module.exports = router
