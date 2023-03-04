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
    <div
      class="swiper-wrapper"
      ref="slideWrapper"
      @mouseenter="clearRun"
      @mouseleave="addRun"
    >
      <div
        class="swiper-slide"
        v-for="(item, index) in centerThree.dishInfo.slice(0,5)"
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
import { onUpdated, ref } from 'vue'
// import { clearAllTimer } from '@/utils'
const IMG_URL = import.meta.env.VITE_IMAGE_URL
defineProps({
  centerThree: {
    type: Object,
    required: true
  }
})
let runIndex = 1
let timer
let slideLength = 0
let ele = null
let slideHeight
const slideWrapper = ref(null)
onUpdated(() => {
  const itemLength = slideWrapper.value.children.length
  const itemHeight = slideWrapper.value.children[0].offsetHeight
  if (slideLength !== itemLength) {
    slideLength = itemLength
    ele = slideWrapper.value
    slideHeight = itemHeight
    slideWrapperRun(ele, slideLength, slideHeight)
  }
})
const slideWrapperRun = (ele, itemLength, itemHeight) => {
  timer = setInterval(() => run(ele, itemLength, itemHeight), 2000)
}
const run = (ele, itemLength, itemHeight) => {
  if (runIndex === itemLength + 1) {
    ele.style = `transform: translateY(${3 * (itemHeight + 2)}px); transition: none;`
    runIndex = 1
    clearInterval(timer)
    timer = setInterval(() => run(ele, itemLength, itemHeight), 2000)
  } else {
    const translateValue = ele.style.transform.match(/-?\d+/)
    if (translateValue !== null && +translateValue[0] > 0) {
      ele.style = `transform: translateY(${+translateValue[0] - (itemHeight + 2)}px); transition: all 1.4s;`
    } else {
      ele.style = `transform: translateY(${-runIndex * (itemHeight + 2)}px); transition: all 1.4s;`
      runIndex++
    }
  }
}
const clearRun = () => {
  clearInterval(timer)
}
const addRun = () => {
  timer = setInterval(() => run(ele, slideLength, slideHeight), 2000)
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
      width: 31.1818%;
      text-align: center;
    }
    &:nth-child(2) {
      width: 43.1818%;
      text-align: center;
    }
    &:nth-child(3) {
      width: 11.3636%;
      text-align: center;
    }
    &:nth-child(4) {
      width: 13.3636%;
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
    transform: translateY(0);
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
      width: 6.1948%;
    }
    .image{
      width: 5.1948%;
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
      width: 16.88%;
    }
    .description{
      font-size: 12px;
      padding: 0 10px;
      text-overflow: ellipsis;
      text-align: center;
      width: 35.75%;
      overflow: hidden;
      white-space: nowrap;
    }
    .price{
      width: 13.58%;
      text-align: center;
      color: #797dff;
    }
     .sales{
       width: 10.3896%;
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
@media screen and (max-width: 1200px) {
  .table-header {
    margin-top: 45px;
  }
}
@media screen and (max-width: 1100px) {
  .table-header {
    margin-top: 40px;
  }
}
@media screen and (max-width: 960px) {
  .table-header {
    margin-top: 27px;
  }
}
</style>
