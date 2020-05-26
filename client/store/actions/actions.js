import apiModel from 'apiModel'

export default {
  fetchCategorys ({ commit }) {
    return apiModel.getAllCategorys().then(data => {
      commit('setCategoryArr', data)
    })
  },
  fetchEssayList ({ commit }, id) {
    return apiModel.getAllEssayList(id).then(data => {
      commit('setEssayArr', data)
    })
  },
  fetchTopEssay({ commit }) {
    return apiModel.getTopEssay().then(data => {
        commit('setEssayTop', data)
    })
  },
  fetchEssayFindOne({ commit }, id) {
    return apiModel.getEssayFindOne(id).then(data => {
        commit('setEssayOne', data)
    })
  }
}
