<template>
  <div id="app">
    <!-- <transition :name="transitionName">
      <navigation>
        <router-view v-if="$route.meta.isKeep !== true" class="Router"/>
      </navigation>
    </transition> -->
    <transition :name="transitionName">
      <keep-alive exclude="WorldRoom,MyMap,GarbageList,WebView,PostComment,TopicPost">
        <router-view class="Router"/>
      </keep-alive>
    </transition>
    <transition name="slideleft">
      <AudioBox/>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import AudioBox from '@/components/AudioBox.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AudioBox
  },
  data () {
    return {
      transitionName: 'slideleft'
    }
  },
  watch: {
    $route () { // 监听路由变化重新赋值
      this.$toast.clear()
    }
  },
  created () {
    this.$navigation.on('forward', (to: any, from: any) => {
      this.transitionName = 'slideleft'
      this.$store.commit('GO_ENTER')
    })
    this.$navigation.on('back', (to: any, from: any) => {
      this.transitionName = 'slideright'
      this.$store.commit('GO_BACK')
    })
    this.$navigation.on('replace', (to: any, from: any) => {
      this.transitionName = 'slideleft'
      this.$store.commit('GO_ENTER')
    })
    if (this.$store.getters.user._id && !this.$store.getters.chatWS) {
      this.$store.commit('INIT_WS', this.$store.getters.user)
    } else if (!this.$store.getters.user._id && this.$store.getters.chatWS) {
      this.$store.commit('CLOSE_WS')
    }
  }
})
</script>

<style lang="less">
#app{
  position: relative;
  overflow-x: hidden;
  width: 100%;
}
.Router {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: all .15s ease-in;
  opacity: 1;
}

.slideleft-enter,
 .slideright-leave-active {
  opacity: 0.3;
  z-index: 11;
  transform: translate(100%, 0);
}
// .slideleft-leave-active,
// .slideright-enter {
//   z-index: 9;
//   // opacity: 0;
// }

.slideleft-enter-active{
  z-index: 20;
  // opacity: 0.5;
}
</style>
