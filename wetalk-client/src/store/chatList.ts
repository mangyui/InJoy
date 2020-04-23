import Message from '../model/message'
import MyChat from '@/util/myChat'
import router from '@/router'

export default {
  state: {
    chatWS: null,
    chatList: JSON.parse(localStorage.getItem('chatList') || '{}') || {}
  },
  mutations: {
    INIT_WS (state: any, user: any) {
      state.chatWS = new MyChat()
      state.chatWS.createWebsocket()
    },
    CLOSE_WS (state: any) {
      if (state.chatWS) {
        state.chatWS.close()
        state.chatWS = null
      }
    },
    ADD_USER (state: any, data: any) { // meId: any, user  // 这个没用到？
      let mIndex = data.meId + 'To' + data.user._id
      if (!state.chatList.hasOwnProperty(mIndex)) {
        state.chatList[mIndex] = {
          user: data.user,
          noRead: 0,
          mesgList: []
        }
      } else {
        state.chatList[mIndex].user = data.user
      }
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    RM_USER (state: any, index: number) {
      state.chatList = JSON.parse(JSON.stringify(state.chatList))
      delete state.chatList[index]
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    ALL_READ (state: any, index: number) {
      state.chatList = JSON.parse(JSON.stringify(state.chatList))
      state.chatList[index].noRead = 0
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    ADD_CHAT (state: any, data: any) { // meId: any, user: any,msg: Message
      let mIndex = data.meId + 'To' + data.user._id
      let currMsg = {
        user: data.user,
        noRead: 0,
        mesgList: []
      }
      state.chatList = JSON.parse(JSON.stringify(state.chatList))
      if (state.chatList.hasOwnProperty(mIndex)) {
        currMsg = {
          user: data.user,
          noRead: state.chatList[mIndex].noRead || 0,
          mesgList: state.chatList[mIndex].mesgList
        }
      }
      let lastmesg = currMsg.mesgList[currMsg.mesgList.length - 1]
      let minute = 10
      if (lastmesg) {
        // @ts-ignore
        minute = Math.floor(Math.abs(new Date() - new Date(lastmesg.time)) / 1000 / 60)
      }
      if (minute > 5) { // 大于5分钟需要添加系统时间消息
        let timeString = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        let message = new Message(timeString, timeString, -1, data.msg.user)
        // @ts-ignore
        currMsg.mesgList.push(message)
      }
      // @ts-ignore
      currMsg.mesgList.push(data.msg)
      if (data.meId !== data.msg.user && !(router.currentRoute.name === 'UserChat' && router.currentRoute.params.id === data.user._id)) {
        currMsg.noRead += 1
        // @ts-ignore
        if (navigator.notification) {
          // @ts-ignore // 响铃
          // navigator.notification.beep(1)
          // @ts-ignore // 提醒
          cordova.plugins.notification.local.schedule({
            title: data.user.name,
            // @ts-ignore
            text: data.msg.type === 2 ? '[图片]' : (data.msg.type === 3 ? '[位置]' : data.msg.content),
            foreground: true
          })
        }
      }
      delete state.chatList[mIndex]
      state.chatList[mIndex] = currMsg
      localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    RM_CHAT (state: any, data: any) { // meId: any, user: any, msg: Message
      state.chatList = JSON.parse(JSON.stringify(state.chatList))
      let mIndex = data.meId + 'To' + data.user._id
      if (!state.chatList.hasOwnProperty(mIndex)) {
        return
      }
      let index = '-1'
      for (const key in state.chatList[mIndex].mesgList) {
        if (state.chatList[mIndex].mesgList[key].time === data.msg.time && state.chatList[mIndex].mesgList[key].user === data.msg.user) {
          index = key
        }
      }
      if (index !== '-1') {
        let msg = state.chatList[mIndex].mesgList[index]
        let time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        let message = new Message(time, (msg.user === data.meId ? '我' : '对方') + ' 撤回了一条消息', 0, msg.user)
        state.chatList[mIndex].mesgList.splice(index, 1, message)
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
      }
    }
  }
}
