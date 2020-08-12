import mongoose from 'mongoose'
import R from 'ramda'

const ObjectId = mongoose.Types.ObjectId


const Classify = mongoose.model('Classify') // 分类集合
const Article = mongoose.model('Article') // 文章集合
const Reply = mongoose.model('Reply') // 回复集合

// 全部分类
export async function getAllClassifys() {
    const existClassify = await Classify.find({}).exec()

    return existClassify
}

// 首页top文章
export async function getTopEssay() {
    // "like": { $gt: 0 } 
    const essayTop = await Article
        .find({})
        .populate({
            path: 'classify',
            select: '_id name'
        })
        .exec()

    return essayTop
}

// 获取文章包括文章评论
export async function getEssayFindOne(id) {
    const essayOne = await Article
        .findOne({ _id: ObjectId(id) })
        .populate({
            path: 'reply',
            populate: {
                path: 'from to',
                select: 'username'
            }
        })
        .exec()

    let { reply } = essayOne

    let arr = []

    R.map(i => {
        if (i.fatherId === id) {
            R.map(r => {
                if (r.fatherId === ObjectId(i._id).toString()) {
                    i.replyTo.push(r)
                }
            })(reply)
            arr.push(i)
        }
    })(reply)


    essayOne.reply = arr

    return essayOne
}

// 归档数据
export async function getAllEssayList(id) {

    // 聚合管道，分类类型删选，年份分组，年份倒序排序
    const existEssay = await Article.aggregate(
        [
            {
                $match:
                {
                    classify: ObjectId(id)
                }
            },
            {
                $group:
                {
                    _id: { $year: "$createdAt" },//{}内的是分组条件
                    item: {
                        $push:
                        {
                            id: "$_id",
                            title: "$title",
                            classify: "$classify",
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
    const count = await Article.aggregate([
        {
            $match:
            {
                classify: ObjectId(id)
            }
        },
        {
            $count: "count"
        }

    ])

    return {
        count: count.length > 0 ? count[0].count : 0,
        data: existEssay
    }
}

// 添加评论
export async function setComments(body) {
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