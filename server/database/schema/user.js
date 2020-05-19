const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const uesrSchema = new Schema({
  username: { // admin登陆名
    unique: true,
    required: true,
    type: String
  },
  password: { // 登入密码
    unique: true,
    type: String
  },
  role: { // 角色
    type: String,
    default: 'user'
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
uesrSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Uesr', uesrSchema)
