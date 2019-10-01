import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import message from './message'
import routerGo from './routerGo'
import playSong from './playSong'
import setting from './setting'
import topic from './topic'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...playSong.state,
    ...user.state,
    ...message.state,
    ...routerGo.state,
    ...setting.state,
    ...topic.state
  },
  mutations: {
    ...playSong.mutations,
    ...user.mutations,
    ...message.mutations,
    ...routerGo.mutations,
    ...setting.mutations,
    ...topic.mutations
  },
  actions: {

  },
  getters: {
    user: state => state.user,
    city: state => state.user.city,
    msgList: state => state.msgList,
    isForward: state => state.isForward,
    isPlay: state => state.isPlay,
    currentSong: state => state.currentSong,
    isShowInOut: state => state.isShowInOut,
    topic: state => state.topic
  }
})
