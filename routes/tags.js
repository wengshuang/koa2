const router = require('koa-router')()
const tagsControl = require('../controller/tags')
router.prefix('/react-koa')

router.post('/tags/addTag', tagsControl.addTag)
router.get('/tags/getTags', tagsControl.getTags)
router.get('/tags/getAllTags', tagsControl.getAllTags)
router.post('/tags/delTag', tagsControl.delTag)





module.exports = router
