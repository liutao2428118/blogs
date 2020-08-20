import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Classify = mongoose.model('Classify')
const Article = mongoose.model('Article')

/**
 * 获取首页top文章列表
 */
export async function getTopArticle () {
  // "like": { $gt: 0 }
  const essayTop = await Article
    .find({}, { content: 0 })
    .populate({
      path: 'classify',
      select: '_id name'
    })
    .limit(10)
    .exec()

  return essayTop
}

/**
 * 根据文章id，获取单个文章详情
 * return：
 * - doc, 文章详情
 * @param {String} id 文章id
 */
export async function getArticledOne (id) {
  const article = await Article
    .findOne({ _id: ObjectId(id) })
    .exec()

  return article
}

/**
 * 根据分类id，获取按年份归档的文章列表
 * return：
 * - count, 总条数
 * - data, 文章列表
 * @param {String} id
 */
export async function getArticleAll (id) {
  // 聚合管道，分类类型删选，年份分组，年份倒序排序
  const articles = await Article.aggregate(
    [
      {
        $match:
                {
                  classify: ObjectId(id)
                }
      },
      {
        $group:
                {
                  _id: { $year: '$createdAt' }, // {}内的是分组条件
                  item: {
                    $push:
                        {
                          id: '$_id',
                          title: '$title',
                          classify: '$classify',
                          outline: '$outline',
                          content: '$content',
                          meta: '$meta'
                        }
                  }
                }
      },
      {
        $sort:
                {
                  _id: -1 // 排序规则,倒序
                }
      }
    ]
  )

  // 获取分类的总条数
  const count = await Article.aggregate([
    {
      $match:
            {
              classify: ObjectId(id)
            }
    },
    {
      $count: 'count'
    }

  ])

  return {
    count: count.length > 0 ? count[0].count : 0,
    list: articles
  }
}

/**
 * 添加文章
 */
export async function addArticle (body) {
  const classify = await Classify
    .findOne({ _id: ObjectId(body.classify) })
    .exec()

  const article = new Article(body)

  await article.save()

  classify.articleArr.push(article._id)

  await classify.save()

  return article
}

/**
 * 根据文章id，修改文章
 */
export async function updateArticle (body) {
  const doc = await Article
    .findByIdAndUpdate({ _id: ObjectId(body._id) }, body)
    .exec()

  return doc
}

/**
 * 文章设置是否显示在用户端
 */
export async function isShowArticle (id, issued) {
  const doc = await Article
    .findByIdAndUpdate({ _id: ObjectId(id) }, { issued })
    .exec()

  return doc
}

/**
 * 根据搜索关键字，获取文章列表
 */
export async function getArticleList (title, classifyId, skip, pageSize) {
  const reg = new RegExp(title, 'i') // 不区分大小写
  const condition = { // 查询条件
    $or: [
      { title: { $regex: reg } },
      { classify: ObjectId(classifyId) }
    ]
  }

  const total = await Article
    .count(condition)

  const articles = await Article
    .find(condition)
    .populate('classify', 'name')
    .skip(skip)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec()

  return {
    list: articles,
    total
  }
}

/**
 * 根据时间戳获取最新的浏览列表
 */

export async function getBrowseLsit (timeStamp) {
  const preDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  const articles = await Article
    .find({ browseAt: { $gt: preDate } }, { content: 0 })
    .exec()

  return articles
}
