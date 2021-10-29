import Vue from 'vue'
import WeexPageRouter from 'weex-page-router'

import { router } from './router'

Vue.use(WeexPageRouter)

new Vue({
  el: '#root',
  router,
  render: (h) => h(App)
})
