import Vue from 'vue';
import Router from 'vue-router';
import Common from './views/Common.vue';
import Order from './views/Order.vue';
import Place from './views/place';
import Actions from './views/place/Actions.vue';
import Parkinglots from './views/place/Parkinglots.vue';

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
          path: '/place',
          name: 'place',
          component: Place,
          redirect: { name: 'actions' },
          children: [
            {
              name: 'actions',
              path: 'actions',
              component: Actions
            },
            {
              name: 'parkinglots',
              path: 'actions/parkinglots',
              component: Parkinglots,
              meta: { isShowBack: true }
            }
          ]
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
