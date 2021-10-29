weex-page-router
---
> 用于weex的vue-router，具有和vue-router一致的调用方法

## 安装

```
npm install --save weex-page-router
```

## 示例

router.js
```js
import createRouter from 'weex-page-router'
import HelloWorld from'@/components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
]

// { router, weexRouter }
export default createRouter({
  routes
})
```

main.js
```js
import Vue from 'vue'
import WeexPageRouter from 'weex-page-router'
import App from './App.vue'

import { router } from './router'

Vue.use(WeexPageRouter)

new Vue({
  el: '#root',
  router,
  render: (h) => h(App)
})
```

xx.vue
```js
import { weexRouter } from './router'

weexRouter.push('/next')
weexRouter.pop()
weexRouter.back()
weexRouter.beforeEach((to, from, next) => {
  next()
})
```
----
请尽情使用吧～