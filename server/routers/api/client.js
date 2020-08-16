import { Controller, Get, Post } from '../../decorator/router'
import api from '../../api'

@Controller('/client')
class ClientController {

    @Post('/login')
    async login(ctx, next) {
        let body = ctx.request.body

        const user = await api.user.visitorLogin(body)

        if (!user) return ctx.fail('登录失败')

        ctx.session.user = {
            username: body.username
        }


        return ctx.success('登录成功', user)
    }


}