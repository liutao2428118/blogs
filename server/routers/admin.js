import { Controller, Get, Post, Auth, AuthAll } from '../decorator/router'
import api from '../api'

@Controller('/admin/main')
@AuthAll
class AdminController {

    @Post('/add-article')
    async addArticle(ctx, next) {
        return ctx.success('添加成功')
    }


    @Post('/add-test')
    async addArticle(ctx, next) {
        return ctx.success('添加成功')
    }
}