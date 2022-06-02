<template>
  <Header
    @show-dialog="dialogFormVisible = $event"
    @get-key-words="keyWords = $event"
  />
  <el-table
    ref="multipleTableRef"
    :data="tableData.pages"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="40"
    />
    <el-table-column
      label="菜品名称"
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
          :src="`http://localhost:8080/download?fileName=${scope.row.image}`"
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
    />
    <el-table-column
      label="销售状态"
      prop="status"
    />
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
          @click="exitDishHandler(score.row.id)"
        >
          编辑
        </el-button>
        <el-button
          text
          size="small"
          type="warning"
          @click="forbiddenAndDeleteDishHandler(score.row.id, 'delete')"
        >
          删除
        </el-button>
        <el-button
          text
          size="small"
          type="danger"
          @click="forbiddenAndDeleteDishHandler(score.row.id, 'forbidden')"
        >
          禁用
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <MyPagination
    :get-info="getDishPage"
    :total="tableData.total"
    @get-page-message="tableData.pages = $event"
  />
  <el-dialog
    v-model="dialogFormVisible"
    :title="flag ? '编辑商品': '修改商品'"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
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
        />
      </el-form-item>
      <el-form-item
        label="菜品分类"
        :label-width="200"
      >
        <el-select
          :model-value="categoryValue"
          placeholder="请选择菜品分类"
          @change="categoryChange"
        >
          <el-option
            v-for="item in categoryInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="菜品价格"
        :label-width="200"
      >
        <el-input-number
          v-model="form.price"
          :min="1"
          :max="1000"
        />
      </el-form-item>
      <el-form-item
        label="口味做法配置"
        :label-width="200"
        class="item-flavor"
      >
        <ul class="flavor">
          <p v-if="selectFlavorData.length>0">
            口味名（3个字内）口味标签（输入标签回车添加）
          </p>
          <li
            v-for="(data,index) in selectFlavorData"
            :key="index"
          >
            <el-select
              class="m-2"
              placeholder="请选择口味"
              :model-value="data.name"
              @change="flavorChange($event,index)"
            >
              <el-option
                v-for="(item, flavorIndex) in dishFlavorsData"
                :key="flavorIndex"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <el-tag
              v-for="tag in data.value"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(tag,index)"
            >
              {{ tag }}
            </el-tag>
            <div
              class="handler-btn"
              v-show="data.value && data.value.length>0"
            >
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm(index)"
                @blur="handleInputConfirm(index)"
              />
              <el-button
                v-else
                class="ml-1"
                size="small"
                type="success"
                @click="showInput"
              >
                添加
              </el-button>
              <el-button
                class="delete-flavor"
                size="small"
                type="danger"
                @click="deleteFlavor(index)"
              >
                删除
              </el-button>
            </div>
          </li>
        </ul>
        <el-button
          type="primary"
          @click="showFlavor"
        >
          +添加口味
        </el-button>
      </el-form-item>
      <el-form-item
        label="菜品图片"
        :label-width="200"
        class="flavor-image"
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
        :label-width="200"
        class="flavor-textArea"
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
          @click="sendAddDish"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Header from './components/cuisine-header.vue'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { getCategoryInfo } from '@/axios/api/category'
