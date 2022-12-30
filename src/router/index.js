import { createRouter, createWebHashHistory } from 'vue-router'
import { getRouters } from './PermissionRouter'
import router from './routers'
const routes = router

const myRouter = createRouter({
  history: createWebHashHistory(),
  routes
})
// 获取权限路由
const routerList = getRouters(localStorage.getItem('permission') || [])
// 动态添加路由
myRouter.addRoute(routerList)
myRouter.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // const username= localStorage.getItem('username')
  if (token) {
    if (to.path === '/login') {
      return next(from.path)
    }
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
myRouter.afterEach((to, from) => {
  to.path && sessionStorage.setItem('url', to.path)
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default myRouter
