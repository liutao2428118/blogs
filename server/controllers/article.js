import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
import api from '../api'


/**
 * 客户端文章详情
 * @param {*} id 
 */
export async function clientArticleDetails(id) {

    if (!ObjectId.isValid(id)) return 'id不合法'
    try {
        const article = await api.article.getArticledOne(id)

        const replys = await api.reply.replyIdAndList(id)

        const { _doc } = Object.assign({}, article)

        const newReplys = [...replys]

        let replyArr = []

        for (let i = 0; i < newReplys.length; i++) {
            const newReply = { ...newReplys[i] }

            const replyTo = await api.reply.replyIdAndList(newReply._doc._id)

            newReply._doc.replyTo = replyTo

            replyArr.push(newReply._doc)
        }

        _doc.reply = replyArr

        return _doc


    } catch (error) {
        throw error
    }

}

/**
 * 添加文章
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addArticle(ctx, next) {
    const body = ctx.request.body
    try {
        const data = await api.article.addArticle(body)

        return ctx.success('添加成功', data)
    } catch (error) {
        throw error
    }

}


/**
 * 修改文章
 * @param {*} ctx 
 * @param {*} next 
 */
export async function updateArticle(ctx, next) {
    const body = ctx.request.body
    try {
        const essay = await api.article.updateArticle(body)

        return ctx.success('修改成功', essay)
    } catch (error) {
        throw error
    }


}

/**
 * 前台是否显示文章
 * @param {*} ctx 
 * @param {*} next 
 */
export async function isShowArticle(ctx, next) {
    const issued = ctx.request.body.issued
    const id = ctx.request.body.id

    if (!id) return ctx.throw(412, 'id不能为空')

    if (issued !== 0 && issued !== 1) return ctx.throw(412, 'issued参数不对')

    try {
        const data = await api.article.isShowArticle(id, issued)

        return ctx.success('修改成功', data)
    } catch (error) {
        return ctx.fail('修改失败')
        throw error
    }

}

/**
 * 文章列表
 * @param {*} ctx 
 * @param {*} next 
 */
export async function articleList(ctx, next) {
    const page = parseInt(ctx.query.page) - 1 || 0
    const page_size = parseInt(ctx.query.page_size) || 10
    const title = ctx.query.title
    const classifyId = ctx.query.classifyId || null
    const skip = page * page_size

    try {
        const data = await api.article
            .getArticleList(title, classifyId, skip, page_size)

        return ctx.success('获取成功', data)
    } catch (error) {
        return ctx.fail('获取失败')
        throw error
    }


}

/**
 * 后台编辑文章详情
 * @param {*} ctx 
 * @param {*} next 
 */
export async function articleDetails(ctx, next) {
    const id = ctx.request.body.id

    if (!ObjectId.isValid(id)) return ctx.throw(412, 'id不合法！')

    try {
        const data = await api.article
            .getArticledOne(id)

        return ctx.success('获取成功', data)
    } catch (error) {
        return ctx.fail('获取失败')
        throw error
    }
}