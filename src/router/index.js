import Vue from 'vue'
import VueRouter from 'vue-router'

const _import = require('./_import')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: _import('Login'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
