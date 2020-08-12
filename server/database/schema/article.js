const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema({
    title: String, // 标题
    classify: { // 所属分类
        type: ObjectId,
        ref: 'Classify'
    },
    outline: String, // 概要
    content: String, // 文本内容
    issued: Number, // 是否发布 1直接发布，0暂时不发布
    reprint: Number, // 是否转载 1原创 2转载
    reprintUrl: String, // 转载链接
    imageUrl: String,
    reply: [{ // 评论回复
        type: ObjectId,
        ref: 'Reply'
    }],
    pageview: { // 阅读数
        type: Number,
        default: 0
    }, 
    like: { // 点赞数
        type: Number,
        default: 0
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

// 保存前的中间件
articleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Article', articleSchema)
