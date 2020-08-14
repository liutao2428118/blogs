// 服务端渲染的数据不用经过后端接口路由,直接数据库取
import api from '../../server/api'

export default {
    getClassifyAll() {
        return new Promise(async (resolve, reject) => {
            const data = await api.classify.getClassifyAll()
            resolve(data)
        })
    },
    getArticleYearData(id) {
        return new Promise(async (resolve, reject) => {
            const data = await api.article.getArticleAll(id)
            resolve(data)
        })
    },
    getTopArticle() {
        return new Promise(async (resolve, reject) => {
            const data = await api.article.getTopArticle()
            resolve(data)
        })
    },
    getArticleDetails(id) {
        return new Promise(async (resolve, reject) => {
            const data = await api.article.getArticledOne(id)
            resolve(data)
        })
    }
}
