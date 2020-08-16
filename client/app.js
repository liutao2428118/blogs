import Vue from 'vue'
import createRouter from './router/index'
import createStore from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'github-markdown-css/github-markdown.css'

import './assets/styles/global.styl'
import App from './App.vue'

Vue.use(ElementUI);

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
