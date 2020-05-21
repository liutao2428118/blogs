import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue'
import article from '../views/article/article.vue'
import archive from '../views/archive/archive.vue'
import about from '../views/about/about.vue'
Vue.use(VueRouter)

// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push(to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }

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
                path: '/article',
                name: 'article',
                component: article
            },
            {
                path: '/archive/:id',
                name: 'archive',
                component: archive
            },
            {
                path: '/about',
                name: 'about',
                component: about
            }
        ]
    })
}
