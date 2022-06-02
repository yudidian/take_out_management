<template>
  <div class="header">
    <el-input
      v-model="keyWords"
      placeholder="请输入菜品名称"
      :suffix-icon="Search"
      @blur="emits('getKeyWords',keyWords)"
    />
    <ul>
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

const emits = defineEmits(['showDialog', 'getKeyWords'])
const keyWords = ref('')

const operationHandler = (type) => {
  console.log(type)
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
      &:nth-child(1){
        color: #6d75ee;
        border-right: 1px solid #5e5d5d;
      }
      &:nth-child(2){
        color: #e538e2;
        border-right: 1px solid #5e5d5d;
      }
      &:nth-child(3){
        color: #f81313;
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
