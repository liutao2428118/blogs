import Router from 'koa-router'
import { Route } from '../decorator/router'
import path from 'path'

const router = new Router({
    prefix: '/api'
})

export const apiRouter = app => {
    const apiPath = path.resolve(__dirname, '../routers/api')
    new Route(app, router, apiPath).init()
}
