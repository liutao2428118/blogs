import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Classify = mongoose.model('Classify')

/**
 * 获取全部分类
 */
export async function getClassifyAll () {
  const classifys = await Classify
    .find({})
    .exec()

  return classifys
}

/**
 * 添加分类
 * @param {String} body 客户端返回的数据
 */
export async function addClassify (body) {
  const classify = new Classify(body)

  await classify.save()

  return classify
}

/**
 * 修改分类
 * @param {*} body
 */
export async function updateClassify (body) {
  const doc = await Classify
    .findByIdAndUpdate({ _id: ObjectId(body._id) }, body)
    .exec()

  return doc
}
