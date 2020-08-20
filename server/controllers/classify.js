import api from '../api'

/**
 * 添加分类
 * @param {*} ctx
 * @param {*} next
 */
export async function addClassify (ctx, next) {
  const name = ctx.request.body.name
  const genre = ctx.request.body.genre

  if (name && name.length > 20) return ctx.fail('分类名称不能超过20个字符')
  if (genre !== 1 && genre !== 2) return ctx.fail('genre参数类型错误')

  const data = await api.classify.addClassify({ name, genre })

  return ctx.success('添加成功', data)
}

export async function updateClassify (ctx, next) {
  const body = ctx.request.body

  const data = await api.classify.updateClassify(body)

  return ctx.success('修改成功', data)
}

export async function classifyList (ctx, next) {
  const data = await api.classify.getClassifyAll()

  return ctx.success('获取成功', data)
}
