<template>
  <div class="header">
    <el-input
      v-model="keyWords"
      :placeholder="inputText"
      :suffix-icon="Search"
      @blur="emits('getKeyWords',keyWords)"
    />
    <ul v-if="isShowBulk">
      <li @click="operationHandler(1)">
        批量删除
      </li>
      <li @click="operationHandler(2)">
        批量启售
      </li>
      <li @click="operationHandler(3)">
        批量停售
      </li>
    </ul>
    <el-button
      v-if="isShowBulk"
      type="primary"
      @click="emits('showDialog',true)"
    >
      +添加菜品
    </el-button>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const emits = defineEmits(['showDialog', 'getKeyWords', 'listHandler'])
const keyWords = ref('')
defineProps({
  isShowBulk: {
    type: Boolean,
    default: true
  },
  inputText: {
    type: String,
    default: '请输入菜品名称'
  }
})
const operationHandler = (type) => {
  emits('listHandler', type)
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  align-items: center;
  border-color: red;
  height: 60px;
  .el-input{
    width: 260px;
    height: 40px;
  }
  ul{
    width: 340px;
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: space-between;
    li{
      width: 94px;
      font-size: 19px;
      font-weight: 600;
      border-color: #6d75ee;
      cursor: pointer;
      &:nth-child(1){
        color: var(--dhy-header-font-color-1);
        border-right: 1px solid #5e5d5d;
      }
      &:nth-child(2){
        color: var(--dhy-header-font-color-2);
        border-right: 1px solid #5e5d5d;
      }
      &:nth-child(3){
        color: var(--dhy-header-font-color-3);
        margin-right: 10px;
      }
    }
  }
  .el-button{
    width: 120px;
    color: #2a2a2a;
  }
}
</style>
