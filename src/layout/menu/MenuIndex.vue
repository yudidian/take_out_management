<template>
  <div class="content">
    <div
      :class="isCollapse ? 'collapse-logo' : 'logo'"
    >
      <img
        v-if="!isCollapse"
        src="@/assets/logo.png"
        alt=""
      >
      <span v-else>koala</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="store.getters.isCollapse"
      :router="true"
      :default-active="defineUrl"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <Platform />
          </el-icon>
          <span>大数据</span>
        </template>
        <el-menu-item index="/dataDashboard">
          <el-icon>
            <Platform />
          </el-icon>
          <template #title>
            <span>大数据看板</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu
        v-for="(item, index) in menuList"
        :index="(index + 2).toString()"
        :key="index"
      >
        <template #title>
          <el-icon>
            <Platform />
          </el-icon>
          <span>{{ item.desp }}</span>
        </template>
        <el-menu-item
          v-for="router in item.children"
          :index="router.path"
          :key="router.path"
        >
          <el-icon>
            <Platform />
          </el-icon>
          <template #title>
            <span>{{ router.desp }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  // Avatar,
  // Grid,
  // ForkSpoon,
  // Tickets,
  // Management,
  Platform
  // EditPen,
  // ChatSquare,
  // Postcard,
  // ChatLineSquare
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMenu, getUserRouter } from '@/router/PermissionRouter'
const menuList = ref([])
const route = useRoute()
const store = useStore()
const isCollapse = ref(store.getters.isCollapse)
menuList.value = getMenu(getUserRouter().children)
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
  :deep(.el-sub-menu){
    background-color: #343744!important;
    width: 160px;
    border-radius:0 50px 50px 0;
    color: #8c939d;
    .el-sub-menu__title{
      color: #8c939d;
      &:hover:not(.is-active){
        border-radius:0 50px 50px 0;
        color: #fff;
        background-color: #8c939d;
      }
    }
    .el-menu{
      width: 160px;
      background-color: #343744;
      .el-menu-item{
        min-width: 180px!important;
        width: 160px!important;
        height: 50px;
        margin-bottom: 10px;
        border-radius:0 50px 50px 0;
        color: #8c939d;
        &:hover:not(.is-active){
          color: #fff;
          background-color: #8c939d;
        }
        .el-menu{
          z-index: 99;
        }
      }
    }
  }
  .el-menu-item{
    width: 160px;
    height: 50px;
    margin-bottom: 10px;
    border-radius:0 50px 50px 0;
    color: #8c939d;
    &:hover:not(.is-active){
      color: #fff;
      background-color: #8c939d;
    }
    .el-menu{
      z-index: 99;
    }
  }
  .is-active{
    background-color: #FFC200;
    color: #2a2a2a!important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
