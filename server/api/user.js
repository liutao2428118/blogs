import mongoose from 'mongoose'

const User = mongoose.model('User')

/**
 * 根据分页，搜索关键字获取用户列表
 * @param {*} body
 */

export async function getUserList (username, skip, pageSize) {
  const total = await User
    .count()

  const users = await User
    .find()
    .skip(skip)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec()

  return {
    list: users,
    total
  }
}

/**
 * 访客登录
 * @param {Object} body
 */
export async function visitorLogin (body) {
  let user = await User
    .findOne({ username: body.username, email: body.email })
    .exec()

  if (!user) {
    user = new User(body)
    user.role = 'visitor'
    await user.save()
  }

  return user
}

/**
 * 后台登录
 * @param {*} body
 */
export async function adminLogin (body) {
  let match = false
  //   const inc = false

  const { username, password } = body

  const user = await User
    .findOne({ username, role: 'user' })
    .exec()

  console.log(user)

  if (user) {
    // inc = await user.incLoginAttepts(user)
    match = await user.comparePassword(password, user.password)
  }

  return {
    // inc,
    match,
    user
  }
}
