import Vue from 'vue'
import createRouter from './router/index'
import createStore from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import { elementUse } from './element-ui'
import 'github-markdown-css/github-markdown.css'

import './assets/styles/global.styl'
import App from './App.vue'

import { dateStr } from './assets/js/filter'

elementUse(Vue)

Vue.filter('dateStr', dateStr)

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
