<template>
  <div>
    <p>消息列表</p>
    <ul class="message-wrapper">
      <li
        v-for="item in messageList"
        :key="item"
        class="message-item"
        @click="openDrawer(item)"
      >
        <img
          :src="IMG_URL + item[0].userAvatar"
          alt="img"
        >
        <span class="username">用户名：{{ item[0].userName }}</span>
        <span class="count">消息条数：{{ item.length }}</span>
      </li>
    </ul>
    <el-drawer
      v-model="drawer"
      title="消息回复"
      size="50%"
    >
      <ul
        class="review-wrapper"
        ref="listContent"
      >
        <li
          v-for="item in drawerData"
          :key="item.id"
        >
          <div
            v-if="item.managerName !== undefined"
            class="right-review"
          >
            <div class="review-right">
              <span class="review-name">{{ item.managerName }}</span>
              <span class="review-message">
                {{ item.message }}
              </span>
              <span class="review-time"> {{ formatDate(item.createTime) }}</span>
            </div>
            <img :src="IMG_URL + item.managerAvatar">
          </div>
          <div
            class="left-review"
            v-else
          >
            <img :src="IMG_URL + item.userAvatar">
            <div class="review-right">
              <span class="review-name">{{ item.userName }}</span>
              <span class="review-message">
                {{ item.message }}
              </span>
              <span class="review-time"> {{ formatDate(item.createTime) }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="bottom-review">
        <el-input
          maxlength="300"
          show-word-limit
          v-model="reviewMessage"
          type="textarea"
          placeholder="请输入内容"
        />
        <el-button
          @click="sendMessage"
          type="primary"
        >
          发送
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup name="CustomerService">
import { formatDate } from '@/utils'
import { nextTick, onMounted, ref, watch } from 'vue'
import Websocket from '@/utils/websocket'
import { useStore } from 'vuex'
const listContent = ref()
const IMG_URL = import.meta.env.VITE_IMAGE_URL
const store = useStore()
const socket = ref(null)
const drawer = ref(false)
const messageList = ref({})
const drawerData = ref([])
const reviewMessage = ref('')
const userId = ref('')
onMounted(() => {
  init()
})
watch(messageList, () => {
  drawerData.value = messageList.value[userId.value]
  nextTick(() => {
    listContent.value.scrollTop = listContent.value.scrollHeight
  })
}, { deep: true })
const init = async () => {
  socket.value = new Websocket(`ws://localhost:8089/websocket/chart?managerId=${store.getters.userId}`)
  socket.value.ws.onmessage = msg => {
    messageList.value = JSON.parse(msg.data)
  }
}
const openDrawer = (item) => {
  drawer.value = true
  drawerData.value = item
  userId.value = item[0].userId
  nextTick(() => {
    listContent.value.scrollTop = listContent.value.scrollHeight
  })
}
const sendMessage = async () => {
  socket.value.send({
    message: reviewMessage.value,
    userId: userId.value,
    managerId: store.getters.userId
  })
  reviewMessage.value = ''
}
</script>

<style scoped lang="scss">
.message-wrapper{
  .message-item{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    img{
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    .username{
      font-weight: 900;
    }
    .count{
      margin-left: 20px;
      color: red;
    }
  }
}
.review-wrapper{
  height: 80%;
  overflow-y: auto;
  li{
    display: flex;
    margin-bottom: 10px;
    .left-review{
      justify-self: flex-start;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
      .review-right {
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .review-name{
          font-weight: 900;
        }
        .review-message{
          padding: 10px;
          font-size: 18px;
          background-color: #e1e1e1;
          border-radius: 5px;
          overflow-wrap: anywhere;
        }
      }
    }
    .right-review{
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      margin-left: auto;
      justify-content: flex-end;
      img{
        width: 60px;
        height: 60px;
        margin-left: 10px;
      }
      .review-right {
        display: flex;
        width: 70%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        .review-name{
          font-weight: 900;
        }
        .review-message{
          padding: 10px;
          overflow-wrap: anywhere;
          font-size: 18px;
          background-color: #e1e1e1;
          border-radius: 5px;
        }
      }
    }
  }
}
.bottom-review{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .el-button{
    margin-top: 10px;
  }
}
</style>
