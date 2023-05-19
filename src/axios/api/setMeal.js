import request from '../request'

export const getPageInfo = (params) => {
  return request({
    url: '/setmeal/page',
    method: 'GET',
    params
  })
}
export const getCategory = (type) => {
  return request({
    url: `/category/list/${type}`,
    method: 'GET'
  })
}
export const getDish = (params) => {
  return request({
    url: '/dish/list',
    method: 'GET',
    params
  })
}
export const addSetmeal = (data) => {
  return request({
    url: '/setmeal',
    method: 'POST',
    data
  })
}

export const getMealById = (id) => {
  return request({
    url: `/setmeal/${id}`,
    method: 'get'
  })
}
export const updateMeal = (data) => {
  return request({
    url: '/setmeal',
    method: 'PUT',
    data
  })
}
export const deleteMeal = (params) => {
  return request({
    url: '/setmeal/list/delete',
    method: 'post',
    data: params
  })
}
export const forbiddenMeal = (data) => {
  return request({
    url: '/setmeal/list',
    method: 'PUT',
    data
  })
}
