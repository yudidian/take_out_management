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
    >
      <FullScreen />
    </el-icon>
    <el-badge
      :value="12"
      class="item"
    >
      <el-icon :size="30">
        <Bell />
      </el-icon>
    </el-badge>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          src="@/assets/logo.png"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
<script lang="ts" setup>
import {
  Expand,
  Fold,
  Search,
  FullScreen,
  Bell
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import Breadcrumb from './Breadcrumb-index.vue'
import { ref } from '@vue/reactivity'

const store = useStore()
const getters = store.getters
const KeyWords = ref('')
const changeCollapse = () => {
  store.commit('changeCollapse', !getters.isCollapse)
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
