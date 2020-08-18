const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const leaveNoteSchema = new Schema({
  content: String, // 留言的类容
  authorId: {
      type: ObjectId, 
      ref: 'User'
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
leaveNoteSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }

  next()
})

mongoose.model('LeaveNote', leaveNoteSchema)
