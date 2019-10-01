
export default {
  state: {
    topic: null
  },
  mutations: {
    SELECT_TOPIC (state: any, newTopic: any) {
      state.topic = newTopic
    },
    REMOVE_TOPIC (state: any) {
      state.topic = null
    }
  }
}
