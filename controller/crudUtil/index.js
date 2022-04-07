const find = (model, params) => model.find(params)

const findOne = (model, params) => model.findOne(params)

const update = (model, where, params) => model.update(where, params)



const create = (model, params) => model.create(params)

const findByIdAndDelete = (model, params) => model.findByIdAndDelete(params)

module.exports = {
  create,
  find,
  findOne,
  update,
  findByIdAndDelete
}
