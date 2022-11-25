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
    @select="handleSelectionChange"
    v-loading="tableData.pages.length<=0"
  >
    <el-table-column
      type="selection"
      width="40"
      align="center"
    />
    <el-table-column
      label="菜品名称"
      width="120"
      align="center"
      prop="name"
    />
    <el-table-column
      label="图片"
      width="140"
      align="center"
    >
      <template #default="scope">
        <div class="table-image">
          <MyImage
            :src="IMG_URL+scope.row.image"
            fit="cover"
            :src-list="[IMG_URL+scope.row.image]"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="菜品描述"
      prop="description"
      width="240"
      align="center"
    />
    <el-table-column
      label="主料"
      prop="mainMaterial"
      align="center"
    />
    <el-table-column
      label="制作方式"
      align="center"
      prop="productionMethod"
    />
    <el-table-column
      label="分量"
      prop="count"
      align="center"
    />
    <el-table-column
      label="口味"
      prop="taste"
      align="center"
    />
    <el-table-column
      label="操作"
      align="center"
    >
      <template #default="score">
        <el-button
          text
          size="small"
          type="primary"
          @click="exitDishHandler(score.row)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getDishDescription"
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
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :inline="true"
      :model="form"
      label-position="top"
    >
      <el-form-item
        label="菜品名称"
        label-width="200px"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="主料"
        label-width="200px"
        prop="mainMaterial"
      >
        <el-input
          v-model="form.mainMaterial"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="分量"
        label-width="200px"
        prop="count"
      >
        <el-input-number
          v-model="form.count"
          autocomplete="off"
          :min="1"
          :max="100"
        />
      </el-form-item>
      <el-form-item
        label="制作方式"
        label-width="200px"
        prop="productionMethod"
      >
        <el-input
          v-model="form.productionMethod"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="口味"
        label-width="200px"
        prop="taste"
      >
        <el-input
          v-model="form.taste"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="菜品描述"
        :label-width="200"
        class="flavor-textArea"
        prop="description"
      >
        <el-input
          v-model="form.description"
          maxlength="200"
          placeholder="请输入菜品描述"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeHandler">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { sendGetDishDescription, sendChangeDishDescription } from '@/axios/api/dish'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const keyWords = ref('')
const ruleFormRef = ref(null)
const tableData = reactive({
  total: 0,
  pages: []
})
const listId = ref([])
const dialogFormVisible = ref(false)
const form = ref({
  name: '',
  taste: '',
  productionMethod: '',
  mainMaterial: '',
  description: '',
  count: 0
})
const rules = reactive({
  taste: [
    {
      required: true, message: '请填写口味', trigger: 'blur'
    }
  ],
  productionMethod: [
    {
      required: true, message: '请填写制作方式', trigger: 'blur'
    }
  ],
  mainMaterial: [
    {
      required: true, message: '请填写主要原料', trigger: 'blur'
    }
  ],
  description: [
    {
      required: true, message: '请填写描述内容', trigger: 'blur'
    }
  ],
  count: [
    {
      required: true, message: '请填写数量', trigger: 'blur'
    }
  ]
})
onMounted(() => {
  getDishDescription()
})
// 点击确定
const submitForm = async () => {
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await sendChangeDishDescription(form.value)
      if (res.code === 1) {
        await getDishDescription()
        dialogFormVisible.value = false
      } else {
        ElMessage.error(res.msg)
      }
    }
  })
}
// 点击取消重置表单信息
const closeHandler = () => {
  dialogFormVisible.value = false
  form.value = {
    name: '',
    taste: '',
    productionMethod: '',
    mainMaterial: '',
    description: '',
    count: 0
  }
}
// 点击编辑
const exitDishHandler = async (row) => {
  dialogFormVisible.value = true
  form.value = { ...row }
}
// 选择框变化
const handleSelectionChange = (selection) => {
  selection.forEach(item => {
    listId.value.push(item.id)
  })
}
// 获取分类列表
const getDishDescription = async (page = 1, pageSize = 10, name = null) => {
  const res = await sendGetDishDescription({
    page,
    pageSize,
    name
  })
  if (res.code === 1) {
    tableData.total = res.info.total
    tableData.pages = res.info.records
  } else {
    ElMessage.error(res.msg)
  }
}
// 搜索功能
const searchHandler = async (val) => {
  keyWords.value = val
  await getDishDescription()
}
</script>

<style scoped lang="scss">
.table-image{
  width: 140px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
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
