<template>
  <div class="header">
    <el-button
      @click="dialogFormVisible = true"
      type="primary"
    >
      +新增菜品或套餐分类
    </el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column
      prop="name"
      label="分类名称"
      width="180"
    />
    <el-table-column
      prop="type"
      label="分类类型"
      width="180"
    >
      <template #default="scope">
        <span>{{ scope.row.type == '1' ? '菜品分类': '套餐分类' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="操作时间"
    />
    <el-table-column
      prop="sort"
      label="排序"
    />
    <el-table-column
      prop="address"
      label="操作"
    >
      <template #default="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getPageInfo"
    :total="total"
    @get-page-message="tableData = $event"
  />
  <el-dialog
    v-model="dialogFormVisible"
    title="新增菜品或套餐分类"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="top"
    >
      <el-form-item
        label="菜品或套餐名称"
        :label-width="360"
        prop="name"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="选择添加类型"
        :label-width="360"
        prop="type"
      >
        <el-select
          v-model="form.type"
          placeholder="类型选择"
        >
          <el-option
            label="菜品添加"
            value="1"
          />
          <el-option
            label="套餐添加"
            value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="菜品或套餐排序"
        :label-width="360"
        prop="sort"
      >
        <el-input
          v-model="form.sort"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="exitForm">取消</el-button>
        <el-button
          type="primary"
          @click="sendForm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getPageInfo, addCategory, deleteCategory } from '@/axios/api/category'
import { ElMessage } from 'element-plus'
import { updateCategory } from '../../axios/api/category'
const tableData = ref([])
const loading = ref(true)
const total = ref(0)
const formRef = ref(null)
const dialogFormVisible = ref(false)
const form = ref({
  name: '',
  type: '',
  sort: '',
  id: ''
})
onMounted(() => {
  sendPageInfo()
})
const rules = reactive({
  name: [
    { required: true, message: '菜品或套餐名是必填的', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名长度为3到10', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '类型是必填的', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请选排序大小', trigger: 'blur' }
  ]
})
const sendPageInfo = async () => {
  const res = await getPageInfo({
    page: 1,
    pageSize: 10
  })
  if (res.code === 1) {
    tableData.value = res.info.records
    total.value = res.info.total
    loading.value = false
  } else {
    ElMessage.error({
      message: res.msg
    })
    loading.value = false
  }
}
const handleEdit = (info) => {
  dialogFormVisible.value = true
  form.value = {
    name: info.name,
    type: info.type,
    sort: info.sort,
    id: info.id
  }
}
const handleDelete = async (id) => {
  const res = await deleteCategory(id)
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
    await sendPageInfo()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
const exitForm = () => {
  dialogFormVisible.value = false
  form.value = {
    name: '',
    type: '',
    sort: '',
    id: ''
  }
}
const sendForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      let res
      if (form.value.id === '') {
        res = await addCategory({
          name: form.value.name,
          type: form.value.type,
          sort: form.value.sort
        })
      } else {
        res = await updateCategory({ ...form.value })
      }
      if (res.code === 1) {
        ElMessage.success({
          message: res.msg
        })
        form.value = {
          name: '',
          type: '',
          sort: ''
        }
        dialogFormVisible.value = false
        await sendPageInfo()
      } else {
        ElMessage.warning({
          message: res.msg
        })
        dialogFormVisible.value = false
      }
    } else {
      ElMessage.error({
        message: '请补全表单信息'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.header{
  margin-bottom: 20px;
  .el-button{
    height: 40px;
  }
}
.el-form-item{
  width: 360px;
}
</style>
