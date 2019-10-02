<template>
  <div class="open_window">
    <van-nav-bar class="litheme" :border="false" title="" fixed left-arrow  @click-left="$router.go(-1)">
      <!-- <van-icon name="ellipsis" slot="right"/> -->
    </van-nav-bar>
    <iframe :src="$store.getters.otherWeb" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WebView extends Vue {
  text: string = ''
  created () {
    if (!this.$store.getters.otherWeb || this.$store.getters.otherWeb === '') {
      this.$notify({ type: 'warning', message: '网址错误' })
      setTimeout(() => {
        this.$router.go(-1)
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.open_window{
  position: relative;
  font-size: 0;
  padding-top: 44px;
  iframe{
    width: 100%;
    height: 100%;
  }
}
.close-btn{
  position: fixed;
  right: -22px;
  top: 50%;
  transform: translateY(-20px);
  width: 40px;
  height: 40px;
  z-index: 999;
  background: #f44;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(20, 10, 10, 0.5);
  opacity: 0.85;
  display: flex;
  align-items: center;
  padding: 7px;
  i{
    font-size: 22px;
  }
}
</style>
