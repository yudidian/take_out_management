<template>
  <div class="header">
    <div class="left">
      <img
        src="../image/left-3-logo.png"
        alt=""
      >
      <span class="name">菜品销售趋势</span>
    </div>
    <div class="right">
      <div class="top">
        <div class="color" />
        <div class="color-name">
          进场
        </div>
      </div>
      <div class="bottom">
        <div class="color" />
        <div class="color-name">
          离场
        </div>
      </div>
    </div>
  </div>
  <div class="left-three" />
</template>

<script name="LeftThree" setup>
import * as echarts from 'echarts'
import { onMounted, shallowRef } from 'vue'
const myChart = shallowRef(null)
onMounted(() => {
  const chartDom = document.querySelector('.left-three')
  myChart.value = echarts.init(chartDom)
  const option = {
    color: ['#ff6d87', '#797dff', '#0599f5', '#05f5d9'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#35394B',
      borderWidth: 0,
      textStyle: {
        color: '#8c98bf'
      },
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '第一',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 109, 135)'
            },
            {
              offset: 1,
              color: 'rgb(250,84,192)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: '第二',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(121, 155, 255)'
            },
            {
              offset: 1,
              color: 'rgb(47,97,248)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: '第三',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: '第四',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      }
    ]
  }
  option && myChart.value.setOption(option)
})
defineExpose({
  myChart
})
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 47px;
  margin-top: 16px;
  margin-left: -2px;
  display: flex;
  .left{
    display: flex;
    align-items: center;
    img{
      width: 30px;
    }
    .name {
      color: #fffdef;
      font-weight: 900;
      font-size: 20px;
      margin-left: 8px;
    }
  }
  .right{
    margin-left: auto;
    width: 120px;
    display: flex;
    margin-top: -36px;
    flex-direction: column;
    .top,.bottom {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #8c98bf;
      .color{
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 10px;
      }
    }
    .top{
      margin-bottom: 10px;
      .color {
        background-color: #ff6d87;
      }
    }
    .bottom{
      .color{
        background-color: #797dff;
      }
    }
  }
}
.left-three{
  width: 100%;
  height: 240px;
}
</style>
