import MyPagination from './MyPagination/MyPagination.vue'
import MyHeader from './MyHeader/My-header.vue'
import MyImage from './MyImage/MyImage.vue'
export default {
  install (app) {
    app.component('MyPagination', MyPagination)
      .component('MyHeader', MyHeader)
      .component('MyImage', MyImage)
  }
}
