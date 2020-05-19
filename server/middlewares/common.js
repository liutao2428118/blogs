import send from 'koa-send'
import path from 'path'


export const addSend = app => {
    app.use(async (ctx, next) => {
        if (ctx.path === '/favicon.ico') {
            await send(ctx, '/favicon.ico', {
                root: path.join(__dirname, '../static/favicon.ico')
            })
        } else {
            await next()
        }
    })
}