<template>
  <div class="left-1-header">
    <div class="header-image">
      <img
        src="../image/left-1-logo.png"
        alt=""
      >
    </div>
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
import { onMounted, shallowRef } from 'vue'
defineProps({
  leftOne: {
    type: Object,
    required: true
  }
})
const myEcharts = shallowRef(null)
const setLeft1 = () => {
  myEcharts.value = echarts.init(document.querySelector('#left_1_echarts'))
  myEcharts.value.setOption({
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
defineExpose({
  myChart: myEcharts
})
</script>

<style scoped lang="scss">

.left-1-header {
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .header-image {
    position: absolute;
    top: 26px;
    left: vw(25);
    width: vw(30);
    height: 30px;
    img{
      width: 100%;
      object-position: center;
    }
  }

  .title {
    position: absolute;
    top: 29px;
    left: vw(62);
    overflow: unset;
    font-size: font(16);
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
      margin-left: vw(20);
      font-size: font(14);
      font-weight: 600;
      color: #BCC9D4;
    }
    .user-count{
      margin-top: 10px;
      color: #ffffff;
      margin-left: vw(20);
      font-weight: 900;
      font-size: font(46);
    }
  }
  .right{
    flex: 1;
    height: 140px;
  }
}
</style>
