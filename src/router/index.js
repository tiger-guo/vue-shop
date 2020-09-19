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
  {
    path: '/home',
    name: 'Home',
    component: _import('Home'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 挂载路由导航守卫
// params:
//    to 将要访问的路径
//    form 从哪个路径跳转而来
//    next 是一个函数，表示放行 [ next('/login') 表示强制跳转 ]
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
