import { Controller, Get, Post, Required } from '../../decorator/router'
import { login, logout, userList } from '../../controllers/user'
import api from '../../api'

@Controller('/user')
class AdminController {

    @Post('/login')
    @Required({
        body: ['username', 'password']
    })
    async login(ctx, next) {
        await login(ctx, next)

    }

    @Get('/logout')
    async logout(ctx, next) {
        await logout(ctx, next)
    }

    @Get('/userList')
    async userList(ctx, next) {
        await userList(ctx, next)
    }
}