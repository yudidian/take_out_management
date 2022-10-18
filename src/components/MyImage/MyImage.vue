<template>
  <el-image
    class="my-image"
    :fit="fit"
    :src="src"
    :preview-teleported="true"
    :preview-src-list="srcList"
  >
    <template #error>
      <div class="image-slot">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup>
import { Picture } from '@element-plus/icons-vue'
defineProps({
  src: {
    type: String,
    default: ''
  },
  fit: {
    type: String,
    default: 'cover'
  },
  srcList: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.my-image {
  padding: 0 5px;
  max-width: 100px;
  max-height: 100px;
  width: 140px;
  height: 82px;
  border-radius: 10px;
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
    .el-icon {
      font-size: 30px;
    }
  }
}
</style>
