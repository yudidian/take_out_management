export default {
  token: (state) => {
    return state.employee.token
  },
  userId: (state) => {
    return state.employee.userId
  },
  permission: (state) => {
    return state.employee.permission
  },
  isCollapse: (state) => {
    return state.common.isCollapse
  },
  totalMessage: (state) => {
    return state.common.totalMessage
  }
}
