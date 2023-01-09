<template>
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
</template>

<script setup name="CenterTow">
defineProps({
  scoreData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px){
  .center-2-1, .center-2-2, .center-2-3{
    flex: 1;
    height: 104px;
    border-radius: 20px;
    overflow: hidden;
    background-size: 100% 100% !important;
    .content{
      margin-top: 20px;
      margin-left: 40%;
      color: #fffdef;
      .title{
        padding-top: 4px;
        white-space: nowrap;
        font-size: font(18);
        font-weight: 900;
      }
      .money{
        margin-top: 6px;
        white-space: nowrap;
        font-size: font(30);
        font-weight: 900;
      }
    }
  }
}
@media screen and (max-width: 1200px){
  .center-2-1, .center-2-2, .center-2-3{
    width: 33.3333%;
    height: 104px;
    border-radius: 20px;
    overflow: hidden;
    background-size: 100% 100% !important;
    .content{
      width: 60%;
      margin-top: 20px;
      margin-left: 35%;
      color: #fffdef;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .title{
        width: 100%;
        height: 21px;
        white-space: nowrap;
        font-size: 100%;
        font-weight: 900;
      }
      .money{
        width: 100%;
        height: 42px;
        margin-top: 6px;
        white-space: nowrap;
        font-size: 190%;
        font-weight: 900;
      }
    }
  }
}

.center-2-1{
  background: url("../image/center-2-1.png") no-repeat;
}
.center-2-2 {
  background: url("../image/center-2-2.png") no-repeat;
}
.center-2-3 {
  background: url("../image/center-2-1.png") no-repeat;
}
</style>
