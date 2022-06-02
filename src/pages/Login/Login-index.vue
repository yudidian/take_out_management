<template>
  <div
    class="login"
    id="login-app"
  >
    <div class="login-box">
      <img
        src="@/assets/images/login/login.jpg"
        alt=""
      >
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
  .login-box {
    width: 1000px;
    height: 474px;
    border-radius: 8px;
    display: flex;
    img {
      width: 60%;
      height: auto;
    }
    .login-form {
      background: #ffffff;
      width: 40%;
      border-radius: 0px 8px 8px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-form-title{
        text-align: center;
      }
      .el-form {
        width: 214px;
        height: 307px;
        .login-form-title{
          width: 180px;
          height: 84px;
          img{
            width: 100%;
            height: 84px;
          }
        }
        .el-form-item {
          margin-top: 30px;
          margin-bottom: 30px;
          :deep(.el-form-item__content){
            justify-content: center;
            .login-btn{
              width: 180px;
              height: 36px;
              border-radius: 30px;
              justify-self: center;
            }
          }
          :deep(.el-input__wrapper){
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
