import Cookies from 'js-cookie'
import apiModel from 'apiModel'

export default {
  /**
     * 获取全部分类
     * @param {*} param0
     */
  fetchClassify ({ commit }) {
    return apiModel.getClassifyAll().then(data => {
      commit('setClassify', data)
    })
  },
  /**
     * 获取归档列表
     * @param {*} param0
     * @param {*} id
     */
  fetchArticleYearData ({ commit }, id) {
    return apiModel.getArticleYearData(id).then(data => {
      commit('setArticleYearData', data)
    })
  },
  /**
     * 获取首页top文章
     * @param {*} param0
     */
  fetchTopArticle ({ commit }) {
    return apiModel.getTopArticle().then(data => {
      commit('setArticTop', data)
    })
  },
  /**
     * 获取文章详情
     * @param {*} param0
     * @param {*} id
     */
  fetchArticleDetails ({ commit }, id) {
    return apiModel.getArticleDetails(id).then(data => {
      commit('setArticleOne', data)
    })
  },

  /**
     * 获取留言列表
     * @param {*} param0
     * @param {*} data
     */
  fetchLeaveList ({ commit }, data) {
    return apiModel.getLeaveList(data).then(list => {
      commit('setLeaveData', list)
    })
  },
  /**
     * 登录
     * @param {*} param0
     * @param {*} user
     */
  login ({ commit }, user) {
    return apiModel.login(user).then(data => {
      commit('doLogin', data)
      Cookies.set('user', JSON.stringify(data))
    })
  },
  /**
     * 提交新增评论回复
     * @param {*} param0
     * @param {*} data
     */
  submitReply ({ commit }, data) {
    return apiModel.submitReply(data).then(data => {
      // commit('doLogin', data)
    })
  },

  /**
     * 添加留言
     * @param {*} param0
     * @param {*} data
     */
  addLeave ({ commit }, data) {
    return apiModel.addLeave(data)
  }

}
