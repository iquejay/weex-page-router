import History from './weex-history'
import { createMatcher } from 'vue-router/src/create-matcher'
export default class WeexRouter {
  constructor (options = {}) {
    this.options = options
    this.beforeHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)
    this.history = new History(this)
  }
  match (
    raw,
    redirectedFrom
  ) {
    return this.matcher.match(raw, redirectedFrom)
  }
  push (location, onComplete, onAbort) {
    this.history.push(location, onComplete, onAbort)
  }
  replace (location, onComplete, onAbort) {
    this.history.replace(location, onComplete, onAbort)
  }
  go (num) {
    this.history.go(num)
  }
  back () {
    this.go(-1)
  }
  beforeEach (fn) {
    return this.registerHooks(this.beforeHooks, fn)
  }
  afterEach (fn) {
    return this.registerHooks(this.afterHooks, fn)
  }
  registerHooks (list, fn) {
    list.push(fn)
    return () => {
      const i = list.indexOf(fn)
      if (i > -1) list.splice(i, 1)
    }
  }
  addRoutes (routes) {
    this.matcher.addRoutes(routes)
  }
}
