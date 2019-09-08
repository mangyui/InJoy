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
      component: () => import('@/views/Home.vue'),
      redirect: '/home/lobby',
      children: [
        {
          path: 'lobby',
          name: 'Lobby',
          component: () => import('@/components/Lobby.vue')
        },
        {
          path: 'usercenter',
          name: 'UserCenter',
          component: () => import('@/components/UserCenter.vue')
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
      component: () => import('@/views/UserHomePage.vue')
    },
    {
      path: '/useredit',
      name: 'UserEdit',
      component: () => import('@/views/UserEdit.vue')
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
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
