import Vue from 'vue'
import Router from 'vue-router'
import Common from './views/Common.vue'
import Order from './views/order.vue'
import Place from './views/Place.vue'
import History from './views/History.vue'
import User from './views/User.vue'
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
      path: '/',
      name: 'common',
      redirect: '/order',
      component: Common,
      children: [
        {
          path: '/order',
          name: 'order',
          component: Order,
        },
        {
          path: '/place',
          name: 'place',
          component: Place,
        },
        {
          path: '/history',
          name: 'history',
          component: History,
        },
        {
          path: '/user',
          name: 'user',
          component: User,
        },

      ]
    }
  ]
})
