const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const essaySchema = new Schema({
    title: String, // 标题
    category: { // 所属分类
        type: ObjectId,
        ref: 'Category'
    },
    outline: String, // 概要
    content: String, // 文本内容
    issued: Number, // 是否发布 1直接发布，0暂时不发布
    reprint: Number, // 是否转载 1原创 2转载
    reprint_url: String, // 转载链接
    reply: [{ // 评论回复
        from: { type: ObjectId, ref: 'User' }, // 当前
        to: { type: ObjectId, ref: 'User' }, // 需要回复的
        superiorId: String,
        content: String, // 回复的内容
        time: {
            type: Date,
            default: new Date().getTime()
        },
        replyTo: Array
    }],
    pageview: Number, // 阅读数
    like: Number, // 点赞数

    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// 保存前的中间件
essaySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Essay', essaySchema)
