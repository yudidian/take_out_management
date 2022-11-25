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
      label="商家回复"
      prop="storeReview"
      width="340"
      align="center"
    >
      <template #default="scope">
        <span>
          {{ scope.row.storeReview === null ? "暂无" : scope.row.storeReview }}
        </span>
        <el-button
          v-if="scope.row.storeReview !== null"
          type="danger"
          text
          size="small"
          @click="changReview(scope.row)"
        >
          修改
        </el-button>
        <el-button
          v-if="scope.row.storeReview !== null"
          type="danger"
          text
          size="small"
          @click="deleteStoreReview(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="商家回复时间"
      prop="reviewTime"
      width="340"
      sortable
      align="center"
    >
      <template #default="scope">
        <span>
          {{ scope.row.reviewTime === null ? "暂无" : scope.row.reviewTime }}
        </span>
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
          @click="reviewHandler(score.row)"
        >
          回复
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
    title="回复用户"
    destroy-on-close
    :close-on-click-modal="false"
    :width="350"
  >
    <el-form>
      <el-form-item>
        <el-input
          type="textarea"
          v-model="review.text"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="reviewUserHandler"
        >
          确定
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sendDeleteReview, sendGetAllReviews, sendReviewUser } from '@/axios/api/reviews'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const keyWords = ref('')
const tableData = reactive({
  total: 0,
  pages: []
})
const review = reactive({
  text: '',
  id: ''
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
  if (res.code === 1) {
    tableData.pages = res.info.records
    tableData.total = res.info.total
  } else {
    ElMessage.error(res.msg)
  }
}
// 修改回复
const changReview = (row) => {
  dialogFormVisible.value = true
  review.id = row.id
  review.storeReview = row.storeReview
}
// 删除回复
const deleteStoreReview = (id) => {
  ElMessageBox.confirm(
    '确认删除该回复？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      const res = await sendDeleteReview(id)
      if (res.code === 1) {
        ElMessage.success('删除成功')
      } else {
        ElMessage.error(res.msg)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}
const reviewHandler = (row) => {
  dialogFormVisible.value = true
  review.id = row.id
}

const reviewUserHandler = async () => {
  const data = {
    productReviewsId: review.id,
    text: review.text
  }
  const res = await sendReviewUser(data)
  dialogFormVisible.value = false
  if (res.code === 1) {
    ElMessage.success(res.msg)
  } else {
    return ElMessage.error(res.msg)
  }
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
