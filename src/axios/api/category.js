// 分类管理相关api
import request from '../request'
export const getPageInfo = (params) => {
  return request({
    url: '/category',
    method: 'GET',
    params
  })
}
// 添加套餐或菜品
export const addCategory = (data) => {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}
// 删除
export const deleteCategory = (id) => {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}
// 修改
export const updateCategory = (data) => {
  return request({
    url: '/category',
    method: 'PUT',
    data
  })
}
// 获取菜品分类
export const getCategoryInfo = () => {
  return request({
    url: '/category/all',
    method: 'get'
  })
}
