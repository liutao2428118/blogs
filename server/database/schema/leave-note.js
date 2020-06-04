const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const leaveNoteSchema = new Schema({
  content: String, // 留言的类容
  from: { // 当前用户
    type: ObjectId,
    ref: 'Uesr'
  },
  to: { // 需要回复的用户
    type: ObjectId,
    ref: 'Uesr'
  },
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
leaveNoteSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('LeaveNote', leaveNoteSchema)
