<template>
  <div class="center-one">
    <div class="number-wrapper">
      <div class="number-item">
        ￥
      </div>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        ,
      </div>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        ,
      </div>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <span class="number-item">0123456789</span>
    </div>
    <div class="number-wrapper">
      <div class="number-item">
        元
      </div>
    </div>
  </div>
</template>

<script setup name="CenterOne">
import { onMounted } from 'vue'
const MAX_COUNT = 8
const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})
const start = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0
}

onMounted(() => {
  const items = document.querySelectorAll('span.number-item')
  const strArray = setCountNumber(props.count)
  for (let i = strArray.length - 1; i >= 0; i--) {
    const end = 118 * parseInt(strArray[i])
    const timer = setInterval(() => {
      start[i] += (i + 10) * 2
      if (start[i] >= end) {
        start[i] = 0
        clearInterval(timer)
        items[i].style.transform = `translateY(${-end}px)`
        return
      }
      items[i].style.transform = `translateY(${-start[i]}px)`
    }, 80 / i)
  }
})
// 补零操作
const setCountNumber = (count) => {
  let str = ''
  for (let i = 0; i < MAX_COUNT - count.toString().length; i++) {
    str += '0'
  }
  console.log(str)
  str = str + count
  return str.split('')
}
</script>

<style scoped lang="scss">
.center-one {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .number-wrapper{
    position: relative;
    width: 70px;
    height: 118px;
    font-size: 120px;
    color: #fffdef;
    font-weight: 900;
    text-align: left;
    line-height: 70px;
    writing-mode: vertical-lr;
    overflow: hidden;
    text-orientation: upright;
    .number-item {
      position: absolute;
      width: 100%;
      font-size: 118px;
      color: #fffdef;
      font-weight: 900;
      text-align: left;
      line-height: 70px;
      writing-mode: vertical-lr;
      overflow: hidden;
      text-orientation: upright;
      transition: all 1.5s;
    }
    &:nth-child(1) {
      .number-item{
        font-size: 60px;
        text-align: right;
        margin-top: 50px;
      }
    }
    &:nth-child(4) {
      width: 40px;
      .number-item{
        width: 40px;
        font-size: 120px;
        text-align: right;
        margin-top: 30px;
        line-height: 40px;
      }
    }
    &:nth-child(8) {
      width: 40px;
      .number-item{
        width: 40px;
        font-size: 120px;
        text-align: right;
        margin-top: 30px;
        line-height: 40px;
      }
    }
    &:last-child {
      .number-item{
        width: 90px;
        line-height: 50px;
        font-size: 50px;
        margin-top: 62px;
        text-align: right;
      }
    }
  }
}
</style>
