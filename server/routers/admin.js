import { Controller, Get, Post, Put, Auth, AuthAll, Required } from '../decorator/router'
import api from '../api'

@Controller('/admin/main')
@AuthAll
class AdminController {

    // 添加文章
    @Post('/add-article')
    @Required({
        body: ['title', 'classify', 'outline', 'content', 'issued']
    })
    async addArticle(ctx, next) {
        let body = ctx.request.body

        const essay = await api.admin.addArticle(body)

        if (!essay) return ctx.fail('添加失败')

        return ctx.success('添加成功', essay)
    }

    // 修改文章
    @Put('/amend-article')
    @Required({
        body: ['title', 'classify', 'outline', 'content', 'issued']
    })
    async amendArticle(ctx, next) {
        let body = ctx.request.body

        const essay = await api.admin.amendArticle(body)

        if (!essay) return ctx.fail('修改失败')

        return ctx.success('修改成功', essay)
    }

    // 是否显示文章
    @Put('/is-show-article')
    @Required({
        body: ['id', 'issued']
    })
    async isShowArticle(ctx, next) {
        let body = ctx.request.body

        const essay = await api.admin.isShowArticle(body)

        if (!essay) return ctx.fail('is修改失败')

        return ctx.success('is修改成功', essay)
    }

    // 文章列表
    @Post('/article-list')
    async articleList(ctx, next) {
        let body = ctx.request.body

        const data = await api.admin.articleList(body)

        if (!data.list) return ctx.fail('获取失败')

        return ctx.success('获取成功', data)
    }

    // 文章详情
    @Post('/article-one')
    async articleOne(ctx, next) {
        let body = ctx.request.body

        const data = await api.admin.articleOne(body)

        if (!data) return ctx.fail('获取失败')

        return ctx.success('获取成功', data)
    }


    // 添加分类
    @Post('/add-category')
    @Required({
        body: ['name', 'genre']
    })
    async addCategory(ctx, next) {

        const body = ctx.request.body

        const data = await api.admin.addClassify(body)

        if (!data) {
            return ctx.fail('分类已存在')
        }

        return ctx.success('添加成功', data)
    }

    // 分类列表
    @Post('/get-category-list')
    async getCategoryList(ctx, next) {

        const data = await api.client.getAllClassifys()

        return ctx.success('获取成功', data)
    }

    // 修改分类
    @Put('/alter-category')
    @Required({
        body: ['_id', 'name', 'genre']
    })
    async alterCategory(ctx, next) {
        const body = ctx.request.body

        const data = await api.admin.alterClassify(body)

        if (!data) return ctx.fail('分类不存在')

        return ctx.success('修改成功', data)
    }

    @Post('/replyList')
    async getReplyList(ctx, next) {
        const body = ctx.request.body

        const data = await api.admin.replyList(body)

        return ctx.success('获取成功', data)

    }
}