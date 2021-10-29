import { createRouter } from '../lib/index'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld.vue')
  }
]

export default createRouter({
  routes
})
