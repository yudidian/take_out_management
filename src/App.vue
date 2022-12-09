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
export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      window.innerWidth < 1200 && store.dispatch('getIsCollapse', true)
      window.addEventListener('resize', lodash.throttle((e) => {
        if (e.target.innerWidth < 1200) {
          store.dispatch('getIsCollapse', true)
        } else {
          store.dispatch('getIsCollapse', false)
        }
      }, 500))
    })
    return {
      locale: zhCn
    }
  }
})
</script>
