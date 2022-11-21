<template>
  <div class="left-1-header">
    <img
      src="../image/left-1-logo.png"
      alt=""
    >
    <span class="title">
      数据概览
    </span>
  </div>
  <div class="left-1-wrapper">
    <div class="left">
      <span class="user-title">小店总用户</span>
      <span class="user-count">{{ leftOne.allCount }}</span>
    </div>
    <div
      class="right"
      id="left_1_echarts"
    />
  </div>
</template>

<script setup name="LeftOne">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
defineProps({
  leftOne: {
    type: Object,
    required: true
  }
})
const setLeft1 = () => {
  const myEcharts = echarts.init(document.querySelector('#left_1_echarts'))
  myEcharts.setOption({
    grid: {
      top: 10,
      bottom: 40
    },
    xAxis: {
      show: true,
      type: 'category',
      data: ['一', '三', '五', '七', '九', '十一']
    },
    tooltip: {
      show: true
    },
    yAxis: {
      show: true,
      type: 'value',
      max: 100
    },
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#9B75FF' // 0% 处的颜色
      }, {
        offset: 1, color: '#FF6B85' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    series: [
      {
        data: [8, 48, 88, 20, 40, 60],
        type: 'line',
        symbolSize: (vale, params) => {
          if (vale === 60) {
            return 8
          } else {
            return 0
          }
        },
        smooth: true,
        clip: false,
        lineStyle: {
          width: 5,
          cap: 'round'
        }
      }
    ]
  })
}
onMounted(() => {
  setLeft1()
})
</script>

<style scoped lang="scss">
.left-1-header {
  width: 100%;
  height: 50px;
  position: relative;

  img {
    position: absolute;
    top: 25px;
    left: 25px;
    width: 30px;
    height: 30px;
  }

  .title {
    position: absolute;
    top: 29px;
    left: 62px;
    overflow: unset;
    font-size: 16px;
    text-overflow: unset;
    white-space: unset;
    color: rgb(255, 255, 255);
    background-image: none;
    background-clip: unset;
    font-weight: 900;
  }
}
.left-1-wrapper{
  width: 100%;
  display: flex;
  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    .user-title{
      margin-top: 30px;
      margin-left: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #BCC9D4;
    }
    .user-count{
      margin-top: 10px;
      color: #ffffff;
      margin-left: 20px;
      font-weight: 900;
      font-size: 46px;
    }
  }
  .right{
    flex: 1;
    height: 140px;
  }
}
</style>
