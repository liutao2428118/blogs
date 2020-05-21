import mongoose from 'mongoose'

const Category = mongoose.model('Category')
const Essay = mongoose.model('Essay')

export async function getAllCategorys() {
    const existCategory = await Category.find({}).exec()

    return existCategory
}

export async function getAllEssay(id) {
    const existEssay = await Essay.find({category: mongoose.Types.ObjectId(id)}).exec()
    console.log(existEssay)

    return existEssay
}