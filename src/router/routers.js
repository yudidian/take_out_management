import { RouterView } from 'vue-router'
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
    name: 'index',
    redirect: '/admin',
    component: () => import('@/layout/layout-index.vue'),
    children: [
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/pages/admin/admin-index.vue'),
        meta: {
          title: '员工管理'
        }
      },
      {
        path: '/class',
        name: 'class',
        component: () => import('@/pages/class/class-index.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: '/cuisine',
        name: 'cuisine',
        component: () => import('@/pages/cuisine/cuisine-index.vue'),
        meta: {
          title: '菜品管理'
        }
      },
      {
        path: '/cuisine/description',
        name: 'cuisineDescription',
        component: () => import('@/pages/CuisineDescription/CuisineDescription.vue'),
        meta: {
          title: '菜品描述管理'
        }
      },
      {
        path: '/menu',
        component: RouterView,
        meta: {
          title: '套餐管理'
        },
        children: [
          {
            path: '',
            name: 'menu',
            component: () => import('@/pages/menu/menu-index.vue')
          },
          {
            path: 'add',
            name: 'menu-add',
            component: () => import('@/pages/menu/menu-add.vue'),
            meta: {
              title: '添加套餐'
            }
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/pages/order/order-index.vue'),
        meta: {
          title: '套餐管理'
        }
      },
      {
        path: '/admin/add',
        name: 'admin-add',
        component: () => import('@/pages/admin/child/admin-add.vue'),
        meta: {
          title: '添加员工'
        }
      }
    ]
  }
]
export default router
