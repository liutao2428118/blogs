import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue'
import article from '../views/article/article.vue'
import archive from '../views/archive/archive.vue'
import about from '../views/about/about.vue'
Vue.use(VueRouter)

export default () => {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: home
            },
            {
                path: '/article/:id',
                name: 'article',
                component: article
            },
            {
                path: '/archive/:id',
                name: 'archive',
                component: archive
            },
            {
                path: '/about/:page',
                name: 'about',
                component: about
            }
        ]
    })
}
