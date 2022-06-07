<template>
  <el-form
    :model="form"
    label-position="left"
  >
    <div class="el-form-item-first">
      <el-form-item
        label="菜品名称"
        class="is-required"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="菜品分类"
        class="is-required"
      >
        <el-select
          :model-value="categoryValue"
          placeholder="请选择菜品分类"
          @change="categoryChange"
        >
          <el-option
            v-for="item in setMealInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item
        label="添加套餐菜品种类"
        class="is-required item-dish"
      >
        <el-button
          type="primary"
          @click="showDish"
        >
          +添加菜品
        </el-button>
        <el-table
          :data="checkList"
        >
          <el-table-column
            label="名称"
            width="120"
            prop="name"
          />
          <el-table-column
            label="原价"
            width="120"
            prop="price"
          >
            <template #default="score">
              ￥ {{ (score.row.price / 100) }}
            </template>
          </el-table-column>
          <el-table-column
            label="份数"
            width="220"
            align="center"
          >
            <template #default="score">
              <el-input-number
                :min="1"
                :max="10"
                v-model="score.row.copies"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template #default>
              <el-button
                type="danger"
                text
                size="small"
                color="#ff8686"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </div>
    <el-form-item
      label="套餐价格"
      class="is-required"
    >
      <el-input-number
        v-model="form.price"
        :min="100"
        :max="100000"
      />
    </el-form-item>
    <el-form-item
      label="菜品图片"
      class="flavor-image is-required"
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
          v-if="imageUrl"
          :src="imageUrl"
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
    <el-form-item
      label="菜品描述"
      class="flavor-textArea is-required"
    >
      <el-input
        v-model="form.description"
        maxlength="200"
        placeholder="请输入菜品描述"
        show-word-limit
        type="textarea"
      />
    </el-form-item>
    <el-form-item class="footer">
      <!--      点击取消按钮 回到套餐信息页-->
      <el-button @click="$router.back()">
        取消
      </el-button>
      <el-button
        type="primary"
        @click="sendAddDish"
      >
        确定
      </el-button>
    </el-form-item>
  </el-form>
  <el-dialog
    v-model="dialogTableVisible"
    title="选择菜品"
  >
    <el-tabs
      tab-position="left"
      style="height: 200px"
      class="demo-tabs"
      @tab-change="tabChange"
    >
      <el-tab-pane
        :label="item.name"
        v-for="(item,index) in dishInfo"
        :key="index"
      >
        <el-checkbox-group v-model="checkListName">
          <el-checkbox
            v-for="value in item.checkList"
            :label="value.name"
            @change="checkboxHandler($event,value)"
            :key="value.id"
          />
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="checkboxCloseHandler">取消</el-button>
        <el-button
          type="primary"
          @click="checkboxConfirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getCategory, getDish, addSetmeal, getMealById, updateMeal } from '@/axios/api/setMeal'

const router = useRouter()
const route = useRoute()
const checkListName = ref([])
const checkList = ref([]) // 选择好的菜品
const dishInfo = ref([])
const setMealInfo = ref([]) // 套餐选项信息
const imageUrl = ref('') // 上传图片的地址
const store = useStore()
const categoryValue = ref('') // 套餐名称
const form = ref({
  image: '',
  description: '',
  price: 100,
  name: '',
  categoryId: '',
  setmealDishes: []
})// 需要收集的套餐信息
const dialogTableVisible = ref(false) // 对话框显示
onMounted(() => {
  sendCategory()
  if (route.query.id) {
    sendMealById(route.query.id)
  }
})
// 发送添加请求
const sendAddDish = async () => {
  let res
  if (route.query.id) {
    res = await updateMeal(form.value)
  } else {
    res = await addSetmeal(form.value)
  }
  if (res.code === 1) {
    router.back()
    ElMessage.success({
      message: res.msg
    })
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
// 获取选项框对应信息
const sendCategory = () => {
  Promise.all([getCategory(1), getCategory(2)]).then(res => {
    dishInfo.value = res[0].info
    setMealInfo.value = res[1].info
  })
}
// 图片上传成功
const handleAvatarSuccess = (response) => {
  form.value.image = response.msg
  imageUrl.value = `http://localhost:8080/download?fileName=${response.msg}`
}
// 图片上传之前
const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile.type)
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
// 展示菜品 对话框
const showDish = async () => {
  dialogTableVisible.value = true
  await getDishByCategoryId(dishInfo.value[0].id, 0)
}
// 套餐选项发生变化
const categoryChange = (val) => {
  categoryValue.value = setMealInfo.value.find(item => item.id === val).name
  form.value.categoryId = val
}
// 菜品多选框发生变化
const checkboxHandler = (value, info) => {
  info.dishId = info.id
  delete info.id
  info.copies = 1
  if (value) {
    checkList.value.push(info)
  } else {
    checkList.value.splice(checkList.value.findIndex(item => item === info), 1)
  }
}

// 取消菜品选择
const checkboxCloseHandler = () => {
  checkList.value = []
  checkListName.value = []
  form.value.setmealDishes = []
  dialogTableVisible.value = false
}
// 确定选择好的菜品
const checkboxConfirm = () => {
  form.value.setmealDishes = checkList.value
  dialogTableVisible.value = false
}
// 根据categoryId 获取对应的dish
const getDishByCategoryId = async (id, index) => {
  const res = await getDish({
    categoryId: id
  })
  dishInfo.value[index].checkList = res.info
}
// 选项卡发生变化
const tabChange = async (index) => {
  if (!dishInfo.value[index].checkList) {
    await getDishByCategoryId(dishInfo.value[index].id, index)
  }
}
// 修改套餐事发送数据获取对应数据
const sendMealById = async (id) => {
  const res = await getMealById(id)
  if (res.code === 1) {
    form.value = res.info
    checkList.value = res.info.setmealDishes
    checkListName.value = res.info.setmealDishes.map(item => item.name)
    categoryValue.value = res.info.categoryName
    imageUrl.value = `http://localhost:8080/download?fileName=${res.info.image}`
  }
}
</script>

<style scoped lang="scss">
.el-form{
  .el-form-item-first{
    display: flex;
    align-items: center;
  }
  .el-form-item{
    width: 427px;
    margin-right: 40px;
    padding-bottom:20px;
    :deep(.el-form-item__label){
      line-height: 40px;
      font-size: 14px;
      color: #818693;
    }
    .el-input{
      width: 400px;
      height: 40px;
    }
    .el-button{
      width: 120px;
      height: 40px;
      color: #2a2a2a;
    }
    :deep(.el-select){
      width: 200px;
      height: 40px;
      .el-input__wrapper{
        width: 200px;
        height: 38px;
      }
    }
  }
  :deep(.item-dish){
    width: 750px;
    .el-form-item__content{
      .el-table{
        border: 1px solid #ede7e7;
        margin-top: 20px;
      }
    }
  }
  :deep(.flavor-image){
    .avatar-uploader{
      width: 200px;
      height: 160px;
      border: 2px dashed #a1a1a1;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-upload{
        img{
          width: 204px;
          height: 164px;
        }
        .avatar-uploader-icon{
          font-size: 30px;
        }
      }
    }
  }
  .flavor-textArea{
    width: 750px;
  }
  .footer{
    width: 750px;
    :deep(.el-form-item__content){
      width: 100%;
      display: flex;
      justify-content: center;
      .el-button{
        margin: 0 40px;
      }
    }
  }
}
</style>
