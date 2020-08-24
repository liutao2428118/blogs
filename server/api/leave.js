import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const LeaveNote = mongoose.model('LeaveNote')

export async function addLeave (content, authorId) {
  const leave = new LeaveNote()

  leave.content = content
  leave.authorId = authorId

  await leave.save()

  return leave
}

export async function getLeaveList (skip, pageSize) {
  const total = await LeaveNote
    .count()

  const leaves = await LeaveNote
    .find()
    .populate({
      path: 'authorId',
      select: 'username'
    })
    .skip(skip)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec()

  return {
    list: leaves,
    total
  }
}

export async function deleteLeave (id) {
  const doc = await LeaveNote
    .remove({ _id: ObjectId(id) })
    .exec()

  return doc
}

export async function getIsReadLeave () {
  const doc = await LeaveNote
    .find({ isRead: false })
    .populate({
      path: 'authorId',
      select: 'username'
    })
    .sort({ _id: -1 })
    .exec()

  return doc
}

export async function updateLeaveRead (leaveIds) {
  const doc = await LeaveNote
    .update({ _id: { $in: leaveIds } }, { $set: { isRead: true } }, { multi: true })
    .exec()

  return doc
}
