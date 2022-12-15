<template>
  <div>
    <div class="header">
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
      >
        添加轮播图
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="sort"
        label="排序编号"
        width="180"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
        align="center"
      />
      <el-table-column
        prop="createUser"
        label="添加人"
        align="center"
      />
      <el-table-column
        prop="imageUrl"
        label="图片"
        align="center"
      >
        <template #default="socpe">
          <el-image
            style="width: 100px; height: 100px"
            :src="IMG_URL + socpe.row.imageUrl"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form
        ref="SwiperForm"
        class="form-content"
        :model="form"
        label-position="left"
      >
        <el-form-item
          :label-width="100"
          label="播放顺序"
          prop="sort"
          :rules="[
            { required: true, message: 'age is required',trigger: 'blur' },
          ]"
        >
          <el-input-number
            v-model="form.sort"
            :controls="false"
          />
        </el-form-item>
        <el-form-item
          label="菜品图片"
          :label-width="100"
          class="flavor-image"
          prop="imageUrl"
          :rules="[
            { required: true, message: 'age is required',trigger: 'blur' },
          ]"
        >
          <el-upload
            class="avatar-uploader"
            action="api/upload"
            :headers="{token: store.getters.token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.imageUrl !== ''"
              :src="IMG_URL + form.imageUrl"
              class="avatar"
            >
            <el-icon
              v-else
              class="avatar-uploader-icon"
            >
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitSwiper(SwiperForm)"
            style="margin-left: auto"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script name="SwiperManager" setup>
import { onMounted, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { sendAddSwiperList, sendDeleteSwiperList, sendGetSwiperList } from '@/axios/api/dish'
import { errorTip, okTip } from '@/utils/messageTip'
import { confirmTip } from '@/utils/confirmTip'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const SwiperForm = ref()
const store = useStore()
const dialogFormVisible = ref(false)
const tableData = ref([])
const form = reactive({
  imageUrl: '',
  sort: 0
})
onMounted(() => {
  getSwiperList()
})
// 图片上传成功
const handleAvatarSuccess = (response) => {
  form.imageUrl = response.msg
}
// 图片上传之前
const beforeAvatarUpload = (rawFile) => {
  const image = ['image/png', 'image/jpeg']
  const index = image.findIndex(item => {
    return item === rawFile.type
  })
  if (index === -1) {
    ElMessage.error('请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片最大为2MB!')
    return false
  }
  return true
}
const submitSwiper = async (el) => {
  if (!el) return
  await el.validate(async (valid, fields) => {
    if (valid) {
      const res = await sendAddSwiperList(form)
      if (res.code === 1) {
        form.imageUrl = ''
        form.sort = 0
        okTip(res.msg)
        await getSwiperList()
      }
      dialogFormVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
const getSwiperList = async () => {
  const res = await sendGetSwiperList()
  if (res.code === 1) {
    tableData.value = res.info
  } else {
    errorTip(res.msg)
  }
}
const handleDelete = (index, row) => {
  confirmTip('确定要删除吗？', '提示', async () => {
    const res = await sendDeleteSwiperList(row.id)
    if (res.code === 1) {
      tableData.value.splice(index, 1)
      okTip('删除成功')
    } else {
      errorTip(res.msg)
    }
  }, () => {})
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  justify-content: flex-end;
}
.form-content{
  width: 90%;
  margin: 0 auto;
  border: 1px #bebebe dotted;
  padding: 10px;
}
.avatar-uploader{
  width: 160px;
  height: 160px;
  border: 1px dashed #e7e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-upload{
    img{
      width: 160px;
      height: 160px;
    }
    .avatar-uploader-icon{
      font-size: 40px;
    }
  }
}
</style>
