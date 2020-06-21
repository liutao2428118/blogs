import { Controller, Get, Post, Auth, AuthAll, Required } from '../decorator/router'
import api from '../api'

@Controller('/admin/main')
@AuthAll
class AdminController {

    @Post('/add-article')
    @Required({
        body: ['title', 'category', 'outline', 'content', 'issued']
    })
    async addArticle(ctx, next) {
        let body = ctx.request.body

        console.log(body)
        return ctx.success('添加成功')
    }


    @Post('/add-test')
    async addArticle(ctx, next) {
        return ctx.success('添加成功')
    }
}