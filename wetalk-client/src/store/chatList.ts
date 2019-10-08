import Message from '../model/message'
import MyChat from '@/util/myChat'

export default {
  state: {
    chatWS: null,
    chatList: JSON.parse(localStorage.getItem('chatList') || '{}') || {}
  },
  mutations: {
    INIT_WS (state: any, user: any) {
      state.chatWS = new MyChat(user)
      state.chatWS.createWebsocket()
    },
    CLOSE_WS (state: any) {
      if (state.chatWS) {
        state.chatWS.close()
        state.chatWS = null
      }
    },
    ADD_USER (state: any, data: any) { // meId: any, user
      let mIndex = data.meId + 'To' + data.user._id
      if (!state.chatList.hasOwnProperty(mIndex)) {
        state.chatList[mIndex] = {
          user: data.user,
          mesgList: []
        }
      } else {
        state.chatList[mIndex].user = data.user
      }
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    RM_USER (state: any, index: number) {
      delete state.chatList[index]
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    ADD_CHAT (state: any, data: any) { // meId: any, user: any,msg: Message
      let mIndex = data.meId + 'To' + data.user._id
      state.chatList = JSON.parse(JSON.stringify(state.chatList))
      if (!state.chatList.hasOwnProperty(mIndex)) {
        state.chatList[mIndex] = {
          user: data.user,
          mesgList: []
        }
      } else {
        state.chatList[mIndex].user = data.user
      }
      let lastmesg = state.chatList[mIndex].mesgList[state.chatList[mIndex].mesgList.length - 1]
      let minute = 10
      if (lastmesg) {
        // @ts-ignore
        minute = Math.floor(Math.abs(new Date() - new Date(lastmesg.time)) / 1000 / 60)
      }
      if (minute > 5) {
        let timeString = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        let message = new Message(timeString, timeString, -1, data.msg.user)
        state.chatList[mIndex].mesgList.push(message)
      }
      state.chatList[mIndex].mesgList.push(data.msg)
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    RM_CHAT (state: any, data: any) { // meId: any, userId: any, msg: Message
      let mIndex = data.meId + 'To' + data.user._id
      if (!state.chatList.hasOwnProperty(mIndex)) {
        return
      }
      let index = '-1'
      for (const key in state.chatList[mIndex].mesgList) {
        if (state.chatList[mIndex].mesgList[key].time === data.msg.time && state.chatList[mIndex].mesgList[key].user._id === data.msg.user._id) {
          index = key
        }
      }
      if (index !== '-1') {
        let msg = state.chatList[mIndex].mesgList[index]
        let time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        let message = new Message(time, (msg.user ? msg.user.name : '对方') + ' 撤回了一条消息', 0, msg.user)
        state.chatList[mIndex].mesgList.splice(index, 1, message)
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
      }
    }
  }
}
