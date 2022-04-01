const { member } = require('../models')


const creatMember = async (ctx) => {
  const { name, age, sex, city } = ctx.request.body
  console.log(ctx.request)
  try {
    const findItem = await member.findOne({
      name
    })
    if (findItem) {
      ctx.body = {
        code: 207,
        message: "该用户已存在"
      }
      return
    }
    const data = await member.create({
      name, age, sex, city
    })
    ctx.body = {
      code: 200,
      message: '创建成功',
      data
    }
  } catch (e) {
    console.log(e)
  }
}
const getMemberList = async (ctx) => {
  let { pageSize = 10, currentPage, name = '' } = ctx.query
  currentPage = Number(currentPage || 1)
  // 总页数
  let total = 0
  let totalPage = 0
  await member.find({ name: new RegExp(name, 'i') }).count().then((res) => {
    total = res
  })
  // 设置总页数
  if (total > 0) {
    totalPage = Math.ceil(total / pageSize)
  }
  //计算起始位置
  const start = (currentPage - 1) * pageSize
  await member.find({ name: new RegExp(name, 'i') }).skip(start).limit(pageSize).then((res) => {
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

const deleteMember = async (ctx) => {
  const { id } = ctx.request.body
  await member.findByIdAndRemove({
    _id: id
  }).then((res) => {
    console.log(res)
    ctx.body = {
      code: 200,
      message: '操作成功'
    }
  })
}


module.exports = {
  getMemberList,
  creatMember,
  deleteMember
}
