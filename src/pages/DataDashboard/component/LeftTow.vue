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
import { onMounted, shallowRef } from 'vue'
defineProps({
  leftTwo: {
    type: Object,
    required: true
  }
})
const myChart = shallowRef(null)
onMounted(() => {
  const chartDom = document.getElementById('leftTwo')
  myChart.value = echarts.init(chartDom)
  myChart.value.setOption({
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
        center: ['47%', '54.5%'],
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
defineExpose({
  myChart
})
</script>

<style scoped lang="scss">
.left-tow {
  width: vw(300);
  height: 220px;
  margin-top: 46px;
}
.message{
  position: absolute;
  top: 130px;
  left: vw(80);
  .count{
    color: #fffdef;
    font-size: font(50);
    font-weight: 900;
    span{
      font-size: font(20);
      margin-left: vw(-10);
    }
  }
  .review{
    color: rgb(140, 152, 191);;
    font-size: font(12);
    text-align: center;
  }
}
.total-content{
  position: absolute;
  top: 40px;
  right: vw(20);
  width: vw(228);
  height: 140px;
  color: rgb(140, 152, 191);
  font-weight: 900;
  font-size: font(20);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .all-count{
    margin-top: 42px;
    .number{
      font-size: font(60);
      color: #fffdef;
    }
    .unit{
      color: #fffdef;
    }
  }
  .all-review{
    font-size: font(16);
    margin-right: vw(6);
    margin-left: auto;
    font-weight: 400;
  }
}
.data-source{
  position: absolute;
  bottom: 120px;
  width: 100%;
  color: rgb(140, 152, 191);
  font-size: font(12);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .phone,.web{
    margin-left: vw(46);
    margin-bottom: 20px;
    .title{
      margin-left: vw(10);
      margin-bottom: 8px;
    }
    .content{
      position: relative;
      display: flex;
      margin-left: vw(10);
      .name{
        font-size: font(12);
        font-weight: 600;
        color: #fffdef;
      }
      & > .count{
        position: absolute;
        right: 0;
        bottom: 2px;
        margin-left: auto;
        margin-right: vw(90);
        font-weight: 900;
        font-size: font(24);
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
      font-size: font(14);
    }
    .number{
      font-size: font(30);
      font-weight: 900;
    }
  }
  .info{
    color: #BCC9D4;
    font-size: font(14);
  }
}
</style>
