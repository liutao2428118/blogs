const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const replySchema = new Schema({
    articleId: {type: ObjectId, ref: 'Article' },
    from: { type: ObjectId, ref: 'User' }, // 当前
    to: { type: ObjectId, ref: 'User' }, // 需要回复的
    fatherId: String,
    content: String, // 回复的内容
    replyTo: Array,
    createdAt: {
        type: Date,
        default: new Date().getTime()
    },
    updatedAt: {
        type: Date,
        default: new Date().getTime()
    }
})

// replySchema.virtual('replyTo').get(function () {
//     this.
// })

replySchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = new Date().getTime()
    } else {
        this.updatedAt = new Date().getTime()
    }

    next()
})

mongoose.model('Reply', replySchema)