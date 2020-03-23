import router from './router'
import store from './store'
// import User from './model/user'
import { Route } from 'vue-router/types/router'
const whiteList = [
  'Message',
  'UserEdit',
  'PostAdd',
  'PostComment',
  'UserChat',
  'JoinAdd',
  'UserQrCode',
  'JoinEdit',
  'UserJoin',
  'ApplyJoin'
] // 重定向白名单

router.beforeEach((to: Route, from: Route, next: any) => {
  if (!store.getters.user._id || !store.getters.token) {
    if (to.name && whiteList.indexOf(to.name) >= 0) {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.name === 'Login') {
      next('/')
    } else {
      next()
    }
  }
})

router.afterEach((to: Route, from: Route) => {
  // setTimeout(() => {
  //   let app = document.getElementById('app')
  //   if (app && to.name !== 'Lobby' && to.name !== 'Dynamic') {
  //     app.scrollTo(0, 0)
  //   }
  // }, 0)
})
