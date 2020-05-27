export default {
  setCategoryArr (state, arr) {
    state.categoryArr = arr
  },
  setEssayArr (state, data) {
    state.essayList = data
  },
  setEssayTop (state, data) {
    state.essayTop = data
  },
  setEssayOne (state, data) {
    state.EssayOne = data
  },
  doLogin (state, data) {
    state.user = data
  },
}
