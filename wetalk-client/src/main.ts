import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import '@/util/pcRem.js'

import './plugins/vantUI.js'
import '@/styles/index.less'
import '@/styles/mobile.less'
import 'normalize.css'

import './guard.ts'

import './api/get.js'
import './api/post.js'
import './api/upload.js'

import { Toast, Notify } from 'vant'

// @ts-ignore
import Navigation from 'vue-navigation'

Vue.prototype.$win = window

Vue.config.productionTip = false

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
  }
}

Vue.use(Navigation, { router, store, keyName: 'my' })

const tools = require('@/util/tools.js')
Vue.prototype.$formatTime = tools.formatTime

document.addEventListener('deviceready', () => {
  new Vue({
    // el: '#app',
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  // @ts-ignore
  window.navigator.splashscreen.hide()
}, false)
