<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(path,index) in arrPath"
      :key="index"
      :to="path.path"
    >
      {{ path.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

const route = useRoute()

const arrPath = computed(() => {
  return route.matched
})
</script>
<style scoped>
.el-breadcrumb {
  margin-left: 20px;
  width: 300px;
}
:deep(.el-breadcrumb__inner.is-link){
  font-size: 20px;
  color: #cf4d4d;
}
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
  font-size: 18px;
  color: #000000;
}
</style>
