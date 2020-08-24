import { Controller, Post } from '../../decorator/router'
import api from '../../api'

@Controller('/client')
class ClientController {
    @Post('/login')
  async login (ctx, next) {
    const body = ctx.request.body

    const user = await api.user.visitorLogin(body)

    if (!user) return ctx.fail('登录/注册失败')

    ctx.session.user = {
      _id: user._id,
      role: user.role,
      username: user.username
    }

    return ctx.success('登录成功', user)
  }
}

export default ClientController
