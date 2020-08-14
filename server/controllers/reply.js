import api from '../api'

export async function replyList(ctx, next) {
    const body = ctx.request.body

    const data = await api.reply.getReplyList(body)

    return ctx.success('获取成功', data)

}

export async function addReply(ctx, next) {
    let data = ctx.request.body
    console.log(data)

    const reply = await api.reply.addReply(data)

    if (!reply) {
        ctx.fail('添加失败')
    }

    ctx.success('添加成功', reply)
}

export async function deleteReply(ctx, next) {
    const body = ctx.request.body

    const data = await api.admin.deleteReply(body)

    if (!data) return ctx.fail('删除失败')

    return ctx.success('删除成功', data)
}

export async function replyMessage(ctx, next) {
    const data = await api.admin.getNewReply()

    if (!data) return ctx.fail('获取失败')

    return ctx.success('获取成功', data)
}


export async function setReplyRead(ctx, next) {
    const body = ctx.request.body

    const data = await api.admin.setReplyRead(body)

    // if(!data) return ctx.fail('操作失败')

    return ctx.success('操作成功', data)
}