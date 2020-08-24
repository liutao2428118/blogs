import Router from 'koa-router'
import { Route } from '../decorator/router'
import path from 'path'

const router = new Router()

export const ssrRouter = app => {
  const apiPath = path.resolve(__dirname, '../routers/ssr')
  new Route(app, router, apiPath).init()
}
