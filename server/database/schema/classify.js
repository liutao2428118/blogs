const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const classifySchema = new Schema({
  name: { // 分类名称
    type: String,
    unique: true
  },
  genre: Number, // 类型 1技术，2生活
  articleArr: [{ // 当前分类下面的文章
    type: ObjectId,
    ref: 'Article'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

classifySchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Classify', classifySchema)
