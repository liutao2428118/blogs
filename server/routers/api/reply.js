import { Controller, Get, Post, AuthAll, Required } from '../../decorator/router'
import { replyList, addReply, deleteReply, replyMessage, setReplyRead } from '../../controllers/reply'

@Controller('/reply')
@AuthAll
class ReplyController {
    @Get('/reply-list')
  async replyList (ctx, next) {
    await replyList(ctx, next)
  }

    @Post('/add-reply')
    async addReply (ctx, next) {
      await addReply(ctx, next)
    }

    @Post('/delete-reply')
    async deleteReply (ctx, next) {
      await deleteReply(ctx, next)
    }

    @Get('/reply-message')
    async replyMessage (ctx, next) {
      await replyMessage(ctx, next)
    }

    @Post('/set-reply-read')
    @Required({
      body: ['replyIds']
    })
    async setReplyRead (ctx, next) {
      await setReplyRead(ctx, next)
    }
}

export default ReplyController
