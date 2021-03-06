import api from '../api'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
/**
 * 评论列表
 * @param {*} ctx
 * @param {*} next
 */
export async function replyList (ctx, next) {
  const page = parseInt(ctx.query.page) - 1 || 0
  const pageSize = parseInt(ctx.query.page_size) || 10
  const title = ctx.query.title
  const username = ctx.query.username || null
  const skip = page * pageSize

  const data = await api.reply
    .getReplyList(title, username, skip, pageSize)

  return ctx.success('获取成功', data)
}

/**
 * 添加评论回复
 * @param {*} ctx
 * @param {*} next
 */
export async function addReply (ctx, next) {
  const { content, articleId, from, to, replyId } = ctx.request.body

  const data = {
    articleId,
    from,
    to,
    replyId
  }

  for (const key in data) {
    if (!ObjectId.isValid(data[key])) return ctx.throw(412, `${key}不合法！`)
  }

  data.content = content

  const reply = await api.reply.addReply(data)

  if (!reply) {
    return ctx.fail('添加失败')
  }

  return ctx.success('添加成功', reply)
}

/**
 * 删除评论回复
 * @param {*} ctx
 * @param {*} next
 */
export async function deleteReply (ctx, next) {
  const body = ctx.request.body

  const data = await api.reply.deleteReply(body)

  if (!data) return ctx.fail('删除失败')

  return ctx.success('删除成功', data)
}

/**
 * 未读回复
 * @param {*} ctx
 * @param {*} next
 */
export async function replyMessage (ctx, next) {
  const data = await api.reply.getNewReply()

  if (!data) return ctx.fail('获取失败')

  return ctx.success('获取成功', data)
}

/**
 * 设置为已读
 * @param {*} ctx
 * @param {*} next
 */
export async function setReplyRead (ctx, next) {
  const replyIds = ctx.request.body.replyIds

  if (replyIds && replyIds.length <= 0) return ctx.throw(412, 'replyIds为空！')

  for (let i = 0; i > replyIds.length; i++) {
    if (!ObjectId.isValid(replyIds[i])) return ctx.throw(412, 'replyId不合法！')
  }

  const data = await api.reply.updateReplyToRead(replyIds)

  return ctx.success('操作成功', data)
}
