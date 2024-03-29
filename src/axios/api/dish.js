// 菜品相关api
import request from '../request'

// 添加菜品
export const addDish = (data) => {
  return request({
    url: '/dish',
    method: 'POST',
    data
  })
}
// 获取菜品分页数据
export const getDishPage = (params) => {
  return request({
    url: '/dish/page',
    method: 'GET',
    params
  })
}
// 根据id获取对应的信息
export const getDishInfoById = (id) => {
  return request({
    url: `/dish/${id}`,
    method: 'GET'
  })
}
// 修改商品信息
export const updateDishInfo = (data) => {
  return request({
    url: '/dish',
    method: 'PUT',
    data
  })
}
// 删除或禁用商品信息
export const deleteAndForbiddenDish = (data) => {
  return request({
    url: '/dish/status',
    method: 'PUT',
    data
  })
}
// 删除或禁用商品信息
export const updateListDish = (data) => {
  return request({
    url: '/dish/all',
    method: 'PUT',
    data
  })
}
// 获取菜品描述信息
export const sendGetDishDescription = (params) => {
  return request({
    url: '/goods/description/list',
    method: 'get',
    params
  })
}
// 改变菜品描述信息
export const sendChangeDishDescription = (data) => {
  return request({
    url: '/goods/description/change',
    method: 'post',
    data
  })
}
// 获取轮播图
export const sendGetSwiperList = (data) => {
  return request({
    url: '/swiper',
    method: 'get'
  })
}
// 添加轮播图
export const sendAddSwiperList = (data) => {
  return request({
    url: '/swiper',
    method: 'post',
    data
  })
}
// 修改轮播图
export const sendUpdateSwiperList = (data) => {
  return request({
    url: '/swiper',
    method: 'put',
    data
  })
}
// 删除轮播图
export const sendDeleteSwiperList = (id) => {
  return request({
    url: '/swiper',
    method: 'delete',
    params: {
      id
    }
  })
}
