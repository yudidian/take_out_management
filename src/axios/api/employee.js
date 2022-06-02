import request from '../request'

// 登录接口
export const login = (data) => {
  return request({
    url: '/employee/login',
    method: 'POST',
    data
  })
}
// 获取员工表数据
export const addEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'post',
    data
  })
}
// 获取员工表
export const employeeInfo = (params) => {
  return request({
    url: '/employee/page',
    method: 'GET',
    params
  })
}
// 修改员工表
export const updateEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'PUT',
    data
  })
}
