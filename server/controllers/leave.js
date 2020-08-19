import api from '../api'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

export async function addLeave(ctx, next) {
    const content = ctx.request.body.content

    const user = ctx.session.user

    try {
        const leave = await api.leave.addLeave(content, user._id)

        return ctx.success('添加成功！', leave)
    } catch (error) {
        throw error
    }
}

export async function getLeaveList(data) {

    const page = parseInt(data.page) - 1 || 0
    const page_size = parseInt(data.page_size) || 10
    const skip = page * page_size

    try {
        const leaves = await api.leave
            .getLeaveList(skip, page_size)

        return leaves
    } catch (error) {
        throw error
    }

}

export async function getLeaveListAdmin(ctx, next) {
    const page = parseInt(ctx.query.page) - 1 || 0
    const page_size = parseInt(ctx.query.page_size) || 10
    const skip = page * page_size

    try {
        const leaves = await api.leave
            .getLeaveList(skip, page_size)

        return ctx.success('获取成功！', leaves)
    } catch (error) {
        throw error
    }
}

export async function deleteLeave(ctx, next) {
    const id = ctx.query.id

    if(!ObjectId.isValid(id)) return ctx.throw(412, 'id不合法！')

    try {
       const doc = await api.leave.deleteLeave(id) 

       if(!doc) return ctx.fail('删除失败！')

       return ctx.success('删除成功！', doc)
    } catch (error) {
        
    }
}