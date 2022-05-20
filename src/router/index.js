import { createRouter, createWebHashHistory } from 'vue-router'
import router from './routers'
const routes = router

const myRouter = createRouter({
  history: createWebHashHistory(),
  routes
})
myRouter.beforeEach((to, from, next) => {
  next()
})
myRouter.afterEach((to, from) => {
  to.path && sessionStorage.setItem('url', to.path)
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default myRouter
