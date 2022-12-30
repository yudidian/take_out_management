<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    label-position="top"
    status-icon
  >
    <el-form-item
      label="权限修改"
      prop="type"
    >
      <el-checkbox
        v-for="item in ruleForm.type"
        :key="item.id"
        :label="item.desp"
        v-model="item.type"
      />
    </el-form-item>
    <el-form-item class="item-btn">
      <el-button
        type="primary"
        size="small"
        @click="submitForm(ruleFormRef)"
      >
        提交
      </el-button>
      <el-button
        @click="resetForm(ruleFormRef)"
        size="small"
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup name="AddPermission">
import { reactive, ref } from 'vue'
import { getPermissionType } from '@/router/PermissionRouter'
import { updatePermission } from '@/axios/api/employee'
import { errorTip, okTip } from '@/utils/messageTip'
const props = defineProps({
  permissionList: {
    type: Array,
    default: () => []
  },
  id: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['closeDialog'])
const ruleFormRef = ref()
const ruleForm = reactive({
  type: getPermissionType(props.permissionList)
})
const rules = reactive({
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const permissionList = []
      for (const typeElement of ruleForm.type) {
        if (typeElement.type) {
          permissionList.push(typeElement.id)
        }
      }
      const permissionStr = permissionList.join(',')
      const res = await updatePermission({
        id: props.id,
        permission: permissionStr
      })
      emits('closeDialog', false)
      if (res.code === 1) {
        const permission = res.info.permission
        localStorage.setItem('permission', permission)
        window.location.reload()
        okTip(res.msg)
      } else {
        errorTip(res.msg)
      }
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="scss">
:deep(.item-btn) {
  margin-top: 10%;
  display: flex;
  .el-form-item__content{
    padding-right: 20px;
    justify-content: flex-end;
  }
}
</style>
