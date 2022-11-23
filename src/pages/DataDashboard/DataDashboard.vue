<template>
  <div class="data-content">
    <div class="content-left">
      <div class="left-1">
        <LeftOne :left-one="scoreData.leftOne" />
      </div>
      <div class="left-2">
        <LeftTwo :left-two="scoreData.leftTwo" />
      </div>
      <div class="left-3">
        <LeftThree />
      </div>
    </div>
    <div class="content-center">
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
    </div>
    <div class="content-right">
      <div class="right-1">
        <RightOne :all-count="scoreData.leftOne.allCount" />
      </div>
      <div class="right-2">
        <RightTow :right-tow="scoreData.rightTow" />
      </div>
    </div>
  </div>
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
  width: 100%;
  height: 100%;
  z-index: 99;
  overflow: hidden;
  background: rgb(15, 42, 66);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img{
    width: 120px;
  }
  .message{
    width: 120px;
    text-align: center;
    font-size: 26px;
    font-weight: 900;
    color: #fffdef;
  }
}
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
      position: relative;
      width: 519px;
      height: 531px;
      overflow: hidden;
      border-radius: 20px;
      background: url("./image/left-2.png") no-repeat;
      background-size: cover;
      margin-bottom: 20px;
    }
    .left-3{
      width: 519px;
      height: 280px;
      overflow: hidden;
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
        overflow: hidden;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            font-size: 14px;
            font-weight: 600;
          }
          .money{
            font-size: 30px;
            font-weight: 900;
          }
        }
      }
      .center-2-2{
        width: 302px;
        height: 104px;
        background: url("./image/center-2-2.png") no-repeat;
        background-size: cover;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            font-size: 14px;
            font-weight: 600;
          }
          .money{
            font-size: 30px;
            font-weight: 900;
          }
        }
      }
      .center-2-3{
        width: 302px;
        height: 104px;
        background: url("./image/center-2-3.png") no-repeat;
        background-size: cover;
        .content{
          margin-top: 20px;
          margin-left: 130px;
          color: #fffdef;
          .title{
            font-size: 14px;
            font-weight: 600;
          }
          .money{
            font-size: 30px;
            font-weight: 900;
          }
        }
      }
    }

    .center-3{
      width: 100%;
      height: 356px;
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
    width: 472px;
    .right-1{
      width: 100%;
      height: 149px;
      background: url("./image/right-1.png") no-repeat;
      background-size: cover;
    }
    .right-2{
      overflow: hidden;
      width: 100%;
      height: 926px;
      background: url("./image/right-2.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
