import { login } from '@/axios/api/employee'
import { ElMessage } from 'element-plus'
import router from '../../router'
export default {
  namespace: true,
  state () {
    return {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || ''
    }
  },
  mutations: {
    changeToken (state, value) {
      state.token = value
    },
    changeUsername (state, value) {
      state.username = value
    }
  },
  actions: {
    async toLogin ({ commit }, data) {
      const res = await login(data)
      if (res.code === 1) {
        commit('changeToken', res.data.token)
        commit('changeUsername', res.data.username)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        await router.replace('/')
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
      } else {
        ElMessage({
          type: 'error',
          message: res.msg
        })
      }
    }
  }
}
