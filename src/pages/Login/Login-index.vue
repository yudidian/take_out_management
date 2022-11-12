<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img
          src="@/assets/images/login/login_left.svg"
          alt="login"
        >
      </div>
      <div class="login-form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <div class="login-form-title">
            <img
              src="@/assets/logo.png"
              alt="考拉烘焙坊"
            >
          </div>
          <el-form-item prop="username">
            <el-input
              type="text"
              auto-complete="off"
              placeholder="账号"
              maxlength="20"
              v-model="loginForm.username"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              :prefix-icon="Unlock"
              v-model="loginForm.password"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm(loginFormRef)"
              color="#FFC000"
              class="login-btn"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { User, Unlock } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const loginFormRef = ref(null)
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度为5~10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度为5~10', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  loginForm.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch('toLogin', loginForm)
      loginForm.value = false
    } else {
      ElMessage({
        message: '请补全信息',
        type: 'warning'
      })
      loginForm.value = false
    }
  })
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
