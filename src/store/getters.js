export default {
  token: (state) => {
    return state.employee.token
  },
  userId: (state) => {
    return state.employee.userId
  },
  isCollapse: (state) => {
    return state.common.isCollapse
  },
  totalMessage: (state) => {
    return state.common.totalMessage
  }
}
