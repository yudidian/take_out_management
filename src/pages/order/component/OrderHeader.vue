<template>
  <div class="header">
    <el-select
      v-model="keyWords"
      class="m-2"
      placeholder="请选择"
      @change="$emit('getKeyWords',keyWords)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['getKeyWords'])
const options = [
  {
    value: '0',
    label: '全部'
  },
  {
    value: '2',
    label: '带出餐'
  },
  {
    value: '3',
    label: '已出餐'
  },
  {
    value: '4',
    label: '已完成'
  }
]
const keyWords = ref('0')
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
