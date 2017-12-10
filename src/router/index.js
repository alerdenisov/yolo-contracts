import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'history',
      path: '/',
      name: 'Home',
      component: Home,
      props: { default: true }
    }
  ]
})
