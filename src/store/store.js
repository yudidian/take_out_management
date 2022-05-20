import { createStore } from 'vuex'
import employee from './module/employee'
import common from './module/common'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    employee,
    common
  }
})
