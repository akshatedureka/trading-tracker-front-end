import Vue from 'vue'
import VueRouter from 'vue-router'
//import OrderBlocks from '../views/OrderBlocks.vue'
//import Ladder from '../views/PriceLadder.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/price-ladder',
    name: 'PriceLadder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create-part" */ '../views/PriceLadder.vue')
  },
  {
    path: '/order-blocks',
    name: 'OrderBlocks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create-part" */ '../views/OrderBlocks.vue')
  },
  {
    path: '/symbol-maintenance',
    name: 'SymbolMaintenance',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create-part" */ '../views/SymbolMaintenance.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
