<template>
  <div class="admin">
    <div class="admin-header">
      <el-input
        v-model="keyWords"
        placeholder="请员工姓名"
        :prefix-icon="Search"
        @keyup.enter="handlerSearch"
      />
      <el-button
        type="primary"
        :icon="Plus"
        @click="$router.push('/admin/add')"
      >
        添加新员工
      </el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="tableData.length<=0"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="员工姓名"
        width="180"
      />
      <el-table-column
        prop="username"
        label="账号"
        width="180"
      />
      <el-table-column
        prop="phone"
        label="手机号"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="180"
      />
      <el-table-column
        prop="status"
        label="账号状态"
      >
        <template #default="scope">
          <span>{{ scope.row.status === 1 ? '正常' : '停用' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
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
            @click="handleStop(scope.row)"
          >
            {{ scope.row.status === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="permissionHandler(scope.row)"
          >
            权限编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[1, 2, 3, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    :destroy-on-close="true"
    title="修改员工信息"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      label-position="top"
    >
      <el-form-item
        label="员工姓名"
        label-width="120px"
        style="max-width: 360px"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="手机号"
        label-width="120px"
        style="max-width: 360px"
        prop="phone"
      >
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex"
      >
        <el-radio-group v-model="form.sex">
          <el-radio
            label="男"
          />
          <el-radio
            label="女"
          />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >取消</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="permissionInfo.showAddPermission"
    :destroy-on-close="true"
    title="修改员工信息"
  >
    <AddPermission
      :permission-list="permissionInfo.permissionList"
      @close-dialog="permissionInfo.showAddPermission = $event"
      :id="permissionInfo.permissionId"
    />
  </el-dialog>
</template>

<script setup>
import {
  Search,
  Plus
} from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { employeeInfo, updateEmployee } from '@/axios/api/employee'
import { ElMessage } from 'element-plus'
import AddPermission from './child/AddPermission.vue'
import { checkPermission, PERMISSION } from '@/router/PermissionRouter'
import { errorTip } from '@/utils/messageTip'
const keyWords = ref('')// 搜索关键词
const tableData = ref([])// 表数据
const pageSize = ref(100) // 每一页的大小
const currentPage = ref(1) // 当前页号
const total = ref(0) // 获取数据总条数
const permissionInfo = reactive({
  showAddPermission: false,
  permissionList: [],
  permissionId: ''
})
const getEmployeeInfo = async () => {
  const res = await employeeInfo({
    page: currentPage.value,
    pageSize: pageSize.value,
    name: keyWords.value
  })
  if (res.code === 1) {
    tableData.value = res.info.records
    total.value = res.info.total
  }
} // 获取用户列表数据
const dialogFormVisible = ref(false)
const ruleFormRef = ref(null)
const form = reactive({
  name: '',
  phone: '',
  sex: 0,
  id: ''
})
onMounted(() => {
  getEmployeeInfo()
})
const handleSizeChange = (val) => {
  pageSize.value = val
  getEmployeeInfo()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  getEmployeeInfo()
}
const handleEdit = (info) => {
  dialogFormVisible.value = true
  form.name = info.name
  form.sex = info.sex
  form.phone = info.phone
  form.id = info.id
}
const handleStop = async (info) => {
  if (!checkPermission(PERMISSION.FORBIDDEN_USER)) return errorTip('无权限')
  await updateEmployee({
    id: info.id,
    status: 0
  })
  await getEmployeeInfo()
}
const handlerSearch = async () => {
  await getEmployeeInfo()
}
const checkPhone = (rule, value, callback) => {
  if (value.trim().length <= 0) {
    callback(new Error('用户账号是必需的'))
  } else if (!(/^(131|158|147|151)[0-9]{8}$/.test(value))) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
} // 校验手机号
// 总的校验规则
const rules = reactive({
  name: [
    { required: true, message: '用户名是必填的', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名长度为3到10', trigger: 'blur' }
  ],
  phone: [
    { required: true },
    { validator: checkPhone, trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ]
})
const submitForm = async (ruleFormRef) => {
  if (!ruleFormRef) return
  await ruleFormRef.validate(async (valid) => {
    if (valid) {
      const res = await updateEmployee(form)
      res.code === 1 && ElMessage.success({
        message: res.msg
      })
      res.code !== 1 && ElMessage.error({
        message: res.msg
      })
      dialogFormVisible.value = false
      await getEmployeeInfo()
    } else {
      ElMessage.error({
        message: '请补全表单'
      })
      dialogFormVisible.value = false
    }
  })
}
const permissionHandler = (row) => {
  if (!checkPermission(PERMISSION.ADD_USER_PERMISSION)) return errorTip('无权限')
  permissionInfo.permissionId = row.id
  permissionInfo.permissionList = row.permission.split(',')
  permissionInfo.showAddPermission = true
}
</script>

<style scoped lang="scss">
.admin {
  .admin-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;

    .el-input {
      width: 260px;
      height: 45px;
      margin-right: 20px;
    }

    .el-button {
      width: 160px;
      height: 45px;
      margin-left: auto;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
