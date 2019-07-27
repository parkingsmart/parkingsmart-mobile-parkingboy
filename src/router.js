import Vue from 'vue'
import Router from 'vue-router'
import Common from './views/Common.vue'
import Order from './views/order.vue'
import Login from './views/Login.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/parkingboy',
      name: 'common',
      component: Common,
      children: [
        {
          path: 'order',
          name: 'order',
          component: Order,
        },
        
      ]


      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    }
  ]
})