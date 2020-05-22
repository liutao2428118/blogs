import mongoose from 'mongoose'

const Category = mongoose.model('Category')
const Essay = mongoose.model('Essay')

export async function getAllCategorys() {
    const existCategory = await Category.find({}).exec()

    return existCategory
}

export async function getAllEssay(id) {

    const existEssay = await Essay.aggregate(
        [
            {
                $match:
                {
                    category: mongoose.Types.ObjectId(id)
                }
            },
            {
                $group:
                {
                    _id: { year: { $year: "$meta.createdAt" } },//{}内的是分组条件
                    item: {
                        $push:
                        {
                            id: "$_id",
                            title: "$title",
                            category: "$category",
                            outline: "$outline",
                            content: "$content"
                        }
                    }
                },
            }
        ]
    )



    console.log(JSON.stringify(existEssay))

    return existEssay
}