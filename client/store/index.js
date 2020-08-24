import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    actions
  })

  return store
}
