import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.request.use(config => {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  // if (getToken() && !isToken) {
  //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // get请求映射params参数
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, error => {
  Promise.reject(error)
})

request.interceptors.response.use(res => {
  if (res.data.msg === '无token') {
    localStorage.clear()
    ElMessage.closeAll()
    // 登录过期的时候清除路由对HomePage的缓存
    ElMessage({
      message: '用户信息过期',
      type: 'warning'
    })
    router.replace('/login')
  }
  return res.data
}, error => {
  let { message } = error
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code 403')) {
    message = '登录过期'
    localStorage.clear()
    router.replace('/login')
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口异常'
  }
  ElMessage.closeAll()
  ElMessage({
    message,
    type: 'error'
  })
})
export default request
