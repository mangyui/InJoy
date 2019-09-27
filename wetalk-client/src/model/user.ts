class User {
  public _id: string // 当前以时间为id
  public phone: string = ''
  public name: string = ''
  public sex: number = 0
  public avatar : string
  public age: number
  public cityCode: string
  public province: string
  public city: string
  constructor (id: string, name: string, avatar: string, sex: number) {
    this._id = id
    this.name = name
    this.avatar = avatar
    this.phone = ''
    this.age = 0
    this.sex = sex
    this.cityCode = ''
    this.province = ''
    this.city = ''
    if (this.name === '') {
      this.name = '游客'
    }
  }
  getUserId (): string {
    return this._id
  }
}

export default User
