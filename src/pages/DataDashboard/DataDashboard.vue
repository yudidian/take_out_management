<template>
  <el-row class="data-content">
    <el-col
      :lg="7"
      class="content-left hidden-md-and-down"
    >
      <div class="left-1">
        <LeftOne
          ref="LeftOneDom"
          :left-one="scoreData.leftOne"
        />
      </div>
      <div class="left-2">
        <LeftTwo
          ref="LeftTwoDom"
          :left-two="scoreData.leftTwo"
        />
      </div>
      <div class="left-3">
        <LeftThree ref="LeftThreeDom" />
      </div>
    </el-col>
    <el-col
      :lg="11"
      class="content-center"
    >
      <div class="center-1">
        <CenterOne
          :center-one="scoreData.centerOne"
        />
      </div>
      <div class="center-2">
        <CenterTow :score-data="scoreData" />
      </div>>
      <div class="center-3">
        <CenterThree :center-three="scoreData.centerThree" />
      </div>
      <div class="center-4">
        <CenterFours ref="CenterFoursDom" />
      </div>
    </el-col>
    <el-col
      :lg="6"
      class="content-right hidden-md-and-down"
    >
      <div class="right-1">
        <RightOne :all-count="scoreData.leftOne.allCount" />
      </div>
      <div class="right-2">
        <RightTow :right-tow="scoreData.rightTow" />
      </div>
    </el-col>
  </el-row>
  <Teleport
    to="body"
    v-if="show"
  >
    <div class="loading">
      <img
        src="./image/loading.gif"
        alt=""
      >
      <span class="message">koala</span>
    </div>
  </Teleport>
</template>

<script setup name="DataDashboard">
import RightTow from '@/pages/DataDashboard/component/RightTow.vue'
import CenterFours from './component/CenterFours.vue'
import LeftThree from '@/pages/DataDashboard/component/LeftThree.vue'
import CenterThree from './component/CenterThree.vue'
import LeftTwo from './component/LeftTow.vue'
import LeftOne from './component/LeftOne.vue'
import CenterOne from './component/CenterOne.vue'
import RightOne from './component/RightOne.vue'
import CenterTow from './component/CenterTow.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import _ from 'lodash'
import {
  sendGetAllDishInfo,
  sendGetAllUser,
  sendGetOrdersInfo,
  sendGetReviewInfo
} from '@/axios/api/sourceData'
import { formatNumber } from '@/utils'
const LeftOneDom = ref(null)
const LeftTwoDom = ref(null)
const CenterFoursDom = ref(null)
const LeftThreeDom = ref(null)
const scoreData = reactive({
  leftOne: {
    allCount: '000,000'
  },
  leftTwo: {
    goodReviewCount: '99.9',
    allReviewCount: '99,999',
    allOrderCount: '99,999'
  },
  centerOne: {
    first: '00,000',
    second: '00,000',
    three: '00,000',
    allSales: '00000000'
  },
  centerThree: {
    dishInfo: [],
    setMeal: []
  },
  rightTow: {
    list: [],
    allCount: '000,000'
  }
})
let timer
const show = ref(true)
onMounted(() => {
  getScoreData()
  timer = setTimeout(() => {
    show.value = false
  }, 1100)
  setInterval(() => {
    getScoreData()
  }, 5000)
  getAllEcharts()
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
const getScoreData = async () => {
  const res = await Promise.allSettled([sendGetAllUser(), sendGetAllDishInfo(), sendGetOrdersInfo(), sendGetReviewInfo()])
  scoreData.leftOne.allCount = formatNumber(res[0].value.info.allCount, 5)
  scoreData.leftTwo = {
    goodReviewCount: ((res[3].value.info.goodReviewCount / res[3].value.info.allCount) * 100).toFixed(1),
    allReviewCount: formatNumber(res[3].value.info.allCount, 5),
    allOrderCount: formatNumber(res[2].value.info.allCount, 5)
  }
  scoreData.centerOne = {
    first: formatNumber(res[1].value.info.first / 100, 5),
    second: formatNumber(res[1].value.info.second / 100, 5),
    three: formatNumber(res[1].value.info.three / 100, 5),
    allSales: res[1].value.info.allSales
  }
  scoreData.centerThree.dishInfo = res[1].value.info.dish
  scoreData.centerThree.setMeal = res[1].value.info.setmeal
  scoreData.rightTow.list = res[2].value.info.list
  scoreData.rightTow.allCount = formatNumber(res[2].value.info.allCount, 5)
}
const getAllEcharts = () => {
  window.addEventListener('resize', _.throttle(() => {
    LeftOneDom.value.myChart && LeftOneDom.value.myChart.resize()
    LeftTwoDom.value.myChart && LeftTwoDom.value.myChart.resize()
    LeftThreeDom.value.myChart && LeftThreeDom.value.myChart.resize()
    CenterFoursDom.value.myChart && CenterFoursDom.value.myChart.resize()
  }, 200))
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px){
  .loading{
    img{
      width: vw(120);
    }
    .message{
      width: vw(120);
      text-align: center;
      font-size: font(26);
      font-weight: 900;
      color: #fffdef;
    }
  }
}
@media screen and (max-width: 1200px){
  .loading{
    img{
      width: 18%;
    }
    .message{
      width: 40%;
      text-align: center;
      font-size: 260%;
      font-weight: 900;
      color: #fffdef;
    }
  }
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: vw(1980);
  height: vh(1080);
  z-index: 99;
  overflow: hidden;
  background: rgb(15, 42, 66);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.data-content{
  width: 100%;
  background-image: none;
  background-color: #2A2D3CFF;
  transform: scale(1);
  transform-origin: left top;
  background-size: 100%;
  display: flex;
  .content-left{
    width: vw(519);
    .left-1{
      width: vw(519);
      height: 250px;
      border-radius: vw(20);
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
          left: vw(25);
          width: vw(30);
          height: 30px;
        }
        .title{
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
    }
    .left-2{
      position: relative;
      width: vw(519);
      height: 513px;
      overflow: hidden;
      border-radius: vw(20);
      background-color: #35394B;
      margin-bottom: 20px;
    }
    .left-3{
      width: vw(519);
      height: 290px;
      overflow: hidden;
      border-radius: vw(20);
      background: url("./image/left-3.png") no-repeat;
      background-size: cover;
    }
  }
  .content-center{
    width: vw(919);
    .center-1{
      width: 100%;
      height: 276px;
      background: url("./image/center-1.png") no-repeat;
      background-size: cover;
    }
    .center-2{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 104px;
    }

    .center-3{
      width: 100%;
      height: 365px;
      overflow: hidden;
      background: url("./image/center-3.png") no-repeat;
      background-size: cover;
    }
    .center-4{
      width: 100%;
      height: 310px;
      overflow: hidden;
      background: url("./image/center-4.png") no-repeat;
      background-size: cover;
    }
  }
  .content-right{
    width: vw(472);
    .right-1{
      width: 100%;
      height: 149px;
      background: url("./image/right-1.png") no-repeat;
      background-size: cover;
    }
    .right-2{
      overflow: hidden;
      width: 100%;
      height: 949px;
      background: url("./image/right-2.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
