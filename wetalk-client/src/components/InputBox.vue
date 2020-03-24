<template>
  <div class="talk-bottom">
    <div class="talk-send">
      <textarea class="input-mess" :placeholder="replyName?'回复 @'+replyName+':':''" v-model="sendText" rows="1" name="text" @focus="isMore=0"></textarea>
      <van-icon class="input-icon" name="smile-o" @click="isMore=(isMore!=2?2:0)"/>
      <van-button v-show="sendText!=''" @click="toSend" type="danger">发送</van-button>
      <van-icon v-if="isPic" class="input-icon" v-show="sendText==''" name="add-o" @click="isMore=(isMore!=1?1:0)"/>
    </div>
    <div class="send-more" :style="isMore==0?'height: 0':''">
      <div v-show="isMore==2" class="emoticon-wrap">
        <van-swipe ref="vanSwipe" :autoplay="0" indicator-color="#8b81f9" :loop="false">
          <van-swipe-item>
            <div class="emoticon-box">
              <span v-for="(item, index) in Emoticon" :key="index" @click="sendText+=item">
                {{item}}
              </span>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="emoticon-box">
              <span v-for="(item, index) in Emoticon2" :key="index" @click="sendText+=item">
                {{item}}
              </span>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="emoticon-box">
              <span v-for="(item, index) in Emoticon3" :key="index" @click="sendText+=item">
                {{item}}
              </span>
            </div>
          </van-swipe-item>
        </van-swipe>
        <!-- <span v-for="(item, index) in Emoticon" :key="index" @click="sendText+=item">
          {{item}}
        </span> -->
      </div>
      <div v-show="isMore==1" class="add-more">
        <div>
          <van-uploader
          :after-read="readImg"
          :max-count="1">
            <van-icon class="input-icon" name="photo" color="#8b81f9"></van-icon><p>图片</p>
          </van-uploader>
        </div>
        <div><van-icon class="input-icon" name="volume" color="#9E9E9E"></van-icon><p>语音</p></div>
        <div @click="toLocation"><van-icon class="input-icon" name="map-marked" color="#2196F3"></van-icon><p>位置</p></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class InputBox extends Vue {
  @Prop() isPic!: boolean
  @Prop() replyName!: string

  screenWidth: any = document.body.clientWidth
  sendText: string = ''
  isMore: number = 0
  Emoticon: Array<any> = ['😏', '😡', '😄', '😆', '😅', '😂', '😊',
    '🙂', '🙃', '😉', '😓', '😴', '🙄', '🤔',
    '🤑', '🤬', '🥶', '🥵', '🤢', '🤮', '🤯']
  Emoticon2: Array<any> = ['🔥', '⚡️', '💤', '👻', '😈', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵']
  Emoticon3: Array<any> = ['🍏', '🍎', '🍊', '🍐', '🍋', '🍌', '🍉', '🍈', '🍑', '🍍', '🍅', '🌽', '🍠', '🍯', '🍞', '🧀', '🍗']
  @Watch('isMore')
  changeAge (newValue: number, oldValue: number) {
    Vue.nextTick(() => {
      // @ts-ignore
      this.$refs.vanSwipe.resize()
    })
    this.$emit('changeMore', this.isMore)
  }
  public noMore () {
    this.isMore = 0
  }
  public toSend (): any {
    if (this.sendText.trim() !== '') {
      this.$emit('toSend', this.sendText)
      this.sendText = ''
    }
  }
  toLocation () {
    this.$store.commit('RM_JOIN_ADDRESS')
    this.$router.push('/mapChoose')
  }
  readImg (file: any) {
    let data = new FormData()
    data.append('myimg', file.file)
    this.$toUpload.uploadImg(data).then((res: any) => {
      this.$emit('toImg', res.data)
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('图片发送功能异常')
    })
  }
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.send-more{
  padding: 0 10px;
  height: 180px;
  display: flex;
  align-items: center;
  background: #fdfdfd;
  overflow: hidden;
  transition: 0.1s;
}
.add-more{
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  padding: 24px 0;
  color: #666;
  text-align: center;
  div{
    padding: 0 10px;
  }
  .input-icon{
    font-size: 35px;
    margin-bottom: 10px;
  }
}
.input-mess{
  font-size: 16px;
  resize:none;
  padding: 5px 5px 0;
}
.input-icon{
  font-size: 32px;
  color: #666;
}
.emoticon-wrap{
  width: 100%;
  padding: 5px 0;
}
.emoticon-box{
  padding: 15px 5px 25px;
  display: flex;
  flex-wrap: wrap;
  span{
    display: inline-block;
    text-align: center;
    width: 49px;
    font-size: 22px;
    margin-bottom: 15px;
  }
}
</style>
