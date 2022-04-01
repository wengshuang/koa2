const jwt = require('jsonwebtoken')


const { user } = require('../models')



const userLogin = async (ctx) => {
  const { username, password } = ctx.query
  await user.findOne({
    username, password
  }).then(res => {
    if (res) {
      const token = jwt.sign({
        username,
        id: res._id
      }, 'wengdemo-server-jwt', {
        expiresIn: 3600 * 1 * 24
      })
      ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          ...res._doc,
          token
        }
      }
    } else {
      ctx.body = {
        code: 401,
        message: '用户名或密码错误！'
      }
    }
  }).catch(() => {
    ctx.body = {
      code: 500,
      message: '登录出错'
    }
  })
}

const register = async (ctx) => {
  const { username, password, auth } = ctx.request.body
  const res = await user.findOne({
    username, password
  })
  if (res) {
    ctx.body = {
      code: 200,
      message: '该用户名已存在！'
    }
  } else {
    await user.create({
      username, password, auth
    })
    ctx.body = {
      code: 200,
      message: '创建成功！'
    }
  }
}

const verify = async (ctx) => {
  let token = ctx.header.authorization
  token = token.replace('Bearer ', '')
  try {
    const res = jwt.verify(token, 'wengdemo-server-jwt')
    const data = await user.findOne({
      id: res.id
    })
    ctx.body = {
      code: 200,
      data,
      message: '登录成功！'
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: '验证失败！'
    }
  }
}
const updatePassword = async (ctx) => {
  const { username, password } = ctx.request.body
  await user.updateOne({
    username
  }, {
    password
  }).then(res => {
    if (res.matchedCount > 0) {
      ctx.body = {
        code: 200,
        message: "修改成功"
      }
    } else {
      ctx.body = {
        code: 200,
        message: "请输入正确的用户名！"
      }
    }

  })
}

const getUserInfo = async (ctx) => {
  let token = ctx.header.authorization
  token = token.replace('Bearer ', '')
  try {
    const res = jwt.verify(token, 'wengdemo-server-jwt')
    const data = await user.findOne({
      id: res.id
    })
    console.log(data)
    ctx.body = {
      code: 200,
      data,
      message: '登录成功！'
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: '验证失败！'
    }
  }
}

module.exports = {
  // userAdd,
  // userDel,
  // userUpdate,
  // userFindAll,
  // userFindById,
  getUserInfo,
  updatePassword,
  verify,
  register,
  userLogin
}
