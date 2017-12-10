import Vue from 'vue'
import App from './containers/App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import AsyncComputed from 'vue-async-computed'

locale.use(lang)

Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(AsyncComputed)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})
