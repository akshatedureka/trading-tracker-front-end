import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
//import OrderBlocks from '../views/OrderBlocks.vue'
//import Ladder from '../views/PriceLadder.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/price-ladder',
    name: 'PriceLadder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "price-ladder" */ '../views/PriceLadder.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/order-blocks',
    name: 'OrderBlocks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "order-blocks" */ '../views/OrderBlocks.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/symbol-management',
    name: 'SymbolManagement',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "symbol-management" */ '../views/SymbolManagement.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/block-management',
    name: 'BlockManagement',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "block-management" */ '../views/BlockManagement.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/block-details/:symbol',
    name: 'BlockDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "block-details" */ '../views/BlockDetails.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/trade-management-swing',
    name: 'TradeManagementSwing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "trade-management-swing" */ '../views/TradeManagementSwing.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/trade-management-day',
    name: 'TradeManagementDay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "trade-management-day" */ '../views/TradeManagementDay.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/block-archive',
    name: 'BlockArchive',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "block-archive" */ '../views/BlockArchive.vue'),
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.state.authenticated) {
    next('/');
  } else {
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
    next();
  }
})

export default router
