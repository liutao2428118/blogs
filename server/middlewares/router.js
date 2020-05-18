
import  { Route } from '../decorator/router'
import path from 'path'

export const router = app => {
  const apiPath = path.resolve(__dirname, '../routers')
  const router = new Route(app, apiPath)

  router.init()
}
