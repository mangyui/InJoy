import Vue from 'vue'
import store from '@/store'
import Message from '@/model/message'
import { Notify } from 'vant'

class MyChat {
  public ws: any
  public user: any
  // public isOver: boolean = false
  constructor (user: any) {
    this.ws = new WebSocket('ws://localhost:9612?userId=' + user._id)
    // this.ws = new WebSocket('ws://' + window.location.host)
    this.user = user
  }
  public creatSending (toUser: any, content: string, type: number): any {
    var time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    var message = new Message(time, content, type, this.user)
    var data = {
      from_user: this.user._id,
      to_user: [toUser._id, this.user._id],
      fuser: this.user,
      tuser: toUser,
      message: message
    }
    this.ws.send(JSON.stringify(data))
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
      if (resData.to_user.indexOf(this.user._id) < 0) {
        return
      }
      let data: any = {
        meId: this.user._id,
        userId: resData.from_user === this.user._id ? resData.to_user[0] : resData.from_user,
        msg: resData.message
      }
      if (resData.isRemove) {
        store.commit('RM_CHAT', data)
      } else {
        data.user = resData.fuser._id === this.user._id ? resData.tuser : resData.fuser
        store.commit('ADD_CHAT', data)
      }
      Vue.nextTick(() => {
        this.scrollBottom()
      })
    }
  }
  public backoutMess (toUserId: any, message: Message) {
    var data = {
      from_user: this.user._id,
      to_user: [toUserId, this.user._id],
      message: message,
      isRemove: true
    }
    this.ws.send(JSON.stringify(data))
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
