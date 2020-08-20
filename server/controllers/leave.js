import api from '../api'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

export async function addLeave (ctx, next) {
  const content = ctx.request.body.content

  const user = ctx.session.user

  const leave = await api.leave.addLeave(content, user._id)

  return ctx.success('添加成功！', leave)
}

export async function getLeaveList (data) {
  const page = parseInt(data.page) - 1 || 0
  const pageSize = parseInt(data.page_size) || 10
  const skip = page * pageSize

  const leaves = await api.leave
    .getLeaveList(skip, pageSize)

  return leaves
}

export async function getLeaveListAdmin (ctx, next) {
  const page = parseInt(ctx.query.page) - 1 || 0
  const pageSize = parseInt(ctx.query.page_size) || 10
  const skip = page * pageSize

  const leaves = await api.leave
    .getLeaveList(skip, pageSize)

  return ctx.success('获取成功！', leaves)
}

export async function deleteLeave (ctx, next) {
  const id = ctx.query.id

  if (!ObjectId.isValid(id)) return ctx.throw(412, 'id不合法！')

  const doc = await api.leave.deleteLeave(id)

  if (!doc) return ctx.fail('删除失败！')

  return ctx.success('删除成功！', doc)
}

export async function getIsReadLeave (ctx, next) {
  const isReadLeaves = await api.leave.getIsReadLeave()

  ctx.success('获取成功', isReadLeaves)
}
