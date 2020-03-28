
export default {
  state: {
    topic: {},
    joinAddress: {},
    myAddress: {},
    toLocation: {}
  },
  mutations: {
    SELECT_TOPIC (state: any, newTopic: any) {
      state.topic = newTopic
    },
    REMOVE_TOPIC (state: any) {
      state.topic = {}
    },
    SET_JOIN_ADDRESS (state: any, ja: any) {
      state.joinAddress = ja
    },
    RM_JOIN_ADDRESS (state: any) {
      state.joinAddress = {}
    },
    SET_MY_ADDRESS (state: any, mya: any) {
      state.myAddress = mya
    },
    SET_TO_LOCATION (state: any, location: any) {
      state.toLocation = location
    }
  }
}
