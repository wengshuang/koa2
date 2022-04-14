const { blogs, tags, browserIp } = require('../models')
const { db } = require('../models/member')

const { findOne, create, find, findByIdAndDelete, updateOne } = require('./crudUtil')

const addBlog = async (ctx) => {
  const { tagId, title, content } = ctx.request.body
  try {
    // 匹配到tag的name
    const tag = await findOne(tags, { _id: tagId })
    if (!tag) {
      ctx.body = {
        code: 201,
        message: 'tag不存在'
      }
    }
    await create(blogs, { tagName: tag.name, tagId: tag._id, content, title })
    ctx.body = {
      code: 200,
      message: '操作成功'
    }

  } catch (e) {
    console.log(e)
  }
}

const getBlogs = async (ctx) => {
  let { pageSize = 10, currentPage, title = '', tagId = "" } = ctx.query
  currentPage = Number(currentPage || 1)
  // 总页数
  let total = 0
  let totalPage = 0
  await find(blogs, { title: new RegExp(title, 'i'), tagId: new RegExp(tagId, 'i') }).count().then((res) => {
    total = res
  })
  // 设置总页数
  if (total > 0) {
    totalPage = Math.ceil(total / pageSize)
  }
  //计算起始位置
  const start = (currentPage - 1) * pageSize
  await find(blogs, {
    title: new RegExp(title, 'i'), tagId: new RegExp(tagId, 'i')
  }).skip(start).limit(pageSize).sort({ creatTime: -1 }).then((res) => {
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: {
        pageSize, currentPage, totalPage, total,
        data: res
      }
    }
  })
}
const delBlog = async (ctx) => {
  const { id } = ctx.request.body
  try {
    const res = await findByIdAndDelete(blogs, { _id: id })
    if (res) {
      ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '操作失败'
      }
    }
  } catch (e) {
    console.log(e)
  }
}

// 修改blog
const updateBlog = async (ctx) => {
  const { id, title, content } = ctx.request.body
  try {
    const res = await updateOne(blogs, { _id: id }, { title, content })
    console.log(res, 'res')
    if (res) {
      ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '操作失败'
      }
    }
  } catch (e) {
    console.log(e)
  }

}
// 增加浏览量
const updateViews = async (ctx) => {
  try {
    const { id } = ctx.query
    const ip = ctx.request.ip
    let req = ctx.req;
    // let clientIP = req.headers['x-forwarded-for'] ||
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress ||
    console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress, req.socket.remoteAddress, 'ip')
    if (id) {
      await create(browserIp, { blogId: id, ip })
      const number = await find(browserIp, { blogId: id }).distinct('ip')
      // console.log(number.length, 'number')
      await updateOne(blogs, { _id: id }, { views: number.length })
      ctx.body = {
        code: 200
      }
    } else {
      ctx.body = {
        code: 201,
        message: '参数错误'
      }
    }
  } catch (e) {
    console.log(e)
  }
}

// db.blogs.aggregate([{ "$lookup": { "from": "tags", "localField": "tagId", "foreignField": "_id", "as": "T" } }])



// 获取blog详情
const getBlogById = async (ctx) => {
  const { id } = ctx.query
  try {

    const res = await findOne(blogs, { _id: id })
    // const b = await blogs.aggregate([{ "$lookup": { "from": "tags", "localField": "tagId", "foreignField": "_id", "as": "T" } }])
    // console.log(b, 'b')
    if (res) {
      ctx.body = {
        code: 200,
        message: '查询成功',
        data: res
      }
    } else {
      ctx.body = {
        code: 201,
        message: '查询失败'
      }
    }
  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  addBlog,
  getBlogs,
  delBlog,
  updateBlog,
  getBlogById,
  updateViews
}
