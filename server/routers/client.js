import { Controller, Get, Post} from '../decorator/router'
import api from '../api'

@Controller('/client')
class ClientController {

    @Post('/login')
    async login(ctx, next) {
        
        ctx.session.user = {
            username: user.username
        }

        user = await api.user.visitorLogin(user)

       return ctx.success('登录成功', user)
    }

    @Post('/comments')
    async setComments(ctx, next) {
        let data = ctx.request.body

        const essay =  await api.client.setComments(data)

        if(!essay) {
            ctx.fail('添加失败')
        }

        ctx.success('添加成功', essay)
    }
}