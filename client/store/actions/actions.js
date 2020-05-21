import apiModel from 'apiModel'

export default {
  fetchCategorys ({ commit }) {
    return apiModel.getAllCategorys().then(data => {
      commit('setCategoryArr', data)
    })
  },
  fetchAllEssay ({ commit }, id) {
    return apiModel.getAllEssay(id).then(data => {
      commit('setEssayArr', data)
    })
  }
}
