import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Index.vue'

import Lobby from '@/views/post/Index.vue'
import Join from '@/views/join/Index.vue'
import Message from '@/views/mess/Index.vue'
import UserCenter from '@/views/user/UserCenter.vue'

import UserJoin from '@/views/user/UserJoin.vue'

import MapJoin from '@/views/join/MapJoin.vue'
import JoinEdit from '@/views/join/JoinEdit.vue'
import JoinDetails from '@/views/join/Details.vue'
import MapChoose from '@/views/join/MapChoose.vue'

import Location from '@/views/common/Location.vue'

import Search from '@/views/home/Search.vue'
import PostDetails from '@/views/post/Details.vue'
import PostComment from '@/views/post/Comment.vue'
import PostAdd from '@/views/post/Add.vue'
import Topic from '@/views/post/Topic.vue'
import TopicPost from '@/views/post/TopicPost.vue'

import RefuseClass from '@/views/refuseClass/Index.vue'
import GarbageImg from '@/views/refuseClass/Image.vue'
import GarbageList from '@/views/refuseClass/List.vue'
import RefuseSearch from '@/views/refuseClass/Search.vue'
// import WorldRoom from '@/views/WorldRoom.vue'
import UserChat from '@/views/mess/UserChat.vue'

import UserHomePage from '@/views/user/UserHomePage.vue'
import UserEdit from '@/views/user/UserEdit.vue'
import UserFollower from '@/views/user/UserFollower.vue'
import UserFollowing from '@/views/user/UserFollowing.vue'
import UserQrCode from '@/views/user/UserQrCode.vue'

import Setting from '@/views/Setting.vue'
import Weather from '@/views/more/MyWeather.vue'

import Music from '@/views/more/Music.vue'
import MyMap from '@/views/more/MyMap.vue'
import Games from '@/views/more/Games.vue'
import Applications from '@/views/more/Applications.vue'

import Base64 from '@/views/applications/Base64.vue'
import Other from '@/views/more/Other.vue'
import Web from '@/views/web/Index.vue'
import Login from '@/views/login/Index.vue'

Vue.use(Router)

const router:Router = new Router({
  routes: [
    {
      path: '',
      redirect: '/home/join'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { isKeep: true },
      redirect: '/home/join',
      children: [
        {
          path: 'lobby',
          name: 'Lobby',
          meta: { isKeep: true },
          component: () => import('@/views/post/Index.vue')
        },
        {
          path: 'join',
          name: 'Join',
          meta: { isKeep: true },
          component: Join // () => import('@/views/Join/Index.vue')
        },
        {
          path: 'message',
          name: 'Message',
          meta: { isKeep: true },
          component: Message // () => import('@/views/mess/Index.vue')
        },
        {
          path: 'usercenter',
          name: 'UserCenter',
          meta: { isKeep: true },
          component: UserCenter // () => import('@/views/user/UserCenter.vue')
        }
      ]
    },
    {
      path: '/location',
      name: 'Location',
      component: Location // () => import('@/views/common/Location.vue')
    },
    {
      path: '/mapJoin',
      name: 'MapJoin',
      component: MapJoin // () => import('@/views/join/MapJoin.vue')
    },
    {
      path: '/joinEdit',
      name: 'JoinEdit',
      component: JoinEdit // () => import('@/views/join/JoinEdit.vue')
    },
    {
      path: '/joinDetails/:id',
      name: 'JoinDetails',
      component: JoinDetails // () => import('@/views/join/Details.vue')
    },
    {
      path: '/mapChoose',
      name: 'MapChoose',
      component: MapChoose // () => import('@/views/join/MapChoose.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: Search // () => import('@/views/home/Search.vue')
    },
    {
      path: '/postdetails/:id',
      name: 'PostDetails',
      component: PostDetails // () => import('@/views/post/Details.vue')
    },
    {
      path: '/postcomment/:id',
      name: 'PostComment',
      component: PostComment // () => import('@/views/post/Comment.vue')
    },
    {
      path: '/postadd',
      name: 'PostAdd',
      component: PostAdd // () => import('@/views/post/Add.vue')
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic // () => import('@/views/post/Topic.vue')
    },
    {
      path: '/topicpost/:id',
      name: 'TopicPost',
      component: TopicPost // () => import('@/views/post/TopicPost.vue')
    },
    {
      path: '/garbageimg',
      name: 'GarbageImg',
      component: GarbageImg // () => import('@/views/refuseClass/Image.vue')
    },
    {
      path: '/garbagelist/:id',
      name: 'GarbageList',
      component: GarbageList // () => import('@/views/refuseClass/List.vue')
    },
    {
      path: '/refusesearch',
      name: 'RefuseSearch',
      component: RefuseSearch // () => import('@/views/refuseClass/Search.vue')
    },
    // {
    //   path: '/worldroom',
    //   name: 'WorldRoom',
    //   component: WorldRoom // () => import('@/views/WorldRoom.vue')
    // },
    {
      path: '/userchat/:id',
      name: 'UserChat',
      component: UserChat // () => import('@/views/mess/UserChat.vue')
    },
    {
      path: '/userjoin',
      name: 'UserJoin',
      component: UserJoin // () => import('@/views/user/UserJoin.vue')
    },
    {
      path: '/userhomepage/:id',
      name: 'UserHomePage',
      component: UserHomePage // () => import('@/views/user/UserHomePage.vue')
    },
    {
      path: '/useredit',
      name: 'UserEdit',
      component: UserEdit // () => import('@/views/user/UserEdit.vue')
    },
    {
      path: '/userqrcode',
      name: 'UserQrCode',
      component: UserQrCode // () => import('@/views/user/UserQrCode.vue')
    },
    {
      path: '/followers/:id',
      name: 'UserFollower',
      component: UserFollower // () => import('@/views/user/UserFollower.vue')
    },
    {
      path: '/following/:id',
      name: 'UserFollowing',
      component: UserFollowing // () => import('@/views/user/UserFollowing.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting // () => import('@/views/Setting.vue')
    },
    {
      path: '/refuseclass',
      name: 'RefuseClass',
      component: RefuseClass // () => import('@/views/refuseClass/Index.vue')
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather // () => import('@/views/more/MyWeather.vue')
    },
    {
      path: '/music',
      name: 'Music',
      component: Music // () => import('@/views/more/Music.vue')
    },
    {
      path: '/mymap',
      name: 'MyMap',
      component: MyMap // () => import('@/views/more/MyMap.vue')
    },
    {
      path: '/games',
      name: 'Games',
      component: Games // () => import('@/views/more/Games.vue')
    },
    {
      path: '/applications',
      name: 'Applications',
      component: Applications // () => import('@/views/more/Applications.vue')
    },
    {
      path: '/applications/base64',
      name: 'Base64',
      component: Base64 // () => import('@/views/applications/Base64.vue')
    },
    {
      path: '/other',
      name: 'Other',
      component: Other // () => import('@/views/more/Other.vue')
    },
    {
      path: '/web',
      name: 'Web',
      component: Web // () => import('@/views/web/Index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login // () => import('@/views/login/Index.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     router.replace(targetPath)
//   }
// })

export default router
