import { isError, runQueue } from './utils'

export default class {
  constructor (router) {
    this.router = router
    this.pending = null
    this.ready = false
    this.navigator = weex.requireModule('navigator')

  }
  push (location, onComplete, onAbort) {
    const { navigator } = this
    this.transitionTo(
      location,
      (route) => {
        let options = route.meta ? route.meta.options : {}
        let baseUrl = weex.config.bundleUrl.split('#')[0]
        navigator.push({
          url: baseUrl + '#' + route.fullPath,
          animated: 'true',
          ...(options || {})
        }, function () {
          onComplete && onComplete(route)
        })
      }, onAbort)
  }
  replace (location, onComplete, onAbort) {
    const { navigator } = this
    this.transitionTo(
      location,
      (route) => {
        let options = route.meta ? route.meta.options : {}
        let baseUrl = weex.config.bundleUrl.split('#')[0]
        navigator.push({
          url: baseUrl + '#/' + route.fullPath,
          animated: 'true',
          ...(options || {}),
          history: false
        }, function () {
          onComplete && onComplete(route)
        })
      }, onAbort)
  }
  go (num) {
    const { navigator } = this
    const LightJsBridge = weex.requireModule('LightJSBridge')
    if (LightJsBridge) {
      LightJsBridge.call('native.back', { number: -1 * num }, null)
    } else {
      navigator.pop({
        animated: 'true'
      })
    }
  }
  back () {
    this.go(-1)
  }
  transitionTo (location, onComplete, onAbort) {
    const route = this.router.match(location)
    this.confirmTransition(route, () => {
      onComplete && onComplete(route)
    }, err => {
      if (onAbort) {
        onAbort(err)
      }
    })
  }
  confirmTransition (route, onComplete, onAbort) {
    const abort = err => {
      onAbort && onAbort(err)
    }
    const queue = [].concat(
      // global before hooks
      this.router.beforeHooks
    )
    this.pending = route
    const iterator = (hook, next) => {
      if (this.pending !== route) {
        return abort()
      }
      try {
        hook(route, null, (to) => {
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
    runQueue(queue, iterator, () => {
      if (this.pending !== route) {
        return abort()
      }
      this.pending = null
      onComplete(route)
    })
  }
}
