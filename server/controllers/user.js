import api from '../api'

/**
 * 用户列表
 * @param {*} ctx
 * @param {*} nex
 */
export async function userList (ctx, nex) {
  const page = parseInt(ctx.query.page) - 1 || 0
  const pageSize = parseInt(ctx.query.page_size) || 10
  const username = ctx.query.username || null
  const skip = page * pageSize

  const data = await api.user.getUserList(username, skip, pageSize)

  ctx.success('获取成功！', data)
}

/**
 * 登录
 * @param {*} ctx
 * @param {*} next
 */
export async function login (ctx, next) {
  const user = ctx.request.body

  const matchData = await api.user.adminLogin(user)

  if (!matchData.user) {
    return ctx.fail('用户不存在')
  }

  // if (matchData.inc && matchData.user.lockUntil > Date.now()) {
  //     return ctx.body = ctx.fail('密码错误已达上限，2小时后在来试吧')
  // }

  if (matchData.match) {
    const data = {
      _id: matchData.user._id,
      role: matchData.user.role,
      username: matchData.user.username
    }

    ctx.session.user = data // 保存到 session

    return ctx.success('登录成功', data)
  }
  return ctx.fail('密码错误')
}

/**
 * 登出
 * @param {*} ctx
 * @param {*} next
 */
export async function logout (ctx, next) {
  ctx.session.user = null

  return ctx.success('退出成功')
}
