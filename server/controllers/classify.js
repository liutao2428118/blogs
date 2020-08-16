import api from '../api'

/**
 * 添加分类
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addClassify(ctx, next) {
    const name = ctx.request.body.name
    const genre = ctx.request.body.genre

    if (name && name.length > 8) return ctx.fail('分类名称不能超过5个字符')
    if (genre !== 1 && genre !== 2) return ctx.fail('genre参数类型错误')
    try {
        const data = await api.classify.addClassify({ name, genre })

        return ctx.success('添加成功', data)
    } catch (error) {
        if (error.code === 11000) return ctx.fail('分类已经存在！')
        return ctx.fail('添加失败！')
        throw error
    }

}

export async function updateClassify(ctx, next) {
    const body = ctx.request.body

    try {
        const data = await api.classify.updateClassify(body)

        return ctx.success('修改成功', data)
    } catch (error) {
        return ctx.fail('修改失败')
        throw error
    }


}


export async function classifyList(ctx, next) {
    const data = await api.classify.getClassifyAll()

    return ctx.success('获取成功', data)
}

