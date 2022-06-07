import MyPagination from './MyPagination/MyPagination.vue'
import MyHeader from './MyHeader/My-header.vue'
export default {
  install (app) {
    app.component('MyPagination', MyPagination)
      .component('MyHeader', MyHeader)
  }
}
