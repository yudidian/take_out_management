// 订单相关api
import request from '../request'

// 获取订单列表
export const sendGetOrderList = (params) => {
  return request({
    url: '/orders/manage/list',
    method: 'get',
    params
  })
}
export const sendGetOrderStatus = (params) => {
  /**
   * number: 当前订单号
   * flag：操作标志 flag=0 获取当前订单状态 否则修改订单状态为已派送
   */
  return request({
    url: '/orders/state',
    method: 'get',
    params
  })
}
