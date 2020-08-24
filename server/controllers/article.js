import mongoose from 'mongoose'
import api from '../api'
const ObjectId = mongoose.Types.ObjectId

/**
 * 客户端文章详情
 * @param {*} id
 */
export async function clientArticleDetails (id) {
  if (!ObjectId.isValid(id)) return 'id不合法'

  const article = await api.article.getArticledOne(id)

  article.pageview += 1

  article.browseAt = Date.now()

  await article.save()

  const replys = await api.reply.replyIdAndList(id)

  const { _doc } = Object.assign({}, article)

  const newReplys = [...replys]

  const replyArr = []

  for (let i = 0; i < newReplys.length; i++) {
    const newReply = { ...newReplys[i] }

    const replyTo = await api.reply.replyIdAndList(newReply._doc._id)

    newReply._doc.replyTo = replyTo

    replyArr.push(newReply._doc)
  }

  _doc.reply = replyArr

  return _doc
}

/**
 * 添加文章
 * @param {*} ctx
 * @param {*} next
 */
export async function addArticle (ctx, next) {
  const body = ctx.request.body

  const data = await api.article.addArticle(body)

  if (!data) return ctx.fail('添加失败！')

  return ctx.success('添加成功', data)
}

/**
 * 修改文章
 * @param {*} ctx
 * @param {*} next
 */
export async function updateArticle (ctx, next) {
  const body = ctx.request.body
  const article = await api.article.updateArticle(body)

  if (!article) return ctx.fail('修改失败！')

  return ctx.success('修改成功！', article)
}

/**
 * 前台是否显示文章
 * @param {*} ctx
 * @param {*} next
 */
export async function isShowArticle (ctx, next) {
  const issued = ctx.request.body.issued
  const id = ctx.request.body.id

  if (!id) return ctx.throw(412, 'id不能为空')

  if (issued !== 0 && issued !== 1) return ctx.throw(412, 'issued参数不对')

  const data = await api.article.isShowArticle(id, issued)

  return ctx.success('修改成功', data)
}

/**
 * 文章列表
 * @param {*} ctx
 * @param {*} next
 */
export async function articleList (ctx, next) {
  const page = parseInt(ctx.query.page) - 1 || 0
  const pageSize = parseInt(ctx.query.page_size) || 10
  const title = ctx.query.title
  const classifyId = ctx.query.classifyId || null
  const skip = page * pageSize

  const data = await api.article
    .getArticleList(title, classifyId, skip, pageSize)

  return ctx.success('获取成功', data)
}

/**
 * 后台文章详情
 * @param {*} ctx
 * @param {*} next
 */
export async function articleDetails (ctx, next) {
  const id = ctx.request.body.id

  if (!ObjectId.isValid(id)) return ctx.throw(412, 'id不合法！')

  const data = await api.article
    .getArticledOne(id)

  return ctx.success('获取成功', data)
}

/**
 * 获取最新浏览列表
 */
export async function getBrowseList (ctx, next) {
  const data = await api.article.getBrowseLsit()

  return ctx.success('获取成功', data)
}
