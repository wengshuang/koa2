const { tags, blogs } = require('../models')
const { findOne, create, find, findByIdAndDelete } = require('./crudUtil')
const addTag = async (ctx) => {
  const { name } = ctx.request.body
  try {
    const res = await findOne(tags, { name })
    console.log(res, 99999)
    if (!res) {
      await create(tags, { name })
      ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      ctx.body = {
        code: 201,
        message: '已存在该名称'
      }
    }
  } catch (e) {
    console.log(e)
  }
  // tags.create({
  //   name
  // })
}
// 获取所有的tags
const getAllTags = async (ctx) => {
  try {
    const res = await find(tags)
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: res
    }
  } catch (e) {
    console.log(e)
  }
}
// 获取所有tags分页
const getTags = async (ctx) => {
  let { pageSize = 10, currentPage, name = '' } = ctx.query
  currentPage = Number(currentPage || 1)
  // 总页数
  let total = 0
  let totalPage = 0
  await find(tags, { name: new RegExp(name, 'i') }).count().then((res) => {
    total = res
  })
  // 设置总页数
  if (total > 0) {
    totalPage = Math.ceil(total / pageSize)
  }
  //计算起始位置
  const start = (currentPage - 1) * pageSize
  await find(tags, { name: new RegExp(name, 'i') }).skip(start).limit(pageSize).then((res) => {
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

const delTag = async (ctx) => {
  const { id } = ctx.request.body
  try {
    const res = await find(blogs, { tagId: id }).count()
    if (res) {
      ctx.body = {
        code: 201,
        message: '该标签下有博客，不能删除'
      }
      return
    }
    await findByIdAndDelete(tags, { _id: id })
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  addTag,
  getTags,
  delTag,
  getAllTags
}
