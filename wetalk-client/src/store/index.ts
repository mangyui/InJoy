import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
// import message from './message'
import routerGo from './routerGo'
import playSong from './playSong'
import setting from './setting'
import actionState from './actionState'
import chatList from './chatList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...playSong.state,
    ...user.state,
    ...routerGo.state,
    ...setting.state,
    ...actionState.state,
    ...chatList.state
  },
  mutations: {
    ...playSong.mutations,
    ...user.mutations,
    ...routerGo.mutations,
    ...setting.mutations,
    ...actionState.mutations,
    ...chatList.mutations
  },
  actions: {

  },
  getters: {
    rememberPhone: state => state.rememberPhone,
    token: state => state.token,
    user: state => state.user,
    city: state => state.user.city,
    msgList: state => state.msgList,
    isForward: state => state.isForward,
    isPlay: state => state.isPlay,
    currentSong: state => state.currentSong,
    songTime: state => state.songTime,
    isShowInOut: state => state.isShowInOut,
    otherWeb: state => state.otherWeb,
    topic: state => state.topic,
    joinAddress: state => state.joinAddress,
    myAddress: state => state.myAddress,
    toLocation: state => state.toLocation,
    chatList: state => state.chatList,
    chatWS: state => state.chatWS
  }
})
