import mongoose from 'mongoose'
import R from 'ramda'

const Category = mongoose.model('Category')
const Essay = mongoose.model('Essay')

export async function addCategory(body) {
    const doc = await Category
        .findOne({ name: body.name })
        .exec()

    if (doc) return false

    const category = new Category(body)

    await category.save()

    return category
}

export async function alterCategory(body) {
    const doc = await Category
        .findOne({ _id: mongoose.Types.ObjectId(body._id) })
        .exec()

    if (!doc) return false

    doc.name = body.name
    doc.genre = body.genre

    await doc.save()

    return doc
}


export async function addArticle(body) {

    try {
        const doc = await Category
            .findOne({ _id: mongoose.Types.ObjectId(body.category) })
            .exec()

        const essay = new Essay(body)

        await essay.save()

        doc.essays_arr.push(essay._id)

        await doc.save()

        return essay
    } catch (error) {
        throw error
    }
}


export async function amendArticle(body) {
    try {

        const doc = await Essay
            .findByIdAndUpdate({ _id: mongoose.Types.ObjectId(body._id) }, body)
            .exec()

        if (!doc) return false

        return doc

    } catch (error) {
        throw error
    }
}

export async function isShowArticle(body) {
    try {

        const doc = await Essay
            .findByIdAndUpdate({ _id: mongoose.Types.ObjectId(body.id) }, { issued: body.issued })
            .exec()

        if (!doc) return false

        return doc

    } catch (error) {
        throw error
    }
}

export async function articleList(body) {

    const page = body.page || 0

    const page_size = body.page_size || 10

    try {
        const total = await Essay
            .count()

        const docs = await Essay
            .find()
            .populate('category', 'name')
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

export async function articleOne(body) {

    try {
        const doc = await Essay
            .findOne({ _id: mongoose.Types.ObjectId(body.id) })
            .exec()

        return doc
    } catch (error) {
        throw error
    }
}