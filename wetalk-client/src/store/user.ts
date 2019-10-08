// import User from '../model/user'

export default {
  state: {
    rememberPhone: localStorage.getItem('rememberPhone') || null,
    user: JSON.parse(localStorage.getItem('user') || '{}') || {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    SAVE_PHONE (state: any, rememberPhone: string) {
      state.rememberPhone = rememberPhone
      localStorage.setItem('rememberPhone', rememberPhone)
    },
    SET_TOKEN (state: any, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    REMOVE_TOKEN (state: any) {
      state.token = null
      localStorage.removeItem('token')
    },
    updateUserAvatar (state: any, avatar: string) {
      state.user.avatar = avatar
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    updateUserName (state: any, name: string) {
      state.user.name = name
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    initUserInfo (state: any, user: any) {
      if (!user.name || user.name.trim() === '') {
        user.name = user.phone
      }
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logoutUser (state: any) {
      state.user = {}
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {}
}
