// 加载vue-router的类型定义
import './vue'

import { RouteConfig, NavigationGuard, Route, RawLocation, RouterOptions } from "./router";
import { PluginFunction } from 'vue'

type WeexRouterOptions = {
  routes?: RouteConfig[]
}
type ErrorHandler = (err: Error) => void

declare class WeexPageRouter {
  constructor(options?: WeexRouterOptions)
  beforeEach(guard: NavigationGuard): Function
  beforeResolve(guard: NavigationGuard): Function
  afterEach(hook: (to: Route, from: Route) => any): Function
  push(location: RawLocation): Promise<Route>
  replace(location: RawLocation): Promise<Route>
  push(
    location: RawLocation,
    onComplete?: Function,
    onAbort?: ErrorHandler
  ): void
  replace(
    location: RawLocation,
    onComplete?: Function,
    onAbort?: ErrorHandler
  ): void
  go(n: number): void
  back(): void
}

declare type WeexVueRouter = {
  router: VueRouter,
  weexRouter: WeexPageRouter
}

export function createRouter(options?: RouterOptions): WeexVueRouter

export default class WeexRouter {
  static install: PluginFunction<any>
}

export {
  RouterMode,
  RouteMeta,
  RawLocation,
  RedirectOption,
  RouterOptions,
  RouteConfig,
  RouteRecord,
  RouteRecordPublic,
  Location,
  Route,
  NavigationGuard,
  NavigationGuardNext,
  NavigationFailureType,
  NavigationFailure
} from './router'
