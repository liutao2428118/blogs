import { resolve } from 'path'
import Koa from 'koa'
import R from 'ramda'

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000


const MIDDLEWARES = ['router']

class Server {
    constructor() {
        this.app = new Koa()
        this.useMiddlewares(this.app)(MIDDLEWARES)
    }

   useMiddlewares(app) {
        return R.map(
          R.compose(
            R.map(i => i(app)),
            require,
            i => `${r('./middlewares')}/${i}`
          )
        )
      }

    async start() {
        this.app.listen(port, host)
        console.log('Server listening on ' + host + ':' + port) 
    }
}

const app = new Server()

app.start()