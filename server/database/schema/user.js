const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5 //最大登录次数
const LOCK_TIME = 2 * 60 * 60 * 1000  //2小时毫秒

const userSchema = new Schema({
    username: { // admin登陆名
        unique: true,
        required: true,
        type: String
    },
    password: { // 登入密码
        type: String
    },
    email: String, // 邮箱
    role: { // 角色
        type: String,
        default: 'user'
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

// 每次保存后都会调用save
userSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }

    next()
})

// 每次保存后都通过bcrypt把明文密码加密
userSchema.pre('save', function (next) {

    // isModified方法判断password是否修改过，修改过则返回true，否则返回false
    if (!this.isModified('password')) return next()

    // 产生一个salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        //  结合salt产生新的hash
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error)

            // 使用hash覆盖明文密码
            this.password = hash
            next()
        })
    })

})

// 添加自定义实例方法
userSchema.methods = {
    // 比对密码
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            // compare函数验证密码
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    },

    // 超出最大登录次数锁定
    incLoginAttepts: (user) => {
        return new Promise((resolve, reject) => {
            // lockUntil如果小于当前时间，解除锁定
            if (user.lockUntil && user.lockUntil < Date.now()) {
                user.update({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            } else {
                
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }

                if (user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !user.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }

                user.update(updates, err => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }
        })
    }
}

mongoose.model('User', userSchema)
