import { resolve } from 'path'
import Koa from 'koa'
import R from 'ramda'

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000


const MIDDLEWARES = ['database', 'common', 'router']

class Server {
    constructor() {
        this.app = new Koa()
        this.init(this.app)
        this.useMiddlewares(this.app)(MIDDLEWARES)
    }

    init(app) {
        app.use(async (ctx, next) => {
            try {
                console.log(`request with path ${ctx.path}`)
                await next()
            } catch (err) {
                console.log(err)
                ctx.status = 500
                if (isDev) {
                    ctx.body = err.message
                } else {
                    ctx.bosy = 'please try again later'
                }
            }
        })
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