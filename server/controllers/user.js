import api from '../api'


/**
 * 用户列表
 * @param {*} ctx 
 * @param {*} nex 
 */
export async function userList(ctx, nex) {
    const page = parseInt(ctx.query.page) - 1 || 0
    const page_size = parseInt(ctx.query.page_size) || 10
    const username = ctx.query.username || null
    const skip = page * page_size

    try {
        const data = await api.user.getUserList(username, skip, page_size)

        ctx.success('获取成功！', data)
    } catch (error) {
        ctx.fail('获取失败！')
        throw error
    }
}

/**
 * 登录
 * @param {*} ctx 
 * @param {*} next 
 */
export async function login(ctx, next) {
    let user = ctx.request.body

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

        ctx.session.user = data  //保存到 session

        return ctx.success('登录成功', data)
    }
    return ctx.fail('密码错误')
}


/**
 * 登出
 * @param {*} ctx 
 * @param {*} next 
 */
export async function logout(ctx, next) {
    try {
        ctx.session.user = null

        return ctx.success('退出成功')
    } catch (error) {
        return ctx.fail('退出失败')
        throw error
    }
}