import VueRouter from "vue-router";

import WeexRouter from "./weex-router";

export function createRouter(options) {
  const router = new VueRouter(options)
  const isWeb = weex.config.env.platform === 'Web'
  if (!isWeb) {
    // native中，若链接带有#，则切换到该页面
    let defaultView = '/'
    const checkView = /#(.{1,})/gi.exec(weex.config.bundleUrl)
    if (checkView && checkView[1]) {
      defaultView = checkView[1]
    }
    router.push(defaultView)
  }
  return {
    router,
    weexRouter: isWeb ? router : new WeexRouter({
      routes: options.routes
    })
  }
}

let installed = false
export default {
  install (Vue) {
    if (installed) return
    installed = true
    Vue.use(VueRouter)
  }
}
