import mongoose from 'mongoose'


const Category = mongoose.model('Category') // 分类集合
const Essay = mongoose.model('Essay') // 文章集合

// 全部分类
export async function getAllCategorys() {
    const existCategory = await Category.find({}).exec()

    return existCategory
}

// 首页top文章
export async function getTopEssay() {
    const essayTop = await Essay
        .find({"like": { $gt: 400} })
        .populate({
            path: 'category',
            select: '_id name'
        })
        .exec()

    return essayTop
}

// 获取文章
export async function getEssayFindOne(id) {
    const essayOne = await Essay
        .findOne({_id: mongoose.Types.ObjectId(id)})
        .populate({
            path: 'reply.from reply.to',
            select: '_id username'
        })
        .exec()

    return essayOne
}

// 归档数据
export async function getAllEssayList(id) {

    // 聚合管道，分类类型删选，年份分组，年份倒序排序
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
                    _id: { $year: "$meta.createdAt" },//{}内的是分组条件
                    item: {
                        $push:
                        {
                            id: "$_id",
                            title: "$title",
                            category: "$category",
                            outline: "$outline",
                            content: "$content",
                            meta: "$meta"
                        }
                    }
                },
            },
            {
                $sort:
                {
                    "_id": -1 //排序规则,倒序
                }
            }
        ]
    )

    // 获取分类的总条数
    const count = await  Essay.aggregate([
        {
            $match:
            {
                category: mongoose.Types.ObjectId(id)
            }
        },
        {
            $count:"count"
        }

    ])
    
    return {
        count: count.length > 0 ? count[0].count : 0,
        data: existEssay
    }
}

// 添加评论
export async function setComments(data) {
    try {
        const essay = await Essay
            .findOne({_id: mongoose.Types.ObjectId(data.essayId)})
            .exec()

            console.log(essay)
            
        if(!essay) {
            return false
        }

        let { reply } = essay

       

        reply.push(data)

        await essay.save()

        console.log("-----------------------",essay)
    
        return essay
    } catch (error) {
        console.log(error)
    }
  

}