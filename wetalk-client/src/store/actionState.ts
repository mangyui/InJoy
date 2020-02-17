
export default {
  state: {
    topic: null,
    joinAddress: {},
    myAddress: {}
  },
  mutations: {
    SELECT_TOPIC (state: any, newTopic: any) {
      state.topic = newTopic
    },
    REMOVE_TOPIC (state: any) {
      state.topic = null
    },
    SET_JOIN_ADDRESS (state: any, ja: any) {
      state.joinAddress = ja
    },
    SET_MY_ADDRESS (state: any, mya: any) {
      state.myAddress = mya
    }
  }
}
