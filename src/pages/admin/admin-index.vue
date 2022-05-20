<template>
  <div class="admin">
    <div class="admin-header">
      <el-input
        v-model="keyWords"
        placeholder="请输入关键字"
        :prefix-icon="Search"
      />
      <el-button
        color="#FFC200"
        round
        :icon="Plus"
      >
        添加新员工
      </el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Date"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
      />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import {
  Search,
  Plus
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const keyWords = ref('')
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
.admin{
  .admin-header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    .el-input{
      width: 180px;
      margin-right: 20px;
    }
  }
}
.pagination{
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
