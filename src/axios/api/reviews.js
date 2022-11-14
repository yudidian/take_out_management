// 订单相关api
import request from '../request'

// 获取订单列表
export const sendGetAllReviews = (params) => {
  return request({
    url: '/reviews/all',
    method: 'get',
    params
  })
}
