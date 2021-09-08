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
    component: () => import(/* webpackChunkName: "price-ladder" */ '../views/PriceLadder.vue')
  },
  {
    path: '/order-blocks',
    name: 'OrderBlocks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order-blocks" */ '../views/OrderBlocks.vue')
  },
  {
    path: '/symbol-maintenance',
    name: 'SymbolMaintenance',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "symbol-maintenance" */ '../views/SymbolMaintenance.vue')
  },
  {
    path: '/block-archive',
    name: 'BlockArchive',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "block-archive" */ '../views/BlockArchive.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
