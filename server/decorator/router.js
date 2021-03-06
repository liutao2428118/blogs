/**
 *  路由装饰器
 */

import { resolve } from 'path'
import glob from 'glob'
import R from 'ramda'
import _ from 'lodash'

const routersMap = new Map()
const symbolPrefix = Symbol('prefix')
const symbolAuth = Symbol('auth')
const isArray = v => _.isArray(v) ? v : [v]
const normalizePath = path => path.startsWith('/') ? path : `/${path}`

export class Route {
  constructor (app, router, apiPath) {
    this.app = app
    this.router = router
    this.apiPath = apiPath
  }

  init () {
    glob.sync(resolve(this.apiPath, './*.js')).forEach(require)

    for (const [conf, controller] of routersMap) {
      const controllers = isArray(controller)

      if (conf.target[symbolAuth]) controllers.unshift(middleware)

      let prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)

      const routerPath = prefixPath + conf.path

      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const router = conf => (target, key, desc) => {
  conf.path = normalizePath(conf.path)

  routersMap.set({
    target: target,
    ...conf
  }, target[key])
}

const convertAll = () => {
  return target => {
    target.prototype[symbolAuth] = true
    return target
  }
}

const decorate = (args, middleware) => {
  const [target, key, descriptor] = args

  target[key] = isArray(target[key])
  target[key].unshift(middleware)

  return descriptor
}

const middleware = async (ctx, next) => {
  console.log('ctx.session.user')
  console.log(ctx.session.user)
  if (!ctx.session.user) {
    return (
      ctx.body = {
        code: 401,
        msg: '登录信息失效，重新登录'
      }
    )
  }

  await next()
}

export const Controller = path => target => { target.prototype[symbolPrefix] = path }

export const AuthAll = convertAll()

export const Get = path => router({
  method: 'get',
  path: path
})

export const Post = path => router({
  method: 'post',
  path: path
})

export const Put = path => router({
  method: 'put',
  path: path
})

export const Del = path => router({
  method: 'del',
  path: path
})

export const convert = middleware => (...args) => decorate(args, middleware)

export const Auth = convert(middleware)

export const Required = rules => convert(async (ctx, next) => {
  let errors = []

  let errorVal = []

  const passRules = R.forEachObjIndexed(
    (value, key) => {
      errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
      errorVal = R.filter(j => ctx.request[key][j] === '')(value)
    }
  )

  passRules(rules)

  if (errors.length) ctx.throw(412, `${errors.join(', ')} 参数缺失`)

  if (errorVal.length) ctx.throw(412, `${errorVal.join(', ')} 参数不能为空`)

  await next()
})
