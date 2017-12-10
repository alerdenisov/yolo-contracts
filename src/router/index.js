import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/pages/Home'
import SignUp from '@/containers/pages/SignUp'
import Ideas from '@/containers/pages/Ideas'
import Submit from '@/containers/pages/Submit'

Vue.use(Router)

const base = {
  mode: 'history',
  props: { default: true }
}

export default new Router({
  routes: [
    {
      ...base,
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      ...base,
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      ...base,
      path: '/ideas',
      name: 'Ideas',
      component: Ideas
    },
    {
      ...base,
      path: '/submit',
      name: 'Submit',
      component: Submit
    }
  ]
})
