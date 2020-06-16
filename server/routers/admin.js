import { Controller, Get, Post, Auth, AuthAll } from '../decorator/router'
import { resultLayout } from '../lib/result'
import api from '../api'

@Controller('/admin/main')
@AuthAll
class AdminController {

    @Post('/add-article')
    async addArticle(ctx, next) {
        return ctx.body = resultLayout(200, '添加成功')
    }


    @Post('/add-test')
    async addArticle(ctx, next) {
        return ctx.body = resultLayout(200, 'test')
    }
}