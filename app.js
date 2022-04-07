const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')


const index = require('./routes/index')
const users = require('./routes/users')
const member = require('./routes/member')
const tags = require('./routes/tags')
const blogs = require('./routes/blogs')

const koaJwt = require('koa-jwt')

const API_PREFIX = '/react-koa'

const db = require('./db/index.js')
db()
// console.log(app.env)
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(koaJwt({
  secret: 'wengdemo-server-jwt'
}).unless({
  path: [
    /\/login/,
    /\/register/,
    /\/string/,
    /\/favicon.ico/,
    /\/member\/add/
  ]
}))
// , /^\/users\/updatePassword/
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(member.routes(), member.allowedMethods())
app.use(tags.routes(), tags.allowedMethods())
app.use(blogs.routes(), blogs.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', 22222, err, ctx)
  ctx.bodyt = err.message
});

module.exports = app
