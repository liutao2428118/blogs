import send from 'koa-send'
import path from 'path'


export const addSend = app => {
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
}