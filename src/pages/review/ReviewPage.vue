<template>
  <MyHeader
    @show-dialog="dialogFormVisible = $event"
    @get-key-words="searchHandler"
    :is-show-bulk="false"
  />
  <el-table
    ref="multipleTableRef"
    :data="tableData.pages"
    style="width: 100%"
    v-loading="tableData.pages.length<=0"
  >
    <el-table-column
      type="index"
      width="50"
    />
    <el-table-column
      label="用户ID"
      width="320"
      align="center"
      prop="userId"
    />
    <el-table-column
      label="用户姓名"
      prop="username"
      width="240"
      align="center"
    />
    <el-table-column
      label="用户头像"
      prop="avatar"
      width="340"
      align="center"
    >
      <template #default="scope">
        <MyImage
          :src="IMG_URL+scope.row.avatar"
          width="40px"
          fit="cover"
          :src-list="[IMG_URL+scope.row.avatar]"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="评分"
      prop="rating"
      width="340"
      align="center"
      sortable
    >
      <template #default="scope">
        <el-rate
          v-model="scope.row.rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} 分"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="评论类容"
      prop="text"
      width="340"
      align="center"
    />
    <el-table-column
      label="评论图片"
      prop="images"
      width="340"
      align="center"
    >
      <template #default="scope">
        <div class="image-content">
          <MyImage
            v-for="item in scope.row.images"
            :src="IMG_URL+item"
            :key="item"
            fit="cover"
            :src-list="[IMG_URL+item]"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="评论时间"
      prop="createTime"
      width="340"
      sortable
      align="center"
    />
    <el-table-column
      label="操作"
      align="center"
      width="300px"
      fixed="right"
    >
      <template #default="score">
        <el-button
          text
          size="small"
          type="primary"
          @click="showOrderStatus(score.row)"
        >
          回复
        </el-button>
        <el-button
          text
          size="small"
          type="danger"
          :disabled="score.row.status !== 2"
          @click="sendOrder(score.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getAllReviews"
    :total="tableData.total"
    @get-page-message="tableData.pages = $event"
  />
  <el-dialog
    v-model="dialogFormVisible"
    title="编辑商品描述"
    destroy-on-close
    :close-on-click-modal="false"
    :width="750"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in orderStatusInfo"
        :timestamp="item.time"
        :key="index"
        placement="top"
      >
        <el-card>
          <h4>{{ item.message }}</h4>
          <p>时间：{{ item.time }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { sendGetOrderStatus } from '@/axios/api/orders'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sendGetAllReviews } from '@/axios/api/reviews'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const keyWords = ref('')
const orderStatusInfo = ref([])
const tableData = reactive({
  total: 0,
  pages: []
})
const dialogFormVisible = ref(false)

onMounted(() => {
  getAllReviews({
    page: 0,
    pageSize: 10
  })
})
const getAllReviews = async (params) => {
  const res = await sendGetAllReviews(params)
  console.log(res)
  if (res.code === 1) {
    tableData.pages = res.info.records
    tableData.total = res.info.total
  } else {
    ElMessage.error(res.msg)
  }
}
const showOrderStatus = (row) => {
  const params = {
    flag: 0,
    number: row.number
  }
  dialogFormVisible.value = true
  getOrderStatus(params)
  console.log(row)
}

const getOrderStatus = async (params) => {
  const res = await sendGetOrderStatus(params)
  if (res.code !== 1) {
    return ElMessage.error(res.msg)
  }
  if (res.data.orderTime) {
    orderStatusInfo.value.push({
      time: res.data.orderTime,
      message: '已下单'
    })
  }
  if (res.data.dinnerOutTime) {
    orderStatusInfo.value.push({
      time: res.data.dinnerOutTime,
      message: '商家发货'
    })
  }
  if (res.data.orderCompleteTime) {
    orderStatusInfo.value.push({
      time: res.data.orderCompleteTime,
      message: '用户收货'
    })
  }
}
const sendOrder = (row) => {
  ElMessageBox.confirm(
    '是否确认出餐?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      await getOrderStatus({
        number: row.number,
        flag: 1
      })
      ElMessage.success('出餐成功')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消出餐'
      })
    })
}
// 搜索功能
const searchHandler = async (val) => {
  keyWords.value = val
  await getAllReviews()
}
</script>

<style scoped lang="scss">
.image-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dialog {
  .el-form {
    .el-form-item {
      width: 300px;
    }
    .flavor-textArea{
      width: 720px;
    }
  }
}
</style>
