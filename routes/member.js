const router = require('koa-router')()
const memberControl = require('../controller/member')
router.prefix('/react-koa')

router.post('/member/addMember', memberControl.creatMember)
router.post('/member/deleteMember', memberControl.deleteMember)
router.get('/member/queryMemberList', memberControl.getMemberList)





module.exports = router
