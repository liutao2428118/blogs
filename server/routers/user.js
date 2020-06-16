import { Controller, Get, Post } from '../decorator/router'
import { resultLayout } from '../lib/result'
import api from '../api'

@Controller('/admin/user')
class AdminController {

    @Post('/login')
    async login(ctx, next) {

        let user = ctx.request.body

        const matchData = await api.user.adminLogin(user)

        if (!matchData.user) {
            return ctx.body = resultLayout(0, '用户不存在')
        }

        if (matchData.inc && matchData.user.lockUntil > Date.now()) {
            return ctx.body = resultLayout(0, '密码错误已达上限，2小时后在来试吧')
        }

        if (matchData.match) {
            const data = {
                _id: matchData.user._id,
                role: matchData.user.role,
                username: matchData.user.username
            }

            ctx.session.user = data

            return ctx.body = resultLayout(200, '登录成功', data)
        }



        return ctx.body = resultLayout(0, '密码不正确')
    }

    @Post('/logout')
    async logout(ctx, next) {

        try {
            ctx.session.user = null

            return ctx.body = resultLayout(200, '退出成功')
        } catch (error) {
            console.log(error)
        }

    }
}