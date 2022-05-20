import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './static/styles/common.css'
import store from './store/store'
const app = createApp(App)
app.use(ElementPlus)
  .use(router)
  .use(store)
app.mount('#app')
