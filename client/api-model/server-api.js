// 服务端渲染的数据不用经过后端接口路由,直接数据库取
import api from '../../server/api'
import { clientArticleDetails } from '../../server/controllers/article'
import { getLeaveList } from '../../server/controllers/leave'

export default {
  getClassifyAll () {
    return api.classify.getClassifyAll()
  },
  getArticleYearData (id) {
    return api.article.getArticleAll(id)
  },
  getTopArticle () {
    return api.article.getTopArticle()
  },
  getArticleDetails (id) {
    return clientArticleDetails(id)
  },
  getLeaveList (data) {
    return getLeaveList(data)
  }
}
