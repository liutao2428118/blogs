import send from 'koa-send'
import koaSession from 'koa-session'
import koaBody from 'koa-body'
import path from 'path'


export const addCommon = app => {
    const reg = RegExp(/public/)
    app.use(async (ctx, next) => {
        if (ctx.path === '/favicon.ico') {
            await send(ctx, '/favicon.ico', {
                root: path.join(__dirname, '../static')
            })
        } else if (ctx.path.match(reg)) {
            await send(ctx, ctx.path)
        }
        else {
            await next()
        }
    })

    app.use(koaBody())

    app.keys = ['vue ssr tech']
    app.use(koaSession({
        key: 'v-ssr-id',
        maxAge: 2 * 60 * 60 * 1000
    }, app))


}