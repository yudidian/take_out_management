import { createApp } from 'vue'
import './static/styles/common.css'
import './style/element/index.scss'

import ElementPlus from 'my-element-plus-change'

import App from './App.vue'
import router from './router'
import store from './store/store'
import cp from './components/index'
const app = createApp(App)
app.use(ElementPlus)
  .use(router)
  .use(store)
  .use(cp)
app.mount('#app')
