import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Reply = mongoose.model('Reply')
const Article = mongoose.model('Article')
const User = mongoose.model('User')

/**
 * 获取评论回复列表
 * @param {Object} body 客户端传来的全部数据
 */
export async function getReplyList (title, username, skip, pageSize) {
  const reg = new RegExp(title, 'i')
  const reg2 = new RegExp(username, 'i')

  const titleOR = { // 查询条件
    $or: [
      { title: { $regex: reg } }
    ]
  }

  const usernameOR = { // 查询条件
    $or: [
      { username: { $regex: reg2 } }
    ]
  }
  const articles = await Article
    .find(titleOR)
    .exec()

  const users = await User
    .find(usernameOR)
    .exec()

  const articleIds = articles.map(item => item._id)

  const userIds = users.map(item => item._id)

  const find = {}
  const $or = []

  if (title) $or.push({ articleId: { $in: articleIds } })

  if (username) $or.push({ from: { $in: userIds } })

  if ($or.length > 0) find.$or = $or

  const total = await Reply
    .count(find)

  const doc = await Reply
    .find(find)
    .populate('articleId', 'title')
    .populate({
      path: 'from to',
      select: 'username'
    })
    .skip(skip)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec()

  return {
    list: doc,
    total
  }
}

/**
 * 添加评论回复
 * @param {*} body
 */
export async function addReply (body) {
  const reply = new Reply(body)

  await reply.save()

  return reply
}

/**
 * 删除评论回复
 * @param {*} body
 */
export async function deleteReply (body) {
  const doc = await Reply
    .remove({ _id: ObjectId(body.id) })
    .exec()

  return doc
}

/**
 * 获取未读评论回复列表
 */
export async function getNewReply () {
  const doc = await Reply
    .find({ isRead: false })
    .populate('articleId', 'title')
    .populate({
      path: 'from to',
      select: 'username'
    })
    .sort({ _id: -1 })
    .exec()

  return doc
}

/**
 * 将评论回复成已读
 * @param {*} body
 */
export async function updateReplyToRead (replyIds) {
  const doc = await Reply
    .update({ _id: { $in: replyIds } }, { $set: { isRead: true } }, { multi: true })
    .exec()

  return doc
}

/**
 * 根据文章replyId获取该文章下的所有评论
 * @param {ObjectId} id 文章ID
 */
export async function replyIdAndList (id) {
  const replys = await Reply
    .find({ replyId: ObjectId(id) })
    .populate({
      path: 'from to',
      select: 'username'
    })
    .exec()

  return replys
}
