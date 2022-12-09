<template>
  <div class="content">
    <div
      :class="isCollapse ? 'collapse-logo' : 'logo'"
    >
      <img
        v-if="!isCollapse"
        src="@/assets/logo.png"
      >
      <span v-else>koala</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="store.getters.isCollapse"
      :router="true"
      :default-active="defineUrl"
    >
      <el-menu-item index="/dataDashboard">
        <el-icon>
          <Platform />
        </el-icon>
        <template #title>
          <span>大数据看板</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/admin">
        <el-icon>
          <Avatar />
        </el-icon>
        <template #title>
          <span>员工管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/class">
        <el-icon>
          <Grid />
        </el-icon>
        <template #title>
          <span>分类管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/cuisine">
        <el-icon>
          <ForkSpoon />
        </el-icon>
        <template #title>
          <span>菜品管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/cuisine/description">
        <el-icon>
          <ForkSpoon />
        </el-icon>
        <template #title>
          <span>菜品描述管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/menu">
        <el-icon>
          <Management />
        </el-icon>
        <template #title>
          <span>套餐管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/order">
        <el-icon>
          <Tickets />
        </el-icon>
        <template #title>
          <span>订单管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/review">
        <el-icon>
          <Tickets />
        </el-icon>
        <template #title>
          <span>评论管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/customerService">
        <el-icon>
          <Tickets />
        </el-icon>
        <template #title>
          <span>消息管理</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Avatar,
  Grid,
  ForkSpoon,
  Tickets,
  Management,
  Platform
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
const isCollapse = ref(store.getters.isCollapse)
watch(() => store.getters.isCollapse, (val) => {
  isCollapse.value = val
}, { immediate: true })
watch(() => route.path, () => {
  defineUrl.value = route.path
})
const defineUrl = ref(sessionStorage.getItem('url') || '/')
</script>

<style scoped lang="scss">
.content{
  display: flex;
  background-color: #343744;
  flex-direction: column;
}
.logo {
  width: 200px;
  height: 95px;
  background-color: #343744;
  transition: width 0.25s;
  img {
    width: 200px;
  }
}
.collapse-logo{
  width: 64px;
  height: 30px;
  color: #fffdef;
  font-weight: 900;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  background-color: #343744;
  transition: width 0.4s;
}
.el-menu {
  border: 0;
  height: calc(100% - 95px);
  overflow-y: hidden;
  background-color: #343744;
  .el-menu-item,.el-sub-menu{
    width: 160px;
    height: 50px;
    margin-bottom: 10px;
    border-radius:0 50px 50px 0;
    color: #8c939d;
    &:hover:not(.is-active){
      color: #fff;
      background-color: #8c939d;
    }
  }
  .is-active{
    width: 160px;
    height: 50px;
    border-radius:0 50px 50px 0;
    background-color: #FFC200;
    color: #2a2a2a;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
