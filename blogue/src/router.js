import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/articles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Articles.vue'),
      children: [
        {
          path: '',
          name: 'articlesummary',
          component: () => import('./views/ArticleSummary.vue'),
        },
        {
          path: ':id',
          name: 'articledetail',
          component: () => import('./views/ArticleDetail.vue'),
          props: true
        }
      ]
    }
  ]
})
