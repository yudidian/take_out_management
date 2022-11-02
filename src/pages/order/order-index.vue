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
    <el-table-column type="expand">
      <template #default="props">
        <div>
          <p
            style="color: red;font-size: 20px;margin-left: 10px;font-weight: 900;"
          >
            订单详情
          </p>
          <el-table
            :data="props.row.orderDetailList"
            :border="false"
          >
            <el-table-column
              type="index"
              width="50"
            />
            <el-table-column
              label="菜品名字"
              prop="name"
              width="200px"
            />
            <el-table-column
              label="单价"
              prop="amount"
              width="160px"
            >
              <template #default="score">
                <span style="color: red">{{ (score.row.amount/100).toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              prop="number"
              width="60px"
            />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50"
    />
    <el-table-column
      label="订单编号"
      width="320"
      align="center"
      prop="number"
    />
    <el-table-column
      label="收货人姓名"
      prop="consignee"
      width="240"
      align="center"
    />
    <el-table-column
      label="收货地址"
      prop="address"
      width="340"
      align="center"
    />
    <el-table-column
      label="联系方式"
      prop="phone"
      width="340"
      align="center"
    />
    <el-table-column
      label="备注"
      prop="remark"
      width="340"
      align="center"
    />
    <el-table-column
      label="下单时间"
      prop="checkoutTime"
      width="340"
      align="center"
    />
    <el-table-column
      label="配送状态"
      prop="status"
      width="240"
      align="center"
    >
      <template #default="score">
        <span style="color: #000000;font-weight: 900;">{{ getStatus(score.row.status) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="amount"
      width="240"
      align="center"
    >
      <template #default="score">
        <span style="color: red">{{ (score.row.amount/100).toFixed(2) }}</span>
      </template>
    </el-table-column>
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
          查看订单状态
        </el-button>
        <el-button
          text
          size="small"
          type="danger"
          :disabled="score.row.status !== 2"
          @click="sendOrder(score.row)"
        >
          出餐
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getOrderList"
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
import { sendGetOrderList, sendGetOrderStatus } from '@/axios/api/orders'
import { ElMessage, ElMessageBox } from 'element-plus'
// const IMG_URL = import.meta.env.VITE_IMAGE_URL
const keyWords = ref('')
const orderStatusInfo = ref([])
const tableData = reactive({
  total: 0,
  pages: []
})
const dialogFormVisible = ref(false)

onMounted(() => {
  getOrderList({
    page: 0,
    pageSize: 10,
    state: 0
  })
})
const getOrderList = async (params) => {
  const res = await sendGetOrderList(params)
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
const getStatus = (status) => {
  if (status === 2) {
    return '待出餐'
  } else if (status === 3) {
    return '已出餐'
  } else {
    return '已完成'
  }
}
// 搜索功能
const searchHandler = async (val) => {
  keyWords.value = val
  await getOrderList()
}
</script>

<style scoped lang="scss">
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
