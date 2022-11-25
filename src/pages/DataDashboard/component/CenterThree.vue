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
      <div
        class="swiper-slide"
        v-for="(item, index) in centerThree.dishInfo"
        :key="item.id"
      >
        <div class="index">
          {{ index + 1 }}
        </div>
        <div class="image">
          <img
            :src="IMG_URL + item.image"
            alt=""
          >
        </div>
        <div class="name">
          {{ item.name }}
        </div>
        <div class="description">
          {{ item.description }}
        </div>
        <div class="price">
          ￥{{ (item.price / 100).toFixed(2) }}
        </div>
        <div class="sales">
          {{ item.salesVolume }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CenterThree">
import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { clearAllTimer } from '@/utils'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
defineProps({
  centerThree: {
    type: Object,
    required: true
  }
})
onMounted(() => {
  nextTick(() => {
    runItem()
  })
})
onBeforeUnmount(() => {
  clearAllTimer()
})
const runItem = () => {
  const itemHeight = 72
  const itemWrapper = document.querySelector('.swiper-wrapper')
  const items = document.querySelectorAll('.swiper-slide')
  const itemsLength = items.length
  for (let i = 1; i < itemsLength + 2; i++) {
    if (i > itemsLength) {
      // 到最后一个
      setTimeout(() => {
        itemWrapper.style.transition = 'none'
        itemWrapper.style.transform = 'translateY(210px)'
        runItem2()
      }, 2000 * (itemsLength + 1))
    } else {
      setTimeout(() => {
        if (itemWrapper.style.transition !== 'all 1.5s ease 0s' || itemWrapper.style.transition === '') {
          itemWrapper.style.transition = 'all 1.5s ease 0s'
        }
        itemWrapper.style.transform = `translateY(${-i * itemHeight}px)`
      }, 2000 * i)
    }
  }
}
const runItem2 = () => {
  const itemHeight = 72
  const itemWrapper = document.querySelector('.swiper-wrapper')
  const items = document.querySelectorAll('.swiper-slide')
  const itemsLength = items.length
  for (let i = -2; i < itemsLength + 1; i++) {
    setTimeout(() => {
      if (itemWrapper.style.transition !== 'all 1.5s ease 0s' || itemWrapper.style.transition === '') {
        itemWrapper.style.transition = 'all 1.5s ease 0s'
      }
      itemWrapper.style.transform = `translateY(${-i * itemHeight}px)`
    }, 2000 * (i + 3))
    if (i === itemsLength) {
      // 到最后一个
      setTimeout(() => {
        itemWrapper.style.transition = 'none'
        itemWrapper.style.transform = 'translateY(210px)'
        runItem2()
      }, 2000 * (itemsLength + 3))
    }
  }
}
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
  position: relative;
  width: 100%;
  height: 220px;
  margin: 0 auto;
  overflow: hidden;
  .swiper-wrapper{
    position: absolute;
    width: 100%;
    height: auto;
    .swiper-slide {
    width: 100%;
    height: 70px;
    display: flex;
    font-size: 18px;
    color: #fffdef;
    font-weight: 900;
    margin-left: 60px;
    margin-top: 2px;
    align-items: center;
    .index{
      width: 40px;
    }
    .image{
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 10px;
      text-align: center;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name{
      font-size: 14px;
      text-align: center;
      width: 130px;
    }
    .description{
      font-size: 12px;
      padding: 0 10px;
      text-overflow: ellipsis;
      text-align: center;
      width: 360px;
      overflow: hidden;
      white-space: nowrap;
    }
    .price{
      width: 120px;
      text-align: center;
      color: #797dff;
    }
     .sales{
       width: 80px;
       text-align: center;
       margin-left: 10px;
       color: #ff6d87;;
     }
  }
  }
}

.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: linear;
}
</style>
