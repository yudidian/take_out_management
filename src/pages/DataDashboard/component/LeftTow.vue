<template>
  <div
    id="leftTwo"
    class="left-tow"
  />
  <div class="message">
    <div class="count">
      {{ leftTwo.goodReviewCount }}
      <span>%</span>
    </div>
    <div class="review">
      好评数量
    </div>
  </div>
  <div class="total-content">
    <div class="heder">
      TOTAL REVIEW
    </div>
    <div class="all-count">
      <span class="number">{{ leftTwo.allReviewCount }}</span>
      <span class="unit">条</span>
    </div>
    <div class="all-review">
      评论总条数
    </div>
  </div>
  <div class="data-source">
    <div class="phone">
      <div class="title">
        AUDIENCE SOURCE：
      </div>
      <div class="content">
        <div class="name">
          移动端来源
        </div>
        <div class="count">
          74,522
        </div>
      </div>
    </div>
    <div class="web">
      <div class="title">
        WEB SOURCE：
      </div>
      <div class="content">
        <div class="name">
          网页端来源
        </div>
        <div class="count">
          1,452
        </div>
      </div>
    </div>
  </div>
  <div class="sale-count">
    <div class="count-one">
      <span class="all-count">总下单数：</span>
      <span class="number">{{ leftTwo.allOrderCount }}</span>
    </div>
    <div class="info">
      *当日数据为模拟数据，非最终封账数据
    </div>
  </div>
</template>

<script setup name="LeftTow">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
defineProps({
  leftTwo: {
    type: Object,
    required: true
  }
})
onMounted(() => {
  const chartDom = document.getElementById('leftTwo')
  const myChart = echarts.init(chartDom)
  myChart.setOption({
    color: ['#7578F2', '#FF6D87'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#464C64',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['74%', '80%'],
        center: ['47.5%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 10, name: '好评' },
          { value: 1, name: '差评' }
        ]
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.left-tow {
  width: 300px;
  height: 220px;
  margin-top: 46px;
}
.message{
  position: absolute;
  top: 120px;
  left: 80px;
  .count{
    color: #fffdef;
    font-size: 50px;
    font-weight: 900;
    span{
      font-size: 20px;
      margin-left: -10px;
    }
  }
  .review{
    color: rgb(140, 152, 191);;
    font-size: 12px;
    text-align: center;
  }
}
.total-content{
  position: absolute;
  top: 40px;
  right: 20px;
  width: 228px;
  height: 140px;
  color: rgb(140, 152, 191);
  font-weight: 900;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .all-count{
    margin-top: 42px;
    .number{
      font-size: 60px;
      color: #fffdef;
    }
    .unit{
      color: #fffdef;
    }
  }
  .all-review{
    font-size: 16px;
    margin-right: 6px;
    margin-left: auto;
    font-weight: 400;
  }
}
.data-source{
  position: absolute;
  bottom: 120px;
  width: 100%;
  color: rgb(140, 152, 191);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .phone,.web{
    margin-left: 46px;
    margin-bottom: 20px;
    .title{
      margin-left: 10px;
      margin-bottom: 8px;
    }
    .content{
      position: relative;
      display: flex;
      margin-left: 10px;
      .name{
        font-size: 12px;
        font-weight: 600;
        color: #fffdef;
      }
      & > .count{
        position: absolute;
        right: 0;
        bottom: 2px;
        margin-left: auto;
        margin-right: 90px;
        font-weight: 900;
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
}
.sale-count {
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .count-one{
    color: #ffffff;
    margin-bottom: 10px;
    margin-top: 10px;
    .all-count{
      font-size: 14px;
    }
    .number{
      font-size: 30px;
      font-weight: 900;
    }
  }
  .info{
    color: #BCC9D4;
    font-size: 14px;
  }
}
</style>
