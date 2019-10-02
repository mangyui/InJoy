export default {
  state: {
    isShowInOut: JSON.parse(localStorage.getItem('isShowInOut') || '{}') || false,
    otherWeb: ''
  },
  mutations: {
    SETShowInOut (state: any, isF: boolean) {
      state.isShowInOut = isF
      localStorage.setItem('isShowInOut', state.isShowInOut)
    },
    SET_OTHER_URL (state: any, url: string) {
      state.otherWeb = url
    }
  }
}
