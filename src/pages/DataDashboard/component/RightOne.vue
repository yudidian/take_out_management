<template>
  <div class="right-one">
    <div class="right-header">
      <div class="left">
        <div class="left-name">
          koala数据可视化
        </div>
        <div class="left-user">
          用户数量：{{ allCount }}
        </div>
      </div>
      <div class="right">
        <span>
          营业中
        </span>
        <img
          src="../image/right-1-logo.png"
          alt=""
        >
      </div>
    </div>
    <div class="right-content">
      <span
        class="left"
        @click="$router.replace('/index')"
      >返回控制面板</span>
      <div class="right">
        <div class="now">
          当前时间：{{ nowTime !== '' ? nowTime: '2001-01-15 08:08:08' }}
        </div>
        <div class="open-now">
          营业时间：08:00:00 ~ 20:00:00
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="RightOne">
import dayjs from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'
defineProps({
  allCount: {
    type: String,
    required: true
  }
})
const nowTime = ref('')
let timer
onMounted(() => {
  timer = setInterval(() => {
    nowTime.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<style scoped lang="scss">
.right-one{
  width: 100%;
  height: 100%;
  .right-header{
    display: flex;
    height: 70px;
    color: #fffdef;
    font-weight: 900;
    font-size: 18px;
    .left {
      margin-top: 28px;
      margin-left: 76px;
      .left-user{
        font-size: 12px;
        color: rgb(140, 152, 191);
      }
    }
    .right{
      margin-top: 32px;
      margin-right: 45px;
      margin-left: auto;
      span{
        font-size: 12px;
        font-weight: 900;
      }
      img{
        width: 16px;
      }
    }
  }
  .right-content{
    width: 100%;
    display: flex;
    color: rgb(140, 152, 191);
    font-size: 12px;
    margin-top: 20px;
    .left{
      cursor: pointer;
      width: 100px;
      height: 30px;
      margin-left: 20px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #8C98BFFF;
    }
    .right{
      width: auto;
      margin-left: auto;
      margin-right: 20px;
    }
  }
}
</style>
