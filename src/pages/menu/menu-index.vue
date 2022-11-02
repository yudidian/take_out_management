<template>
  <MyHeader
    @show-dialog="$router.push('/menu/add')"
    @get-key-words="searchHandler"
    @list-handler="listHandler"
  />
  <el-table
    ref="multipleTableRef"
    :data="tableData.pages"
    style="width: 100%"
    @select="handleSelectionChange"
    v-loading="tableData.pages.length<=0"
  >
    <el-table-column
      type="selection"
      width="40"
    />
    <el-table-column
      label="套餐名称"
      width="120"
      prop="name"
    />
    <el-table-column
      label="图片"
      width="140"
    >
      <template #default="scope">
        <el-avatar
          shape="square"
          :size="100"
          fit="fill"
          :src="IMG_URL + scope.row.image"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="菜品分类"
      prop="categoryName"
    />
    <el-table-column
      label="售价"
      prop="price"
    >
      <template #default="score">
        ￥ {{ (score.row.price / 100) }}
      </template>
    </el-table-column>
    <el-table-column
      label="销售状态"
      prop="status"
    >
      <template #default="scope">
        <span>{{ scope.row.status === 1 ? '销售中' : '停售' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后操作时间"
      property="updateTime"
    />
    <el-table-column
      label="操作"
    >
      <template #default="score">
        <el-button
          text
          size="small"
          type="primary"
          @click="updateMeal(score.row.id)"
        >
          编辑
        </el-button>
        <el-button
          text
          size="small"
          type="warning"
          @click="deleteMealHandler([score.row.id])"
        >
          删除
        </el-button>
        <el-button
          text
          size="small"
          type="danger"
          @click="forbiddenMealHandler([score.row.id],score.row.status)"
        >
          {{ score.row.status === 1 ? '禁用': '启用' }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getPageInfo"
    :total="tableData.total"
    @get-page-message="tableData.pages = $event"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getPageInfo, deleteMeal, forbiddenMeal } from '@/axios/api/setMeal'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const router = useRouter()
const listId = ref([])
const keyWords = ref('')
const tableData = ref({
  total: 0,
  pages: []
})
onMounted(() => {
  sendPage()
})
// 批量操作
const listHandler = async (type) => {
  switch (type) {
    case 1 : {
      await deleteMealHandler(listId.value)
      break
    }
    case 2 : {
      await forbiddenMealHandler(listId.value, 0)
      break
    }
    case 3 : {
      await forbiddenMealHandler(listId.value, 1)
      break
    }
  }
}
const handleSelectionChange = (list) => {
  listId.value = list.map(item => item.id)
}
const sendPage = async () => {
  const res = await getPageInfo({
    page: 1,
    pageSize: 10,
    name: keyWords.value
  })
  if (res.code === 1) {
    tableData.value.total = res.info.total
    tableData.value.pages = res.info.records
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
// 编辑套餐
const updateMeal = (id) => {
  router.push(`/menu/add?id=${id}`)
}
// 删除套餐
const deleteMealHandler = async (id) => {
  const res = await deleteMeal({
    ids: id
  })
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
  await sendPage()
}
// 禁用或启用套餐
const forbiddenMealHandler = async (id, status) => {
  const res = await forbiddenMeal({
    ids: id,
    status: status === 0 ? 1 : 0
  })
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
  await sendPage()
}
// 搜索功能
const searchHandler = async (val) => {
  keyWords.value = val
  await sendPage()
}
</script>

<style scoped>

</style>
