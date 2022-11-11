<template>
  <div class="header">
    <div class="logo">
      <img
        src="../image/center-3-logo.png"
        alt=""
      >
      <span class="name">商品销售排行</span>
    </div>
  </div>
  <div class="table-header">
    <span class="header-name">商品</span>
    <span class="header-name">描述</span>
    <span class="header-name">价格</span>
    <span class="header-name">销量</span>
  </div>
  <div
    class="swiper-container"
    id="swiper"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
            src="../image/center-3-logo.png"
            alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
              src="../image/center-3-logo.png"
              alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
              src="../image/center-3-logo.png"
              alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
              src="../image/center-3-logo.png"
              alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
              src="../image/center-3-logo.png"
              alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="index">
          1
        </div>
        <div class="image">
          <img
              src="../image/center-3-logo.png"
              alt=""
          >
        </div>
        <div class="name">
          xxx
        </div>
        <div class="description">
          xxxxxxxxxxxxxxxxxxx
        </div>
        <div class="price">
          ￥16.80
        </div>
        <div class="sales">
          200
        </div>
      </div>
    </div>

  </div>
</template>

<script setup name="CenterThree">
import { onMounted } from 'vue'
import Swiper from 'swiper'
onMounted(() => {
  const swiper = new Swiper('#case4', {
    loop: true, // 允许从第一张到最后一张，或者从最后一张到第一张  循环属性
    slidesPerView: 4, // 设置显示三张
    freeMode: true, // 使幻灯片滑动时不止滑动一格，且不会自动贴合
    slidesPerGroup: 1, // 定义1张图片为一组
    speed: 2500, // 设置过度时间
    grabCursor: true, // 鼠标样式根据浏览器不同而定
    autoplay: {
      delay: 1,
      disableOnInteraction: false
    },
    /*  设置每隔3000毫秒切换 */
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: true
    }
  })
  /* 鼠标悬停 停止动画 */
  const swiperHover = document.querySelector('.swiper-wrapper')
  swiperHover.addEventListener('mouseenter', function () {
    swiper.autoplay.stop()
  })
  /* 鼠标离开 开始动画 */
  swiperHover.addEventListener('mouseleave', function () {
    swiper.autoplay.start()
  })
})
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 30px;
  margin-top: 20px;
  .logo{
    display: flex;
    align-items: center;
    margin-left: 30px;
    img{
      width: 30px;
    }
    .name{
      font-size: 20px;
      font-weight: 900;
      color: #fffdef;
      margin-left: 8px;
      margin-top: 6px;
    }
  }
}
.table-header{
  width: 100%;
  color: #fffdef;
  font-weight: 900;
  font-size: 18px;
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
  .header-name{
    &:nth-child(1) {
      width: 280px;
      text-align: center;
    }
    &:nth-child(2) {
      width: 380px;
      text-align: center;
    }
    &:nth-child(3) {
      width: 100px;
      text-align: center;
    }
    &:nth-child(4) {
      width: 120px;
      text-align: center;
    }
  }
}
.swiper-container {
  width: 100%;
  height: 200px;
  padding: 20px;
  margin: 0 auto;
  background-color: rgba(0,0,0,.3);
  .swiper-slide {
    width: 100%;
    height: 40px;
    display: flex;
    color: #fffdef;
    font-weight: 900;
    margin-left: 20px;
    align-items: center;
    .image{
      img{
        width: 30px;
      }
    }
  }
}

.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: linear;
}
</style>
