<template>
  <div class="mess-wrap bgWhite" ref="content">
    <van-tabs v-model="active" :border="false" sticky animated line-width="26" :offset-top="0">
      <van-tab title="我的申请" name="m1">
        <NoticeList />
      </van-tab>
      <van-tab title="私信" name="m2">
        <privateChat />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NoticeList from './NoticeList.vue'
import privateChat from './PrivateChat.vue'

@Component({
  components: {
    NoticeList,
    privateChat
  }
})
export default class Message extends Vue {
  active: string = 'm2'
  created () {
  }
}
</script>

<style lang="less" scoped>

</style>
