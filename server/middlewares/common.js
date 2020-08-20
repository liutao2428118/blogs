import send from 'koa-send'
import koaSession from 'koa-session'
import koaBody from 'koa-body'
import path from 'path'
import { routerResponse } from '../lib/result'

export const addCommon = app => {
  const reg = RegExp(/public/)
  // 处理静态文件
  app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
      await send(ctx, '/favicon.ico', {
        root: path.join(__dirname, '../static')
      })
    } else if (ctx.path.match(reg)) {
      await send(ctx, ctx.path)
    } else {
      await next()
    }
  })

  // 处理http请求body数据
  app.use(koaBody())

  // 设置session
  app.keys = ['vue ssr tech']
  app.use(koaSession({
    key: 'userKey',
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: false
  }, app))

  // 统一返回前端的格式
  app.use(routerResponse())
}
