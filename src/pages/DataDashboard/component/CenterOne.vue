<template>
  <div class="center-one">
    <div class="number-wrapper">
      <div class="number-item">
        ￥
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        ,
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        ,
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div
        class="content"
        id="number-content"
      >
        <span class="number-item">0</span>
        <span class="number-item">0</span>
        <span class="number-item">1</span>
        <span class="number-item">2</span>
        <span class="number-item">3</span>
        <span class="number-item">4</span>
        <span class="number-item">5</span>
        <span class="number-item">6</span>
        <span class="number-item">7</span>
        <span class="number-item">8</span>
        <span class="number-item">9</span>
      </div>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        元
      </div>
    </div>
  </div>
</template>

<script setup name="CenterOne">
import _ from 'lodash'
import { onMounted, watch } from 'vue'
const MAX_COUNT = 8
const props = defineProps({
  centerOne: {
    type: Object,
    required: true
  }
})
let starTimer
watch(() => props.centerOne.allSales, () => {
  runNumberItem()
}, { immediate: false })
// // 补零操作
const setCountNumber = (count) => {
  if (count.toString.length === MAX_COUNT) {
    return count.toString.split('')
  }
  let str = ''
  for (let i = 0; i < MAX_COUNT - count.toString().length; i++) {
    str += '0'
  }
  str = str + count
  return str.split('')
}
const runNumberItem = () => {
  // 获取元素精确高度
  const wrapperHeight = document.querySelector('.number-wrapper').getBoundingClientRect().height
  // 获取需要滚动的元素
  const items = document.querySelectorAll('#number-content')
  // 计算出每个元素需要滚动的距离
  const strArray = setCountNumber(props.centerOne.allSales / 100)
  for (let i = strArray.length - 1; i >= 0; i--) {
    const end = wrapperHeight * parseInt(strArray[i])
    // 利用闭包让每个容器有各自的滚动高度
    runItem(items, i, end)
  }
}
const runItem = (items, i, end) => {
  starTimer = setTimeout(() => {
    items[i].style.transform = `translateY(${-end}px`
    clearTimeout(starTimer)
  }, (i + 1) * 100)
}
onMounted(() => {
  window.addEventListener('resize', _.debounce(() => {
    const timer = clearTimeout(() => {}, 0)
    for (let i = starTimer; i <= timer; i++) {
      clearTimeout(i)
    }
    runNumberItem()
  }, 1000))
})
</script>

<style scoped lang="scss">
.center-one {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .number-wrapper{
    position: relative;
    width: 8.3%;
    height: 140px;
    font-size: font(120);
    color: #fffdef;
    font-weight: 900;
    overflow: hidden;
    text-align: center;
    margin-left: 0.5%;
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transition: transform 1.5s;
    }
  }
}
 @media screen and (max-width: 1200px) {
  .number-wrapper{
    .content{
        .number-item {
        width: 100%;
        height: 140px;
        font-size: 180%;
        line-height: 120px;
        color: #fffdef;
        font-weight: 900;
        text-align: center;
      }
    }
    &:nth-child(1) {
      .number-item{
        font-size: 110%;
        text-align: right;
        margin-top: 50px;
        line-height: 60px;
      }
    }
    &:nth-child(4) {
      width: 5%;
      .number-item{
        width: 100%;
        font-size: 220%;
        text-align: right;
        margin-top: 30px;
        line-height: 40px;
      }
    }
    &:nth-child(8) {
      width: 5%;
      .number-item{
        width: 100%;
        font-size: 220%;
        margin-top: 30px;
        line-height: 40px;
      }
    }
    &:last-child {
      .number-item{
        width: 100%;
        line-height: 40px;
        font-size: 80%;
        margin-top: 62px;
      }
    }
  }
}
@media screen and (min-width:1200px) {
  .number-wrapper{
    .content{
        .number-item {
        width: 100%;
        height: 140px;
        font-size: font(120);
        line-height: 120px;
        color: #fffdef;
        font-weight: 900;
        text-align: center;
      }
    }
    &:nth-child(1) {
      .number-item{
        font-size: font(60);
        text-align: right;
        margin-top: 50px;
        line-height: 60px;
      }
    }
    &:nth-child(4) {
      width: 5%;
      .number-item{
        width: 100%;
        font-size: font(120);
        text-align: right;
        margin-top: 42px;
        line-height: 40px;
      }
    }
    &:nth-child(8) {
      width: 5%;
      .number-item{
        width: 100%;
        font-size: font(120);
        margin-top: 42px;
        line-height: 40px;
      }
    }
    &:last-child {
      .number-item{
        width: 100%;
        line-height: 40px;
        font-size: font(60);
        margin-top: 62px;
      }
    }
  }
}

</style>
