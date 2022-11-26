<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script>
import lodash from 'lodash'
import { defineComponent, onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useStore } from 'vuex'
import { sendGetOrdersCount } from '@/axios/api/sourceData'
export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      window.addEventListener('resize', lodash.throttle((e) => {
        if (e.target.innerWidth < 1200) {
          store.dispatch('getIsCollapse', true)
        } else {
          store.dispatch('getIsCollapse', false)
        }
      }, 500))
      getOrdersCount(true)
      setInterval(() => {
        getOrdersCount(false)
      }, 3000)
    })
    const getOrdersCount = async (flag) => {
      const res = await sendGetOrdersCount()
      if (flag) {
        store.commit('setTotalMessage', {
          newTotal: res.info.allCount,
          oldTotal: res.info.allCount
        })
      } else {
        store.commit('setTotalMessage', {
          newTotal: res.info.allCount,
          oldTotal: store.getters.totalMessage.oldTotal
        })
      }
    }
    return {
      locale: zhCn
    }
  }
})
</script>
