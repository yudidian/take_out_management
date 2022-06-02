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
export const deleteAndForbiddenDish = (info) => {
  if (info.type === 'delete') {
    return request({
      url: `/dish/delete/${info.id}`,
      method: 'GET'
    })
  } else {
    return request({
      url: `/dish/static/${info.id}`,
      method: 'delete'
    })
  }
}
