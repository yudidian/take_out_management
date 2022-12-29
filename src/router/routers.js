const router = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/Login-index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/dataDashboard'
  },
  {
    path: '/dataDashboard',
    name: 'dataDashboard',
    component: () => import('@/pages/DataDashboard/DataDashboard.vue'),
    meta: {
      title: '大数据看板'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/NotFound/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]
export default router
