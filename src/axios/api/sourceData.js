import request from '../request'

// 获取总的用户数据
export const sendGetAllUser = () => {
  return request({
    url: '/data/userCount',
    method: 'GET'
  })
}
// 获取菜品的销售信息
export const sendGetAllDishInfo = () => {
  return request({
    url: '/data/dish',
    method: 'GET'
  })
}
// 获取评论情况
export const sendGetReviewInfo = () => {
  return request({
    url: '/data/review',
    method: 'GET'
  })
}
// 获取最新订单
export const sendGetOrdersInfo = () => {
  return request({
    url: '/data/order',
    method: 'GET'
  })
}
