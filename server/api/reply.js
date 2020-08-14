import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Reply = mongoose.model('Reply')
const Article = mongoose.model('Article')



/**
 * 获取评论回复列表
 * @param {Object} body 客户端传来的全部数据
 */
export async function getReplyList(body) {
    const page = body.page - 1 || 0

    const page_size = body.page_size || 10
    try {
        const total = await Reply
            .count()

        const doc = await Reply
            .find()
            .populate('articleId', 'title')
            .populate({
                path: 'from to',
                select: 'username'
            })
            .skip(page * page_size)
            .limit(page_size)
            .sort({ '_id': -1 })
            .exec()

        return {
            list: doc,
            total
        }
    } catch (error) {
        throw error
    }
}


/**
 * 添加评论回复
 * @param {*} body 
 */
export async function addReply(body) {
    try {
        const articleDoc = await Article
            .findOne({ _id: ObjectId(body.articleId) })
            .exec()

        const replyDoc = new Reply(body)

        await replyDoc.save()

        let { reply } = articleDoc

        reply.push(replyDoc._id)

        await articleDoc.save()

        return replyDoc
    } catch (error) {
        console.log(error)
    }
}


/**
 * 删除评论回复
 * @param {*} body 
 */
export async function deleteReply(body) {
    try {
        const doc = await Reply
            .remove({ _id: ObjectId(body.id) })
            .exec()

        return doc

    } catch (error) {
        throw error
    }
}


/**
 * 获取未读评论回复列表
 */
export async function getNewReply() {
    try {
        const doc = await Reply
            .find({ isRead: false })
            .populate('articleId', 'title')
            .populate({
                path: 'from to',
                select: 'username'
            })
            .sort({ '_id': -1 })
            .exec()

        return doc

    } catch (error) {
        throw error
    }
}

/**
 * 将评论回复成已读
 * @param {*} body 
 */
export async function updateReplyToRead(body) {
    console.log(body)
    try {
        const doc = await Reply
            .update({ _id: { $in: body.replyIds } }, { $set: { isRead: true } }, { multi: true })
            .exec()

        return doc
    } catch (error) {

    }
}