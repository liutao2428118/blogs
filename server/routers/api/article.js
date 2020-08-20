import { Controller, Get, Post, Put, AuthAll, Required } from '../../decorator/router'
import { addArticle, updateArticle, isShowArticle, articleList, articleDetails, getBrowseList } from '../../controllers/article'

@Controller('/article')
@AuthAll
class ArticleController {
    // 添加文章
    @Post('/add-article')
    @Required({
      body: ['title', 'classify', 'outline', 'content', 'issued']
    })
  async addArticle (ctx, next) {
    await addArticle(ctx, next)
  }

    // 修改文章
    @Put('/amend-article')
    @Required({
      body: ['title', 'classify', 'outline', 'content', 'issued']
    })
    async updateArticle (ctx, next) {
      await updateArticle(ctx, next)
    }

    // 是否显示文章
    @Put('/is-show-article')
    @Required({
      body: ['id', 'issued']
    })
    async isShowArticle (ctx, next) {
      await isShowArticle(ctx, next)
    }

    // 文章列表
    @Get('/article-list')
    async articleList (ctx, next) {
      await articleList(ctx, next)
    }

    // 文章详情
    @Post('/article-one')
    async articleDetails (ctx, next) {
      await articleDetails(ctx, next)
    }

    @Get('/get-browse-list')
    async getBrowseList (ctx, next) {
      await getBrowseList(ctx, next)
    }
}

export default ArticleController
