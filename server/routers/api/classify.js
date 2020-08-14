import { Controller, Get, Post, Put, Auth, AuthAll, Required } from '../../decorator/router'
import { addClassify, classifyList, updateClassify } from '../../controllers/classify'

@Controller('/classify')
@AuthAll
class ClassifyController {

    // 添加分类
    @Post('/add-classify')
    @Required({
        body: ['name', 'genre']
    })
    async addClassify(ctx, next) {
        await addClassify(ctx, next)
    }

    // 分类列表
    @Get('/get-classify-list')
    async classifyList(ctx, next) {
        await classifyList(ctx, next)
    }

    // 修改分类
    @Put('/alter-classify')
    @Required({
        body: ['_id', 'name', 'genre']
    })
    async updateClassify(ctx, next) {
        await updateClassify(ctx, next)
    }

}