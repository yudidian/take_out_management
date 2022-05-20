export default {
  namespace: true,
  state () {
    return {
      isCollapse: false // 控制菜单栏是否展开
    }
  },
  mutations: {
    changeIsCollapse (state, value) {
      state.isCollapse = value
    }
  },
  actions: {
    getIsCollapse ({ commit }, type) {
      commit('changeIsCollapse', type)
    }
  }
}
