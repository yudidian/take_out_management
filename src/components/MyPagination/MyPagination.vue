<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[2, 4, 10, 15]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default: () => 0
  },
  currentPage: {
    type: Number,
    default: () => 1
  },
  pageSize: {
    type: Number,
    default: () => 10
  },
  getInfo: {
    type: Function,
    default: () => {}
  }
})
const emits = defineEmits(['getPageMessage'])

const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)
const handleSizeChange = async (val) => {
  const res = await props.getInfo({
    page: currentPage.value,
    pageSize: val
  })
  emits('getPageMessage', res.info.records)
}
const handleCurrentChange = async (val) => {
  const res = await props.getInfo({
    page: val,
    pageSize: pageSize.value
  })
  emits('getPageMessage', res.info.records)
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
