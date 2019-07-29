import Vue from 'vue';
import Router from 'vue-router';
import Common from './views/Common.vue';
import Order from './views/Order.vue';
import List from './views/ordersList';
import Detail from './views/ordersList/detail';

import History from './views/History.vue';
import User from './views/User.vue';
import Login from './views/Login.vue';
Vue.use(Router);

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
          path: '/list',
          name: 'list',
          component: List,
        },
        {
          path: '/list/:orderId/detail',
          name: 'detail',
          component: Detail,
          props: true,
          meta: { isShowBack: true }
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
});
