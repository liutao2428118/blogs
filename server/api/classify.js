import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Classify = mongoose.model('Classify')


/**
 * 获取全部分类
 */
export async function getClassifyAll() {
    try {
        const classifys = await Classify
            .find({})
            .exec()

        return classifys
    } catch (error) {
        throw error
    }

}


/**
 * 添加分类
 * @param {String} body 客户端返回的数据
 */
export async function addClassify(body) {
    try {
        const classify = new Classify(body)

        await classify.save()

        return classify
    } catch (error) {
        throw error
    }

}


/**
 * 修改分类
 * @param {*} body 
 */
export async function updateClassify(body) {

    try {
        const doc = await Classify
            .findByIdAndUpdate({ _id: ObjectId(body._id) }, body)
            .exec()

        return doc
    } catch (error) {
        throw error
    }

}