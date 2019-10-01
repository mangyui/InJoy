export default {
  state: {
    isForward: true // 路由前进
  },
  mutations: {
    GO_ENTER (state: any) {
      state.isForward = true
    },
    GO_BACK (state: any) {
      state.isForward = false
    }
  }
}
