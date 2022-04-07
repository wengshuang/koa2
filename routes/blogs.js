const router = require('koa-router')()
const control = require('../controller/blogs')
router.prefix('/react-koa')


router.post('/blogs/addBlog', control.addBlog)
router.get('/blogs/getBlogs', control.getBlogs)
router.post('/blogs/delBlog', control.delBlog)
router.post('/blogs/updateBlog', control.updateBlog)
router.get('/blogs/getBlogById', control.getBlogById)



module.exports = router
