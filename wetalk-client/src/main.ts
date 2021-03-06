import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'

import './plugins/vantUI.js'
import '@/styles/index.less'
import '@/styles/mobile.less'
import 'normalize.css'

import './guard.ts'

import './api/get.js'
import './api/post.js'
import './api/upload.js'

import Loading from '@/components/Loading.vue'

import { Toast, Notify } from 'vant'

// @ts-ignore
import Navigation from 'vue-navigation'

Vue.use(Navigation, { router, store, keyName: 'my' })

Vue.component('Loading', Loading)

Vue.prototype.$win = window

Vue.config.productionTip = false

const tools = require('@/util/tools.js')
Vue.prototype.$formatTime = tools.formatTime
Vue.prototype.$commomTime = tools.commomTime
Vue.prototype.$setVideoPoster = tools.setVideoPoster

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
    $notify: Notify
    $toGet: any
    $toPost: any
    $toUpload: any
    $win: any
    $ImagePreview: any
    $navigation: any
    $formatTime: any
    $commomTime: any
    $setVideoPoster: any
  }
}

// document.addEventListener('deviceready', () => {
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// @ts-ignore
//   window.navigator.splashscreen.hide()
// }, false)