import { addDish, getDishPage, getDishInfoById, updateDishInfo, deleteAndForbiddenDish } from '@/axios/api/dish'
import { v4 as uuidv4 } from 'uuid'
const store = useStore()
const keyWords = ref('')
const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref(null)
const imageUrl = ref('')
const tableData = ref({
  total: 0,
  pages: []
})
const flag = ref(false) // false为添加true为编辑
const dialogFormVisible = ref(false)
const categoryInfo = ref([])
const categoryValue = ref('')
const dishFlavorsData = [
  { name: '甜味', value: ['无糖', '少糖', '半糖', '多糖', '全糖'] },
  { name: '温度', value: ['热饮', '常温', '去冰', '少冰', '多冰'] },
  { name: '忌口', value: ['不要葱', '不要蒜', '不要香菜', '不要辣'] },
  { name: '辣度', value: ['不辣', '微辣', '中辣', '重辣'] }
] // 口味数据
const code = uuidv4()
const selectFlavorData = ref([])
const form = ref({
  name: '',
  categoryId: '',
  code,
  flavors: [],
  image: '',
  description: '',
  price: 0
})
onMounted(() => {
  sendCategoryInfo()
  sendDishPage()
})
watch(selectFlavorData.value, () => {
  form.value.flavors = selectFlavorData.value.map(item => {
    return {
      name: item.name,
      value: JSON.stringify(item.value)
    }
  })
})
// 选择框变化
const handleSelectionChange = () => {
  console.log()
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
// 点击口味关闭标签
const handleClose = (tag, index) => {
  const flag = selectFlavorData.value[index].value.findIndex(item => item === tag)
  selectFlavorData.value[index].value.splice(flag, 1)
}
// 添加标签
const handleInputConfirm = (index) => {
  selectFlavorData.value[index].value.push(inputValue.value)
  inputVisible.value = false
}
// 显示输入框
const showInput = () => {
  inputVisible.value = true
}
const showFlavor = () => {
  selectFlavorData.value.push({})
}
// 口味发生改变
const flavorChange = (value, index) => {
  const flavor = dishFlavorsData.find(item => {
    return item.name === value
  })
  selectFlavorData.value[index] = flavor
}
// 删除添加的口味
const deleteFlavor = (index) => {
  selectFlavorData.value.splice(index, 1)
}
// 获取分类列表
const sendCategoryInfo = async () => {
  const res = await getCategoryInfo()
  if (res.code === 1) {
    categoryInfo.value = res.info
  }
}
// 菜品选项列表发生变化
const categoryChange = (val) => {
  form.value.categoryId = val
  categoryValue.value = categoryInfo.value.find(item => item.id === val).name
}
// 发送添加请求
const sendAddDish = async () => {
  let res
  if (flag.value) {
    res = await updateDishInfo(form.value)
    flag.value = false
  } else {
    res = await addDish(form.value)
  }
  dialogFormVisible.value = false
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
    await sendDishPage()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
  form.value = {
    name: '',
    categoryId: '',
    code,
    flavors: [],
    image: '',
    description: '',
    price: 0
  }
  imageUrl.value = ''
  categoryValue.value = ''
  selectFlavorData.value = []
}
// 获取菜品信息页面
const sendDishPage = async () => {
  const res = await getDishPage({
    page: 1,
    pageSize: 10,
    name: keyWords.value
  })
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
    tableData.value.total = res.info.total
    tableData.value.pages = res.info.records
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
// 点击编辑按钮发送对应请求获取对应数据
const exitDishHandler = async (id) => {
  flag.value = true
  const res = await getDishInfoById(id)
  if (res.code === 1) {
    dialogFormVisible.value = true
    form.value = res.info
    categoryValue.value = res.info.categoryName
    imageUrl.value = `http://localhost:8080/download?fileName=${res.info.image}`
    selectFlavorData.value = res.info.flavors.map(item => {
      return {
        name: item.name,
        value: JSON.parse(item.value)
      }
    })
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
// 点击取消重置表单信息
const closeHandler = () => {
  dialogFormVisible.value = false
  flag.value = false
  form.value = {
    name: '',
    categoryId: '',
    code,
    flavors: [],
    image: '',
    description: '',
    price: 0
  }
  imageUrl.value = ''
  categoryValue.value = ''
  selectFlavorData.value = []
}
// 禁用商品
const forbiddenAndDeleteDishHandler = async (id, type) => {
  const res = await deleteAndForbiddenDish({
    id,
    type
  })
  if (res.code === 1) {
    ElMessage.success({
      message: res.msg
    })
    await sendDishPage()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
// 删除商品
</script>

<style scoped lang="scss">
.el-dialog {
  .el-form {
    .el-form-item {
      width: 300px;
    }

    :deep(.item-flavor) {
      display: flex;
      flex-direction: column;
      .el-form-item__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 720px;
        .flavor {
          p {
            color: red;
          }
          li{
            display: flex;
            align-items: center;
            width: 720px;
            padding: 10px 5px;
            border: 1px solid #e7e5e5;
            margin-bottom: 10px;
            .el-tag{
              margin-left: 10px;
            }
            .el-button{
              margin-left: 10px;
            }
          }
        }
      }
    }
    :deep(.flavor-image){
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
    }
    .flavor-textArea{
      width: 720px;
    }
  }
}
</style>
