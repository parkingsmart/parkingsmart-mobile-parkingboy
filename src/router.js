import Vue from 'vue'
import Router from 'vue-router'
import ParkingBoy from './views/ParkingBoy'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/parkingboy',
      name: 'parkingboy',
      component: ParkingBoy,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    }
  ]
})
