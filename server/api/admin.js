import mongoose from 'mongoose'
import R from 'ramda'

const Classify = mongoose.model('Classify')
const Article = mongoose.model('Article')
const Reply = mongoose.model('Reply')

// 添加分类
export async function addClassify(body) {
    const doc = await Classify
        .findOne({ name: body.name })
        .exec()

    if (doc) return false

    const classify = new Classify(body)

    await classify.save()

    return classify
}

// 修改分类
export async function alterClassify(body) {
    const doc = await Classify
        .findByIdAndUpdate({ _id: mongoose.Types.ObjectId(body._id)}, body)
        .exec()

    if (!doc) return false

    return doc
}

// 添加文章
export async function addArticle(body) {

    try {
        const doc = await Classify
            .findOne({ _id: mongoose.Types.ObjectId(body.classify) })
            .exec()

            console.log(doc)
        const article = new Article(body)

        await article.save()

        doc.articleArr.push(article._id)

        await doc.save()

        return article
    } catch (error) {
        throw error
    }
}

// 修改文章
export async function amendArticle(body) {
    try {

        const doc = await Article
            .findByIdAndUpdate({ _id: mongoose.Types.ObjectId(body._id) }, body)
            .exec()

        if (!doc) return false

        return doc

    } catch (error) {
        throw error
    }
}

// 文章是否显示
export async function isShowArticle(body) {
    try {

        const doc = await Article
            .findByIdAndUpdate({ _id: mongoose.Types.ObjectId(body.id) }, { issued: body.issued })
            .exec()

        if (!doc) return false

        return doc

    } catch (error) {
        throw error
    }
}

// 文章列表
export async function articleList(body) {

    const page = body.page - 1 || 0

    const page_size = body.page_size || 10

    try {
        const total = await Article
            .count()

        const docs = await Article
            .find()
            .populate('classify', 'name')
            .skip(page * page_size)
            .limit(page_size)
            .sort({ '_id': -1 })
            .exec()

        return {
            list: docs,
            total
        }

    } catch (error) {
        throw error
    }
}

// 文章详情
export async function articleOne(body) {

    try {
        const doc = await Article
            .findOne({ _id: mongoose.Types.ObjectId(body.id) })
            .exec()

        return doc
    } catch (error) {
        throw error
    }
}

export async function replyList(body) {
    const page = body.page - 1 || 0

    const page_size = body.page_size || 10
    try {
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

            return doc
    } catch (error) {
        
    }
}