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
            @考拉烘焙坊
          </p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import MenuIndex from './menu/MenuIndex.vue'
import HeaderIndex from './header/headerIndex.vue'
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
}
</style>
