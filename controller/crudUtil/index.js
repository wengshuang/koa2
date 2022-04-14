const find = (model, params) => model.find(params)

const findOne = (model, params) => model.findOne(params)

const updateOne = (model, where, params) => model.updateOne(where, params)



const create = (model, params) => model.create(params)

const findByIdAndDelete = (model, params) => model.findByIdAndDelete(params)

module.exports = {
  create,
  find,
  findOne,
  updateOne,
  findByIdAndDelete
}
