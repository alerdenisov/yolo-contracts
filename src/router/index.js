import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/pages/Home'
import SignUp from '@/containers/pages/SignUp'
import Projects from '@/containers/pages/Projects'
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
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      ...base,
      path: '/submit',
      name: 'Submit',
      component: Submit
    }
  ]
})
