<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <MenuIndex />
      </el-aside>
      <el-container>
        <HeaderIndex />
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import MenuIndex from './menu/MenuIndex.vue'
import HeaderIndex from './header/headerIndex.vue'
</script>

<style scoped lang="scss">
.el-aside {
  background-color: #343744;
}
</style>
