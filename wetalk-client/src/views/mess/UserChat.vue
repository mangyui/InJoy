<template>
  <div class="talk-room bgMax">
    <van-nav-bar class="litheme" :border="false" fixed :title="toUser.name||'乐聊'" left-arrow  @click-left="$router.go(-1)">
      <van-icon name="weapp-nav" slot="right" />
    </van-nav-bar>
    <div class="my-content-box max1100" @click="$refs.inputB.noMore()">
      <div class="mess-box" :style="{paddingBottom: isMore!=0?'200px':'36px'}">
        <div class="mess-list"  v-if="chatList[chatKey]">
          <div class="list-item" v-for="(item,index) in chatList[chatKey].mesgList" :key="index">
            <div class="mess-item" v-if="item.type==1&&item.user._id!=user._id">
              <div class="mu-avatar">
                <img :src="item.user.avatar||'./imgs/avatar.png'">
                <img class="icon-sex" :src="item.user.sex==1?require('@/assets/img/male.svg'):require('@/assets/img/female.svg')">
              </div>
              <div class="mess-item-right">
                <!-- <span>{{item.user.name}}</span> -->
                <p class="mess-item-content">{{item.content}}</p>
                <!-- <p class="mess-item-time">{{item.time}}</p> -->
              </div>
            </div>
            <div class="mess-item-me" v-else-if="item.type==1&&item.user._id==user._id">
              <div class="mu-avatar">
                <img :src="user.avatar||'./imgs/avatar.png'">
                <img class="icon-sex" :src="user.sex==1?require('@/assets/img/male.svg'):require('@/assets/img/female.svg')">
              </div>
              <div class="mess-item-right">
                <!-- <span>{{user.name}}</span> -->
                <p class="mess-item-content" @touchstart="gtouchstart(index, )" @touchend="gtouchend">{{item.content}}</p>
                <!-- <p class="mess-item-time">{{item.time}}</p> -->
              </div>
            </div>
            <div class="mess-system" v-else>
              {{item.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <InputBox v-show="toUser._id" ref="inputB" :isPic="true" @changeMore="changeMore" @toSend="toSend"></InputBox>
    <van-action-sheet
      v-model="showMore"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="showMore=false"
    />
  </div>
</template>

<script lang="ts">
import Message from '@/model/message'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import InputBox from '@/components/InputBox.vue'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['chatList'])
  },
  components: {
    InputBox
  }
})
export default class UserChat extends Vue {
  @Getter user!: any // ！声明肯定会有值

  toUser: any = {}
  isMore: number = 0

  chatKey: string = ''

  mIndex: number = -1
  showMore: boolean = false
  timeOutEvent: any
  actions: Array<any> = [
    { name: '复制' },
    { name: '撤回' }
  ]

  changeMore (newValue: number): void {
    this.isMore = newValue
  }
  backMess (index: number): void {
    this.$store.getters.chatWS.backoutMess(this.toUser._id, this.$store.getters.chatList[this.chatKey].mesgList[index])
  }
  toSend (sendText: string): void {
    if (sendText.trim() !== '') {
      this.$store.getters.chatWS.creatSending(this.toUser, sendText, 1)
    }
  }
  gtouchstart (mIndex: number) {
    // 开始触摸
    this.timeOutEvent = setTimeout(() => {
      this.showMore = true
      this.mIndex = mIndex
    }, 444)
  }
  gtouchend () {
    clearTimeout(this.timeOutEvent)
  }
  onSelect (item: any, index: number) {
    if (index === 1) {
      this.backMess(this.mIndex)
    }
    this.showMore = false
  }
  getUser () {
    this.$toPost.getUserById({ id: this.$route.params.id }).then((res: any) => {
      if (res.data && res.data._id) {
        this.toUser = res.data
        this.chatKey = this.user._id + 'To' + this.toUser._id
        // let data = {
        //   meId: this.user._id,
        //   user: this.toUser
        // }
        // this.$store.commit('ADD_USER', data)
      } else {
        this.$notify({ type: 'warning', message: '用户不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  activated () {
    // let msgEl = document.querySelector('.mess-list .list-item:last-child')
    // console.log(msgEl)
    // if (msgEl) {
    //   msgEl.scrollIntoView()
    // }
  }
  created () {
    this.getUser()
  }
  beforeDestroy () {
    // this.myTalk.ws.close()
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/chatroom.less';

</style>
