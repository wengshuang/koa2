const router = require('koa-router')()
const blogsControl = require('../controller/blogs')
const tagsControl = require('../controller/tags')

router.prefix('/blogs-open')


router.get('/blogs/getBlogs', blogsControl.getBlogs)
router.get('/blogs/getBlogById', blogsControl.getBlogById)
router.get('/tags/getTags', tagsControl.getAllTags)
router.get('/blogs/updateViews', blogsControl.updateViews)



module.exports = router
