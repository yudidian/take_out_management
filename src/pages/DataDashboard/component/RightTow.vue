<template>
  <div class="right-tow">
    <div class="header">
      <div class="left">
        <img
          src="../image/right-2-logo.png"
          alt=""
        >
        <div class="name">
          实时订单
        </div>
      </div>
      <div class="right">
        订单数量：{{ rightTow.allCount }}
      </div>
    </div>
    <ul class="content">
      <li
        class="item"
        v-for="(item) in rightTow.list"
        :key="item.id"
      >
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            收货人：{{ item.consignee }}
          </div>
          <div class="bottom">
            地址：{{ item.address }}
          </div>
        </div>
        <div class="item-right">
          {{ dayjs(item.orderTime).format('HH:mm:ss') }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
defineProps({
  rightTow: {
    type: Object,
    required: true
  }
})
</script>

<style  lang="scss">
.header {
  display: flex;
  height: 80px;
  .left {
    margin-left: vw(32);
    display: flex;
    align-items: center;
    img{
      margin-top: 2px;
      width: vw(24);
    }
    .name{
      color: #fffdef;
      font-weight: 900;
      margin-left: vw(10);
      font-size: font(18);
      padding-top: 4px;
    }
  }
  .right{
    width: vw(140);
    padding-top: 32px;
    white-space: nowrap;
    color: #fffdef;
    font-weight: 900;
    margin-right: vw(10);
    font-size: font(12);
    margin-left: auto;
  }
}
.content{
  margin-top: 16px;
  .item{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
    width: 100%;
    height: 96px;
    .item-left{
      margin-left: vw(50);
      img{
        width: vw(60);
      }
    }
    .item-center{
      width: vw(230);
      color: #fffdef;
      font-weight: 900;
      margin-left: vw(20);
      .top{
        padding: 0 vw(10) 0 0;
        font-size: font(16);
        color: rgb(140, 152, 191);
        margin-bottom: 10px;
      }
      .bottom{
        padding: 0 vw(10) 0 0;
        font-size: font(12);
      }
    }
    .item-right{
      color: rgb(140, 152, 191);
    }
  }
}
</style>
