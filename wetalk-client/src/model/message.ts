class Message {
  public time: string
  public content: string = ''
  public type: number // -1 为时间提示  0 为系统提示(撤回消息） 1为用户文本消息 2为用户图片消息
  public user: any | null
  constructor (time: string, content: string, type: number, user: any | null) {
    this.time = time
    this.content = content
    this.type = type
    this.user = user
  }
}

export default Message
