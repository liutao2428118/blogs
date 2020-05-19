import apiModel from 'apiModel'

export default {
  fetchCategorys ({ commit }) {
    return apiModel.getAllCategorys().then(data => {
      commit('setCategoryArr', data)
    })
  }
}
