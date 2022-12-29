import { RouterView } from 'vue-router'
let USER_ROUTER
const PERMISSION = {
  // 员工管理权限
  EMPLOYEE_MANAGER: 1002,
  // 菜品分类管理权限
  CLASS_MANAGER: 1003,
  // 菜品管理
  CUISINE_MANAGER: 1004,
  // 菜品轮播图管理
  SWIPER_MANAGER: 1005,
  // 菜品描述管理
  CUISINE_DESCRIPTION: 1006,
  // 套餐管理
  MENU_MANAGER: 1007,
  // 订单管理
  ORDER_MANAGER: 1008,
  // 评论管理
  REVIEW_MANGER: 1009,
  // 添加员工
  EMPLOYEE_add: 1010,
  // 客服中心
  CUSTOMER_SERVICE: 1011,
  // 添加套餐
  MENU_ADD: 1012
}
const menuGroup = {
  EMPLOYEE_MANAGER: 1,
  CLASS_MANAGER: 2,
  CUISINE_MANAGER: 3,
  MENU_MANAGER: 4,
  ORDER_MANAGER: 5,
  REVIEW_MANGER: 6,
  CUSTOMER_SERVICE: 7
}
const menuName = {
  [menuGroup.EMPLOYEE_MANAGER]: '员工管理',
  [menuGroup.CLASS_MANAGER]: '分裂管理',
  [menuGroup.CUISINE_MANAGER]: '菜品管理',
  [menuGroup.MENU_MANAGER]: '套餐管理',
  [menuGroup.ORDER_MANAGER]: '订单管理',
  [menuGroup.REVIEW_MANGER]: '评论管理',
  [menuGroup.CUSTOMER_SERVICE]: '消息管理'
}
const router = [
  {
    id: PERMISSION.EMPLOYEE_MANAGER,
    group: menuGroup.EMPLOYEE_MANAGER,
    desp: '员工管理',
    path: '/admin',
    name: 'admin',
    component: () => import('@/pages/admin/admin-index.vue'),
    meta: {
      title: '员工管理'
    }
  },
  {
    id: PERMISSION.CLASS_MANAGER,
    group: menuGroup.CLASS_MANAGER,
    desp: '分类管理',
    path: '/class',
    name: 'class',
    component: () => import('@/pages/class/class-index.vue'),
    meta: {
      title: '分类管理'
    }
  },
  {
    id: PERMISSION.CUISINE_MANAGER,
    group: menuGroup.CUISINE_MANAGER,
    desp: '菜品管理',
    path: '/cuisine',
    name: 'cuisine',
    component: () => import('@/pages/cuisine/cuisine-index.vue'),
    meta: {
      title: '菜品管理'
    }
  },
  {
    id: PERMISSION.SWIPER_MANAGER,
    group: menuGroup.CUISINE_MANAGER,
    desp: '菜品轮播图管理',
    path: '/swiperManager',
    name: 'SwiperManager',
    component: () => import('@/pages/SwiperManager/SwiperManager.vue'),
    meta: {
      title: '菜品轮播图管理'
    }
  },
  {
    id: PERMISSION.CUISINE_DESCRIPTION,
    group: menuGroup.CUISINE_MANAGER,
    desp: '菜品描述管理',
    path: '/cuisine/description',
    name: 'cuisineDescription',
    component: () => import('@/pages/CuisineDescription/CuisineDescription.vue'),
    meta: {
      title: '菜品描述管理'
    }
  },
  {
    id: PERMISSION.MENU_MANAGER,
    group: menuGroup.MENU_MANAGER,
    desp: '套餐管理',
    path: '/menu',
    component: RouterView,
    meta: {
      title: '套餐管理'
    },
    children: [
      {
        id: PERMISSION.MENU_MANAGER,
        path: '',
        name: 'menu',
        component: () => import('@/pages/menu/menu-index.vue')
      },
      {
        id: PERMISSION.MENU_ADD,
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
    id: PERMISSION.ORDER_MANAGER,
    group: menuGroup.ORDER_MANAGER,
    desp: '订单管理',
    path: '/order',
    name: 'order',
    component: () => import('@/pages/order/order-index.vue'),
    meta: {
      title: '订单管理'
    }
  },
  {
    id: PERMISSION.REVIEW_MANGER,
    group: menuGroup.REVIEW_MANGER,
    desp: '评论管理',
    path: '/review',
    name: 'review',
    component: () => import('@/pages/review/ReviewPage.vue'),
    meta: {
      title: '评论管理'
    }
  },
  {
    id: PERMISSION.EMPLOYEE_add,
    group: menuGroup.EMPLOYEE_MANAGER,
    desp: '添加员工',
    path: '/admin/add',
    name: 'admin-add',
    component: () => import('@/pages/admin/child/admin-add.vue'),
    meta: {
      title: '添加员工'
    }
  },
  {
    id: PERMISSION.CUSTOMER_SERVICE,
    group: menuGroup.CUSTOMER_SERVICE,
    desp: '客服中心',
    path: '/customerService',
    name: 'CustomerService',
    component: () => import('@/pages/CustomerService/CustomerService.vue'),
    meta: {
      title: '客服中心',
      keepAlive: false,
      index: 17
    }
  }
]
export function getRouters (permissionList) {
  if (permissionList === undefined) {
    return
  }
  if (typeof permissionList === 'string') {
    permissionList = permissionList.split(',')
  }
  const userRouters = []
  for (const routerElement of router) {
    if (routerElement.children) {
      const res = checkChild(routerElement.children, permissionList)
      userRouters.push({ ...routerElement, children: res })
    } else {
      if (permissionList.find(item => routerElement.id === parseInt(item))) {
        userRouters.push(routerElement)
      }
    }
  }
  USER_ROUTER = {
    path: '/index',
    name: 'index',
    redirect: '/admin',
    component: () => import('@/layout/layout-index.vue'),
    children: userRouters
  }
  return USER_ROUTER
}
function checkChild (childArr, permissionList) {
  const childRouters = []
  for (const childRouter of childArr) {
    if (permissionList.find(item => childRouter.id === parseInt(item))) {
      childRouters.push(childRouter)
    }
  }
  return childRouters
}
export const getMenu = (routers) => {
  const userMenu = {}
  const menuList = []
  for (const router of routers) {
    if (userMenu[router.group]) {
      userMenu[router.group].children.push({
        path: router.path,
        desp: router.desp
      })
    } else {
      userMenu[router.group] = {
        children: [
          {
            path: router.path,
            desp: router.desp
          }
        ]
      }
    }
  }
  for (const key in userMenu) {
    menuList.push({
      desp: menuName[key],
      children: userMenu[key].children
    })
  }
  return menuList
}
export const getUserRouter = () => USER_ROUTER
