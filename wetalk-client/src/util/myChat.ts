import Vue from 'vue'
import store from '@/store'
import Message from '@/model/message'
import { Notify } from 'vant'
const ReconnectingWebSocket = require('ReconnectingWebSocket')

class MyChat {
  public ws: any
  public user: any
  // public isOver: boolean = false
  constructor () {
    // this.ws = new WebSocket('ws://localhost:9612?userId=' + user._id)
    let user = store.getters.user
    this.ws = new ReconnectingWebSocket('ws://47.106.130.141:9612?userId=' + user._id)
    this.user = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      sex: user.sex
    }
  }

  public creatSending (toUser: any, content: string, type: number): any {
    // 验证是否断开

    var time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    var message = new Message(time, content, type, this.user._id)
    var data = {
      from_user: this.user,
      to_user: [toUser._id],
      message: message,
      my_type: 1 // 1添加消息 2撤回消息
    }

    this.ws.send(JSON.stringify(data))

    // 本地操作自己的消息
    let mydata: any = {
      meId: this.user._id,
      msg: message,
      user: toUser
    }
    store.commit('ADD_CHAT', mydata)
    Vue.nextTick(() => {
      this.scrollBottom()
    })
  }
  public createWebsocket () : any {
    let numberP: number
    this.ws.onopen = (e: any) => {
    }
    this.ws.onerror = (e: any) => {
      Notify({ type: 'danger', message: 'ws暂不可用' })
    }
    this.ws.onmessage = (e: any) => {
      var resData = JSON.parse(e.data)
      // if (resData.to_user === this.user._id || resData.to_user.indexOf(this.user._id) < 0) {
      //   return
      // }
      let data: any = {
        meId: this.user._id,
        msg: resData.message,
        user: resData.from_user
      }
      if (resData.my_type === 2) {
        store.commit('RM_CHAT', data)
      } else {
        store.commit('ADD_CHAT', data)
      }
      Vue.nextTick(() => {
        this.scrollBottom()
      })
    }
  }
  public backoutMess (toUser: any, message: Message) {
    var data = {
      from_user: this.user,
      to_user: [toUser._id],
      message: message,
      my_type: 2
    }
    this.ws.send(JSON.stringify(data))

    // 本地操作自己的消息
    let mydata: any = {
      meId: this.user._id,
      user: toUser,
      msg: message
    }
    store.commit('RM_CHAT', mydata)
    Vue.nextTick(() => {
      this.scrollBottom()
    })
  }
  public scrollBottom (): any {
    try {
      let msgEl = document.querySelector('.mess-list .list-item:last-child')
      if (msgEl) {
        // if (!this.isOver) {
        //   setTimeout(() => {
        //     this.isOver = true
        //     msgEl.scrollIntoView()
        //   }, 300)
        // } else {
        msgEl.scrollIntoView()
      }
    } catch (err) {
      console.error(err)
    }
  }
}
export default MyChat
