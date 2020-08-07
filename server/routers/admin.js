import { Controller, Get, Post, Put, Auth, AuthAll, Required } from '../decorator/router'
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


    @Post('/add-category')
    @Required({
        body: ['name', 'genre']
    })
    async addArticle(ctx, next) {

        const body = ctx.request.body

        const data = await api.admin.addCategory(body)

        if(!data) {
            return ctx.fail('分类已存在')
        }

        return ctx.success('添加成功', data)
    }

    @Post('/get-category-list')
    async getCategoryList(ctx, next) {

        const data =  await api.client.getAllCategorys()

        return ctx.success('获取成功', data)
    }

    @Put('/alter-category')
    @Required({
        body: ['_id','name', 'genre']
    })
    async alterCategory(ctx, next) {
        const body = ctx.request.body

        const data = await api.admin.alterCategory(body)

        if(!data) return ctx.fail('分类不存在')

        return ctx.success('修改成功', data)
    }
}