import { Controller, Get, Post } from '../decorator/router'
import { resultLayout } from '../lib/result'
import api from '../api'

@Controller('/admin/main')
class AdminController {

    @Post('/add-article')
    async addArticle(ctx, next) {
       return ctx.body =  resultLayout(200, '添加成功')
    }
}