<template>
  <div class="logo">
    <img src="@/assets/logo.png">
  </div>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="getters.isCollapse"
    :router="true"
    :default-active="defineUrl"
  >
    <el-menu-item index="/admin">
      <template #title>
        <el-icon>
          <Avatar />
        </el-icon>
        <span>员工管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/class">
      <template #title>
        <el-icon>
          <Grid />
        </el-icon>
        <span>分类管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/cuisine">
      <template #title>
        <el-icon>
          <ForkSpoon />
        </el-icon>
        <span>菜品管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/cuisine/description">
      <template #title>
        <el-icon>
          <ForkSpoon />
        </el-icon>
        <span>菜品描述管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/menu">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>套餐管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/order">
      <template #title>
        <el-icon>
          <Tickets />
        </el-icon>
        <span>订单管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/review">
      <template #title>
        <el-icon>
          <Tickets />
        </el-icon>
        <span>评论管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Avatar,
  Grid,
  ForkSpoon,
  Tickets,
  Management
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ref } from '@vue/runtime-core'

const store = useStore()
const getters = store.getters
const defineUrl = ref(sessionStorage.getItem('url') || '/')
</script>

<style scoped lang="scss">
.logo {
  height: 95px;
  background-color: #343744;
  img {
    width: 200px;
  }
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
      background-color: #343744;
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
