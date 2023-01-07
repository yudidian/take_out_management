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
      >控制面板</span>
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
    font-size: font(18);
    .left {
      margin-top: 28px;
      margin-left: vw(100);
      .left-user{
        font-size: font(12);
        color: rgb(140, 152, 191);
      }
    }
    .right{
      margin-top: 32px;
      margin-right: vw(45);
      margin-left: auto;
      span{
        font-size: font(12);
        font-weight: 900;
      }
      img{
        width: vw(16);
      }
    }
  }
  .right-content{
    width: 100%;
    display: flex;
    color: rgb(140, 152, 191);
    font-size: font(12);
    margin-top: 20px;
    .left{
      cursor: pointer;
      width: vw(100);
      height: 30px;
      margin-left: vw(20);
      text-align: center;
      line-height: 30px;
      font-size: font(12);
      border: 1px solid #8C98BFFF;
    }
    .right{
      width: auto;
      margin-left: auto;
      margin-right: vw(20);
    }
  }
}
</style>
