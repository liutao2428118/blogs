import { Controller, Get, Post} from '../decorator/router'
import api from '../api'

@Controller('/client')
class ClientController {

    @Post('/login')
    async login(ctx, next) {
        let user = ctx.request.body

        ctx.session.user = {
            username: user.username
        }

        user = await api.user.visitorLogin(user)

        ctx.body = {
            errorCode: 200,
            errorMessage: '登录成功',
            data: user
        }
    }

    @Post('/comments')
    async setComments() {
        let data = ctx.request.body

        const essay =  await api.client.setComments(data)

        ctx.body = {
            errorCode: 200,
            errorMessage: '添加成功',
            data: essay
        }
    }
}