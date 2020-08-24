import { Controller, Post, AuthAll } from '../../decorator/router'
import { getUploadToken } from '../../controllers/qiniu'

@Controller('/qiniu')
@AuthAll
class AdminController {
    @Post('/upload-token')
  async getUploadToken (ctx, next) {
    const uploadToken = getUploadToken()

    return ctx.success('获取成功', { uploadToken })
  }
}

export default AdminController
