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
        订单数量：1425
      </div>
    </div>
    <ul class="content">
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <img
            src="../image/right-2-imag.png"
            alt=""
          >
        </div>
        <div class="item-center">
          <div class="top">
            下单人：xxx
          </div>
          <div class="bottom">
            地址：xxxx
          </div>
        </div>
        <div class="item-right">
          08:00:00
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RightTow'
}
</script>

<style  lang="scss">
.header {
  display: flex;
  height: 80px;
  .left {
    margin-left: 32px;
    display: flex;
    align-items: center;
    img{
      margin-top: 2px;
      width: 24px;
    }
    .name{
      color: #fffdef;
      font-weight: 900;
      margin-left: 10px;
      font-size: 18px;
      padding-top: 4px;
    }
  }
  .right{
    width: 124px;
    padding-top: 34px;
    color: #fffdef;
    font-weight: 900;
    margin-right: 10px;
    font-size: 12px;
    margin-left: auto;
  }
}
.content{
  margin-top: 6px;
  .item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
    width: 100%;
    height: 96px;
    .item-left{
      margin-left: 50px;
      img{
        width: 60px;
      }
    }
    .item-center{
      width: 230px;
      color: #fffdef;
      font-weight: 900;
      margin-left: 20px;
      .top{
        font-size: 16px;
        color: rgb(140, 152, 191);
        margin-bottom: 10px;
      }
      .bottom{
        font-size: 12px;
      }
    }
    .item-right{
      color: rgb(140, 152, 191);
    }
  }
}
</style>
