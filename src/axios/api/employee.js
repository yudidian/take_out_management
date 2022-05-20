import request from '../request'

export const login = (data) => {
  return request({
    url: '/employee/login',
    method: 'POST',
    data
  })
}
