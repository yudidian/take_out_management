<template>
  <el-page-header
    :icon="ArrowLeft"
    @back="$router.back()"
  />
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item
      label="账号"
      label-width="120px"
      style="max-width: 360px"
      prop="username"
    >
      <el-input v-model="form.username" />
    </el-form-item>
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
          :value="0"
        />
        <el-radio
          label="女"
          :value="1"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="身份证号"
      label-width="120px"
      style="max-width: 360px"
      prop="idNumber"
    >
      <el-input v-model="form.idNumber" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { addEmployee } from '@/axios/api/employee'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const ruleFormRef = ref(null)
const form = reactive({
  name: '',
  username: '',
  phone: '',
  sex: '男',
  idNumber: ''
}) // 表单数据
const checkUsername = (rule, value, callback) => {
  if (value.trim().length <= 0) {
    callback(new Error('用户账号是必需的'))
  } else if (!(/^[a-z]{2,20}$/.test(value))) {
    callback(new Error('用户账号只能有小写字母和数字组成且长度为2到20位'))
  } else {
    callback()
  }
} // 校验用户名
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
    { min: 2, max: 10, message: '用户名长度为2到10', trigger: 'blur' }
  ],
  username: [
    { required: true },
    { validator: checkUsername, trigger: 'blur' }
  ],
  phone: [
    { required: true },
    { validator: checkPhone, trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  idNumber: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { min: 18, max: 18, message: '请输入身份证号', trigger: 'blur' }
  ]
})
const submitForm = async (ruleFormRef) => {
  if (!ruleFormRef) return
  await ruleFormRef.validate(async (valid) => {
    if (valid) {
      const res = await addEmployee(form)
      res.code === 1 && ElMessage.success({
        message: res.msg
      })
      res.code !== 1 && ElMessage.error({
        message: res.msg
      })
      router.back()
    } else {
      ElMessage.error({
        message: '请补全表单'
      })
    }
  })
}
const resetForm = (ruleFormRef) => {}
</script>
<style scoped lang="scss">
.el-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  padding-top: 20px;

  .el-form-item {
    width: 380px;
    height: 80px;

    :deep(.el-radio) {
      .el-radio__input.is-checked .el-radio__inner {
        border-color: #e5e5e5;
        background: #FFC200;
      }

      .el-radio__inner:hover {
        border-color: #FFC200;
      }

      .el-radio__label {
        color: #FFC200;
      }
    }
  }
}
</style>
