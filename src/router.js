import Vue from 'vue';
import Router from 'vue-router';
import Common from './views/Common.vue';
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['./views/Login.vue'], resolve),
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
          component: resolve => require(['./views/Order.vue'], resolve),
        },
        {
          path: '/list',
          name: 'list',
          component: resolve => require(['./views/ordersList'], resolve),
        },
        {
          path: '/list/:orderId/detail',
          name: 'detail',
          component: resolve => require(['./views/ordersList/detail'], resolve),
          props: true,
          meta: { isShowBack: true }
        },
        {
          path: '/history',
          name: 'history',
          component: resolve => require(['./views/History.vue'], resolve),
        },
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['./views/User.vue'], resolve),
        },
      ]
    }
  ]
});
