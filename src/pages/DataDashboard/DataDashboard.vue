<template>
  <div class="data-content">
    <div class="content-left">
      <div class="left-1">
        <div class="left-1-header">
          <img
            src="./image/left-1-logo.png"
            alt=""
          >
          <span class="title">
            数据概览
          </span>
        </div>
        <div class="left-1-wrapper">
          <div class="left">
            <span class="user-title">小店总用户</span>
            <span class="user-count">78,518</span>
          </div>
          <div
            class="right"
            id="left_1_echarts"
          />
        </div>
      </div>
      <div class="left-2">
        123
      </div>
      <div class="left-3">
        123
      </div>
    </div>
    <div class="content-center">
      <div class="center-1">
        123
      </div>
      <div class="center-2">
        <div class="center-2-1">
          123
        </div>
        <div class="center-2-2">
          123
        </div>
        <div class="center-2-3">
          123
        </div>
      </div>
      <div class="center-3">
        123000
      </div>
      <div class="center-4">
        123
      </div>
    </div>
    <div class="content-right">
      <div class="right-1">
        123
      </div>
      <div class="right-2">
        123
      </div>
    </div>
  </div>
</template>

<script setup name="DataDashboard">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
const setLeft1 = () => {
  const myEcharts = echarts.init(document.querySelector('#left_1_echarts'))
  myEcharts.setOption({
    grid: {
      top: 120
    },
    xAxis: {
      show: false,
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      show: false,
      type: 'value',
      max: 140
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
        data: [8, 48, 88, 3, 120, 130, 1],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 5
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
.data-content{
  width: 100%;
  background-image: none;
  background-color: rgb(42, 45, 60);
  transform: scale(1);
  transform-origin: left top;
  background-size: 100%;
  display: flex;
  .content-left{
    width: 519px;
    .left-1{
      width: 519px;
      height: 200px;
      border-radius: 20px;
      background: url("./image/left-1.png") no-repeat;
      background-size: cover;
      margin-bottom: 20px;
      &-header{
        width: 100%;
        height: 50px;
        position: relative;
        img{
          position: absolute;
          top: 25px;
          left: 25px;
          width: 30px;
          height: 30px;
        }
        .title{
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
    }
    .left-2{
      width: 519px;
      height: 531px;
      border-radius: 20px;
      background: url("./image/left-2.png") no-repeat;
      background-size: cover;
      margin-bottom: 20px;
    }
    .left-3{
      width: 519px;
      height: 280px;
      border-radius: 20px;
      background: url("./image/left-3.png") no-repeat;
      background-size: cover;
    }
  }
  .content-center{
    width: 919px;
    .center-1{
      width: 100%;
      height: 302px;
      background: url("./image/center-1.png") no-repeat;
      background-size: cover;
    }
    .center-2{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 104px;
      .center-2-1{
        width: 302px;
        height: 104px;
        background: url("./image/center-2-1.png") no-repeat;
        background-size: cover;
      }
      .center-2-2{
        width: 302px;
        height: 104px;
        background: url("./image/center-2-2.png") no-repeat;
        background-size: cover;
      }
      .center-2-3{
        width: 302px;
        height: 104px;
        background: url("./image/center-2-3.png") no-repeat;
        background-size: cover;
      }
    }

    .center-3{
      width: 100%;
      height: 356px;
      background: url("./image/center-3.png") no-repeat;
      background-size: cover;
    }
    .center-4{
      width: 100%;
      height: 310px;
      background: url("./image/center-4.png") no-repeat;
      background-size: cover;
    }
  }
  .content-right{
    width: 472px;
    .right-1{
      width: 100%;
      height: 149px;
      background: url("./image/right-1.png") no-repeat;
      background-size: cover;
    }
    .right-2{
      width: 100%;
      height: 926px;
      background: url("./image/right-2.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
