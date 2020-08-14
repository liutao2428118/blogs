import { Controller, Get, Post } from '../../decorator/router'
import api from '../../api'

@Controller('/client')
class ClientController {

    @Post('/login')
    async login(ctx, next) {
        let body = ctx.request.body

        ctx.session.user = {
            username: body.username
        }

        const user = await api.user.visitorLogin(body)

        return ctx.success('登录成功', user)
    }

   
}