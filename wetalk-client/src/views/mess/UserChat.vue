<template>
  <div class="talk-room bgMax">
    <van-nav-bar class="litheme" :border="false" fixed :title="toUser.name||'乐聊'" left-arrow  @click-left="$router.go(-1)">
      <van-icon name="weapp-nav" slot="right" />
    </van-nav-bar>
    <div class="chat-mesg-box max1100" @click="$refs.inputB.noMore()" ref="content">
      <div class="mess-box" :style="{paddingBottom: isMore!=0?'210px':'60px'}">
        <div class="mess-list"  v-if="chatList[chatKey]">
          <div class="list-item" v-for="(item,index) in chatList[chatKey].mesgList" :key="index">
            <div class="mess-item" v-if="item.type>0&&item.user._id!=user._id">
              <div class="mu-avatar">
                <img :src="chatList[chatKey].user.avatar||'./imgs/avatar.png'">
                <img class="icon-sex" :src="chatList[chatKey].user.sex==1?'./icons/male.svg':'./icons/female.svg'">
              </div>
              <div class="mess-item-right">
                <van-image v-if="item.type==2" lazy-load :src="item.content"  @click="lookImg(item.content)"/>
                <p v-else class="mess-item-content">{{item.content}}</p>
              </div>
            </div>
            <div class="mess-item-me" v-else-if="item.type>0&&item.user._id==user._id">
              <div class="mu-avatar">
                <img :src="user.avatar||'./imgs/avatar.png'">
                <img class="icon-sex" :src="user.sex==1?'./icons/male.svg':'./icons/female.svg'">
              </div>
              <div class="mess-item-right">
                <van-image v-if="item.type==2" @touchstart.native="gtouchstart(index)" @touchend.native="gtouchend" lazy-load :src="item.content" @click="lookImg(item.content)"/>
                <p v-else class="mess-item-content" @touchstart="gtouchstart(index)" @touchend="gtouchend">{{item.content}}</p>
              </div>
            </div>
            <div class="mess-system" v-else>
              {{item.type == -1 ? $formatTime(item.content):item.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <InputBox v-show="toUser._id" ref="inputB" :isPic="true" @changeMore="changeMore" @toSend="toSend" @toImg="toImg"></InputBox>
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
    { name: '撤回' }
  ]

  changeMore (newValue: number): void {
    this.isMore = newValue
  }
  backMess (index: number): void {
    try {
      let mesg = this.$store.getters.chatList[this.chatKey].mesgList[index]
      // @ts-ignore
      let minute = Math.floor(Math.abs(new Date() - new Date(mesg.time)) / 1000 / 60)
      if (minute < 2) {
        this.$store.getters.chatWS.backoutMess(this.toUser, mesg)
      } else {
        this.$toast('超过时长，无法撤回')
      }
    } catch (err) {
      console.log(err)
      this.$toast('无法撤回')
    }
  }
  toSend (sendText: string): void {
    if (sendText.trim() !== '') {
      this.$store.getters.chatWS.creatSending(this.toUser, sendText, 1)
    }
  }
  toImg (imgUrl: string): void {
    if (imgUrl.trim() !== '') {
      this.$store.getters.chatWS.creatSending(this.toUser, imgUrl, 2)
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
    if (index === 0) {
      this.backMess(this.mIndex)
    }
    this.showMore = false
  }
  getUser () {
    this.$toPost.getUserById({ id: this.$route.params.id }).then((res: any) => {
      if (res.data && res.data._id) {
        this.toUser = res.data
        this.chatKey = this.user._id + 'To' + this.toUser._id
        Vue.nextTick(() => {
          // @ts-ignore
          this.$refs.content.scrollTop = this.$refs.content.scrollHeight
        })
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
  lookImg (img: string) {
    this.$ImagePreview({
      images: [img],
      showIndex: false,
      closeOnPopstate: true,
      loop: false
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
}
</script>

<style lang="less" scoped>
@import '../../styles/chatroom.less';
.chat-mesg-box{
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
