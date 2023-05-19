<template>
  <div class="common-layout">
    <el-container>
      <MenuIndex />
      <el-container>
        <HeaderIndex />
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>
          <p class="footer">
            @考拉外卖
          </p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import MenuIndex from './menu/MenuIndex.vue'
import HeaderIndex from './header/headerIndex.vue'
import { sendGetOrdersCount } from '@/axios/api/sourceData'
import { useStore } from 'vuex'
import { onBeforeUnmount } from 'vue'
let timer = null
const store = useStore()
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
getOrdersCount(true)
timer = setInterval(() => {
  getOrdersCount(false)
}, 3000)

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.footer{
  text-align: center;
  color: #8c939d;
  line-height: 60px;
}
.el-container{
  position: relative;
  height: 100vh;
  background-color: var(--el-bg-color);
}
</style>
