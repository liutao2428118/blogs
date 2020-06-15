import { Controller, Get, Post} from '../decorator/router'
import { resultLayout } from '../lib/result'
import api from '../api'

@Controller('/api/admin')
class AdminController {

    @Post('/login')
    async login(ctx, next) {
        
        console.log(ctx.request.body)
        let user = ctx.request.body

        const matchData = await api.user.adminLogin(user)

        if(!matchData.user) {
            return ctx.body = resultLayout(0, '用户不存在')
        }

        if(matchData.match) {
            ctx.session.user = {
                _id: matchData.user._id,
                role: matchData.user.role,
                username: matchData.user.username
            }

            return ctx.body = resultLayout(200, '登录成功')
        }

        return ctx.body = resultLayout(0, '密码不正确')
    }
}