// 订单相关api
import request from '../request'

// 获取所有评论
export const sendGetAllReviews = (params) => {
  return request({
    url: '/reviews/all',
    method: 'get',
    params
  })
}
// 回复评论
export const sendReviewUser = (data) => {
  return request({
    url: '/store/reviews',
    method: 'post',
    data
  })
}
// 删除回复
export const sendDeleteReview = (id) => {
  return request({
    url: `/store/reviews/${id}`,
    method: 'delete'
  })
}
