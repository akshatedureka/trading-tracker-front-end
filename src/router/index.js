import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderBlocks from '../views/OrderBlocks.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OrderBlocks',
    component: OrderBlocks
  },
  {
    path: '/create-part',
    name: 'CreatePart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create-part" */ '../views/CreatePart.vue')
  },
  {
    path: '/search-part',
    name: 'SearchPart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search-part" */ '../views/SearchPart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
