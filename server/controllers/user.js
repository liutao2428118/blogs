import api from '../api'


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

        ctx.session.user = data

        return ctx.success('登录成功', data)
    }



    return ctx.fail('密码错误')
}

export async function logout(ctx, next) {
    try {
        ctx.session.user = null

        return ctx.success('退出成功')
    } catch (error) {
        console.log(error)
        return ctx.fail('退出失败')
    }
}