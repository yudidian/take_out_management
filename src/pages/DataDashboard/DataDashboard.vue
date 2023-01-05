<template>
  <el-row class="data-content">
    <el-col
      :lg="7"
      class="content-left hidden-md-and-down"
    >
      <div class="left-1">
        <LeftOne :left-one="scoreData.leftOne" />
      </div>
      <div class="left-2">
        <LeftTwo :left-two="scoreData.leftTwo" />
      </div>
      <div class="left-3">
        <LeftThree />
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
        <div class="center-2-1">
          <div class="content">
            <div class="title">
              菜品销售额第一
            </div>
            <div class="money">
              ￥ {{ scoreData.centerOne.first }}
            </div>
          </div>
        </div>
        <div class="center-2-2">
          <div class="content">
            <div class="title">
              菜品销售额第二
            </div>
            <div class="money">
              ￥ {{ scoreData.centerOne.second }}
            </div>
          </div>
        </div>
        <div class="center-2-3">
          <div class="content">
            <div class="title">
              菜品销售额第三
            </div>
            <div class="money">
              ￥ {{ scoreData.centerOne.three }}
            </div>
          </div>
        </div>
      </div>
      <div class="center-3">
        <CenterThree :center-three="scoreData.centerThree" />
      </div>
      <div class="center-4">
        <CenterFours />
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
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import {
  sendGetAllDishInfo,
  sendGetAllUser,
  sendGetOrdersInfo,
  sendGetReviewInfo
} from '@/axios/api/sourceData'
import { formatNumber } from '@/utils'
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
  }, 2000)
  setInterval(() => {
    getScoreData()
  }, 5000)
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
</script>

<style scoped lang="scss">
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
      height: vh(200);
      border-radius: vw(20);
      background: url("./image/left-1.png") no-repeat;
      background-size: cover;
      margin-bottom: vh(20);
      &-header{
        width: 100%;
        height: vh(50);
        position: relative;
        img{
          position: absolute;
          top: vh(25);
          left: vw(25);
          width: vw(30);
          height: vh(30);
        }
        .title{
          position: absolute;
          top: vh(29);
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
            margin-top: vh(30);
            margin-left: vw(20);
            font-size: font(14);
            font-weight: 600;
            color: #BCC9D4;
          }
          .user-count{
            margin-top: vh(10);
            color: #ffffff;
            margin-left: vw(20);
            font-weight: 900;
            font-size: font(46);
          }
        }
        .right{
          flex: 1;
          height: vh(140);
        }
      }
    }
    .left-2{
      position: relative;
      width: vw(519);
      height: vh(513);
      overflow: hidden;
      border-radius: vw(20);
      background-color: #2A2D3CFF;
      margin-bottom: vh(20);
    }
    .left-3{
      width: vw(519);
      height: vh(280);
      overflow: hidden;
      border-radius: vw(20);
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
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 104px;
      .center-2-1{
        flex: 1;
        height: 104px;
        border-radius: 20px;
        background: url("./image/center-2-1.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            white-space: nowrap;
            font-size: 14px;
            font-weight: 900;
          }
          .money{
            white-space: nowrap;
            font-size: 26px;
            font-weight: 900;
          }
        }
      }
      .center-2-2{
        flex: 1;
        height: 104px;
        border-radius: 20px;
        background: url("./image/center-2-2.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            white-space: nowrap;
            font-size: 14px;
            font-weight: 900;
          }
          .money{
            white-space: nowrap;
            font-size: 26px;
            font-weight: 900;
          }
        }
      }
      .center-2-3{
        flex: 1;
        height: 104px;
        border-radius: 20px;
        background: url("./image/center-2-1.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            white-space: nowrap;
            font-size: 14px;
            font-weight: 900;
          }
          .money{
            white-space: nowrap;
            font-size: 26px;
            font-weight: 900;
          }
        }
      }
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
      height: vh(149);
      background: url("./image/right-1.png") no-repeat;
      background-size: cover;
    }
    .right-2{
      overflow: hidden;
      width: 100%;
      height: vh(926);
      background: url("./image/right-2.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
