export default {
  namespace: true,
  state () {
    return {
      isCollapse: false, // 控制菜单栏是否展开
      totalMessage: {
        newTotal: 0,
        oldTotal: 0
      }
    }
  },
  mutations: {
    changeIsCollapse (state, value) {
      state.isCollapse = value
    },
    setTotalMessage (state, data) {
      state.totalMessage.newTotal = data.newTotal
      state.totalMessage.oldTotal = data.oldTotal
    }
  },
  actions: {
    getIsCollapse ({ commit }, type) {
      commit('changeIsCollapse', type)
    }
  }
}
