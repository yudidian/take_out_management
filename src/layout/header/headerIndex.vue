<template>
  <el-header>
    <el-icon
      :size="40"
      @click="changeCollapse()"
    >
      <Expand v-if="getters.isCollapse" />
      <Fold v-else />
    </el-icon>
    <Breadcrumb />
    <el-input
      v-model="KeyWords"
      placeholder="请输入关键字"
      :prefix-icon="Search"
    />
    <el-icon
      :size="30"
      v-if="!isFullscreen"
    >
      <FullScreen @click="fullScreenHandler" />
    </el-icon>
    <el-icon
      :size="30"
      v-else
    >
      <SwitchButton @click="fullScreenHandler" />
    </el-icon>
    <el-badge
      :value="store.getters.totalMessage.newTotal - store.getters.totalMessage.oldTotal"
      class="item"
      @click="showTip"
    >
      <el-icon :size="30">
        <Bell />
      </el-icon>
    </el-badge>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          src="https://img1.baidu.com/it/u=2029513305,2137933177&fm=253&fmt=auto&app=138&f=JPEG?w=40&h=40"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlerExit">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
<script lang="ts" setup>
import screenfull from 'screenfull'
import {
  Expand,
  Fold,
  Search,
  FullScreen,
  Bell,
  SwitchButton
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Breadcrumb from './Breadcrumb-index.vue'
import { ref } from '@vue/reactivity'
import { ElNotification } from 'element-plus'
import { clearAllTimer } from '@/utils'
const router = useRouter()
const store = useStore()
const getters = store.getters
const KeyWords = ref('')
const isFullscreen = ref(false)
const changeCollapse = () => {
  store.dispatch('getIsCollapse', !getters.isCollapse)
}
const handlerExit = () => {
  localStorage.clear()
  clearAllTimer()
  router.replace('/login')
}
const fullScreenHandler = () => {
  if (screenfull.isFullscreen) {
    screenfull.exit()
    isFullscreen.value = false
  } else {
    screenfull.request()
    isFullscreen.value = true
  }
}
const showTip = () => {
  ElNotification({
    title: '未处理的信息',
    dangerouslyUseHTMLString: true,
    duration: 5000,
    offset: 50,
    message: `<div><span style="margin-right: 20px">你有<span style="color: red;">${store.getters.totalMessage.newTotal - store.getters.totalMessage.oldTotal}</span>条订单未处理</span><a href="#/order">去处理</a></div>`,
    onClose: () => {
      store.commit('setTotalMessage', {
        newTotal: store.getters.totalMessage.newTotal,
        oldTotal: store.getters.totalMessage.newTotal
      })
    }
  })
}
</script>

<style scoped lang="scss">
.el-header {
  display: flex;
  align-items: center;

  .el-input {
    width: 180px;
    margin-left: auto;
  }

  .el-icon {
    margin-left: 20px;
  }

  .el-badge {
    margin-right: 30px;
  }
  .el-avatar{
    cursor: pointer;
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  .el-input__wrapper {
    padding: 0;
    margin-right: 20px;
  }
}

</style>
