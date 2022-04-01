const find = (model, ctx, params) => (
  model.find(params).then(res => {
    ctx.body = {
      code: 200,
      data: res
    }
  })
)

const findOne = (model, ctx, params) => (
  model.findOne(params).then(res => {
    ctx.body = {
      code: 200,
      data: res
    }
  })
)

const findOneAndUpdate = (model, ctx, where, params) => (
  model.findOneAndUpdate(where, params).then(res => {
    if (res) {
      ctx.body = {
        code: 200,
        message: '操作成功',
      }
    } else {
      ctx.body = {
        code: 200,
        message: '操作失败',
      }
    }
  })
)

const findByIdAndDelete = (model, ctx, params) => (
  model.findByIdAndDelete(params).then(res => {
    ctx.body = {
      code: 200,
      data: res
    }
  })
)

const create = (model, ctx, params) => (
  model.create(params).then(res => {
    ctx.body = {
      code: 200,
      data: res
    }
  })
)
module.exports = {
  create,
  find,
  findOne,
  findOneAndUpdate,
  findByIdAndDelete
}
