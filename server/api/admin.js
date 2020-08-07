import mongoose from 'mongoose'
import R from 'ramda'

const Category = mongoose.model('Category')

export async function addCategory(body) {
    const doc = await Category
        .findOne({ name: body.name })
        .exec()

        if(doc) return false

        const category = new Category(body)

        await category.save()

        return category
}

export async function alterCategory(body) {
    const doc = await Category
        .findOne({  _id: mongoose.Types.ObjectId(body._id) })
        .exec()

        if(!doc) return false

        doc.name = body.name
        doc.genre = body.genre

        await doc.save()

        return doc
}
