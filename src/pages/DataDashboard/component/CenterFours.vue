<template>
  <div class="header">
    <div class="left">
      <img
        src="../image/left-3-logo.png"
        alt=""
      >
      <span class="name">利润增涨趋势</span>
    </div>
    <div class="right">
      <div class="top">
        <div class="color" />
        <div class="color-name">
          盈利
        </div>
      </div>
      <div class="bottom">
        <div class="color" />
        <div class="color-name">
          成本
        </div>
      </div>
    </div>
  </div>
  <div class="center-fours" />
</template>
<script name="CenterFours" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  const chartDom = document.querySelector('.center-fours')
  const myChart = echarts.init(chartDom)
  const option = {
    backgroundColor: 'transparent',
    color: ['#ff6d87', '#797dff'],
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
      bottom: '8%',
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
        name: '销售金额',
        type: 'line',
        stack: 'Total',
        smooth: false,
        symbolSize: 8,
        lineStyle: {
          width: 4
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
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
        name: '成本',
        type: 'line',
        stack: 'Total',
        smooth: false,
        symbolSize: 8,
        lineStyle: {
          width: 4
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.2,
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
      }
    ]
  }

  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

</script>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 47px;
  margin-top: 14px;
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
      margin-bottom: 5px;
      .color{
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 10px;
      }
    }
    .top{
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
.center-fours{
  width: 100%;
  height: 240px;
}
</style>
