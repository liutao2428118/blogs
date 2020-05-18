import Vue from 'vue'
import createRouter from './router/index'
import createStore from './store'

import './assets/styles/global.styl'

import App from './App.vue'

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
