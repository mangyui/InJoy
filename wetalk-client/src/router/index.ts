import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router:Router = new Router({
  routes: [
    {
      path: '',
      redirect: '/home/lobby'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/Index.vue'),
      redirect: '/home/lobby',
      children: [
        {
          path: 'lobby',
          name: 'Lobby',
          component: () => import('@/views/lobby/Index.vue')
        },
        {
          path: 'dynamic',
          name: 'Dynamic',
          component: () => import('@/views/dynamic/Index.vue')
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('@/views/mess/Index.vue')
        },
        {
          path: 'usercenter',
          name: 'UserCenter',
          component: () => import('@/views/user/UserCenter.vue')
        }
      ]
    },
    {
      path: '/worldroom',
      name: 'WorldRoom',
      component: () => import('@/views/WorldRoom.vue')
    },
    {
      path: '/userhomepage',
      name: 'UserHomePage',
      component: () => import('@/views/user/UserHomePage.vue')
    },
    {
      path: '/useredit',
      name: 'UserEdit',
      component: () => import('@/views/user/UserEdit.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/Setting.vue')
    },
    {
      path: '/weather',
      name: 'Weather',
      component: () => import('@/views/more/MyWeather.vue')
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('@/views/more/Music.vue')
    },
    {
      path: '/mymap',
      name: 'MyMap',
      component: () => import('@/views/more/MyMap.vue')
    },
    {
      path: '/games',
      name: 'Games',
      component: () => import('@/views/more/Games.vue')
    },
    {
      path: '/applications',
      name: 'Applications',
      component: () => import('@/views/more/Applications.vue')
    },
    {
      path: '/applications/base64',
      name: 'Base64',
      component: () => import('@/views/applications/Base64.vue')
    },
    {
      path: '/other',
      name: 'Other',
      component: () => import('@/views/more/Other.vue')
    },
    {
      path: '/web/:url',
      name: 'Web',
      component: () => import('@/views/web/index.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
