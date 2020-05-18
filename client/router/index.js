import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue'
Vue.use(VueRouter)

export default () => {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: home
      }
    ]
  })
}
