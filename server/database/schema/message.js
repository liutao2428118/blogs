const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const messageSchema = new Schema({
    type: String, // 消息类型
    userId:{ 
        type: ObjectId
    },
    topicId: {
        type: ObjectId
    },
    replyId: {
        type: ObjectId
    },
    hasRead: { 
        type: Boolean, 
        default: false 
    },
    createdAt: {
        type: Date,
        default: new Date().getTime()
    },
    updatedAt: {
        type: Date,
        default: new Date().getTime()
    }
})

messageSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = new Date().getTime()
    } else {
        this.updatedAt = new Date().getTime()
    }

    next()
})

mongoose.model('Message', messageSchema)