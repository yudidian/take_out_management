import { createApp } from 'vue'
import './static/styles/common.css'
import ElementPlus from 'my-element-plus-change'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import store from './store/store'
import cp from './components/index'
import 'element-plus/dist/index.css'
import '@/style/themeCSS/light.css'
import '@/style/themeCSS/dark.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
  .use(router)
  .use(store)
  .use(cp)
app.mount('#app')
