import { login } from '@/axios/api/employee'
import { ElMessage } from 'element-plus'
export default {
  namespace: true,
  state () {
    return {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userId') || '',
      permission: localStorage.getItem('permission') || []
    }
  },
  mutations: {
    changeToken (state, value) {
      state.token = value
    },
    changeUsername (state, value) {
      state.username = value
    },
    changeUserId (state, value) {
      state.userId = value
    },
    changePermission (state, value) {
      state.permission = value
    }
  },
  actions: {
    async toLogin ({ commit }, data) {
      const res = await login(data)
      if (res.code === 1) {
        commit('changeToken', res.data.token)
        commit('changeUsername', res.data.username)
        commit('changeUserId', res.data.userId)
        commit('changePermission', res.data.permission)
        localStorage.setItem('permission', res.data.permission)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('userId', res.data.userId)
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
        window.location.reload()
      } else {
        ElMessage({
          type: 'error',
          message: res.msg
        })
      }
    }
  }
}
