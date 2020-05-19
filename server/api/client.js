import mongoose from 'mongoose'

const Category = mongoose.model('Category')

export async function getAllCategorys() {
    const existCategory = await Category.find({}).exec()

    return existCategory
}