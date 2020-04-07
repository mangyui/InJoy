<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="活动详情" left-arrow
      @click-left="$router.go(-1)">
      <van-icon name="qr" slot="right" @click="showQr=true"/>
      <van-icon name="ellipsis" slot="right" @click="showEdit=true"/>
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <van-pull-refresh class="max1100"  :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getJoinById"  @click.native="isComment=false">
        <van-swipe :autoplay="0" style="height: 65vw; max-height:625px" @change="onChange"  :style="{backgroundImage: 'url(./imgs/noimg.jpg)'}">
          <van-swipe-item v-if="currJoin.video">
            <video :src="currJoin.video" controls="controls"
            @loadeddata="$setVideoPoster" preload controlslist="nodownload" crossorigin="Anonymous"></video>
          </van-swipe-item>
          <van-swipe-item v-for="(image, index) in currJoin.imgList" :key="index" @click="toShowImg(index)">
            <van-image fit="cover" :src="image"/>
          </van-swipe-item>
          <div v-if="currJoin.video||currJoin.imgList[0]" class="custom-indicator" slot="indicator">
            {{ current + 1 }}/{{currJoin.video?(currJoin.imgList.length+1):currJoin.imgList.length}}
          </div>
        </van-swipe>
        <div class="join-details-warp">
          <div class="join-title join-wrap">
            <div class="flex-rlc">
              <h2>{{currJoin.title}}</h2>
              <span><b class="join-number">{{currJoin.count}}</b>/{{currJoin.total}} 人</span>
            </div>
            <div>
              <p><van-icon name="label" /> {{['线上约', '线下约'][currJoin.type]}}</p>
              <p><van-icon name="underway" />{{$commomTime(currJoin.time)}}</p>
            </div>
          </div>
          <div class="join-user join-wrap">
            <div class="people-box">
              <img :src="currJoin.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + currJoin.user._id)">
              <div class="people-text mg-l-5">
                <span @click.stop="$router.push('/userhomepage/' + currJoin.user._id)">{{currJoin.user.name||'匿名'}}</span>
              </div>
              <van-icon name="arrow" color="#ccc" />
            </div>
          </div>
          <div class="join-text join-wrap">
            <h3>活动详情</h3>
            <p>
              {{currJoin.details}}
            </p>
          </div>
          <div v-if="currJoin.place" class="join-place join-wrap">
            <h3>地址详情</h3>
            <p @click="gotoLocation">
              <img :src="'./imgs/mapMin.png'">{{currJoin.place}}
            </p>
          </div>
        </div>
        <van-cell class="join-apply-cell" title="申请人数" is-link :value="currJoin.applyCount || 0" @click="$router.push('/applyList/'+currJoin._id)"/>
        <div class="comment-line">全部留言({{commentList.length}})</div>
        <div class="comment-box post-box white-wrap">
          <div class="post-item" v-for="(item,index) in commentList" :key="index">
            <div class="post-user">
              <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <div class="post-user-text">
                <div class="flex-c">
                  <b @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name}}</b>
                  <van-tag v-show="item.user._id===currJoin.user._id" color="#7232dd" plain>主办人</van-tag>
                </div>
                <p>{{$formatTime(item.time)}}</p>
              </div>
              <div>
                <span class="comment-item-btn" @click.stop="replyComment(item)">回复Ta</span>
              </div>
            </div>
            <div class="post-content">
              <p class="my-max-height">{{item.content}}</p>
              <div v-if="item.replyList&&item.replyList[0]" class="scomment-box">
                <p v-for="scmoment in item.replyList" :key="scmoment._id">
                  <router-link :to="'/userhomepage/' + scmoment.user._id">{{scmoment.user.name}}</router-link>
                  : {{scmoment.content}}
                </p>
              </div>
              <van-divider />
            </div>
          </div>
          <div class="white-wrap my-tip-box">
            {{!commentList[0]?'还没有人抢沙发':'没有更多了'}}
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <transition name="van-slide-up">
      <div class="join-bottom-btn max1100" v-show="!isComment">
        <van-button type="info" @click.stop="replyComment(null)">留言</van-button>
        <van-button v-if="currJoin.user&&user._id!==currJoin.user._id" type="primary" :disabled="currJoin.alreadyApply?true:false" @click.stop="$router.push('/applyJoin/'+currJoin._id)">{{currJoin.alreadyApply?'已申请':'立即参与'}}</van-button>
        <van-button v-if="currJoin.user&&user._id===currJoin.user._id" class="btn-theme" type="info" @click.stop="$router.push('/joinEdit/'+currJoin._id)">修改</van-button>
        <van-button v-else class="btn-theme" type="info" @click.stop="$router.push('/userchat/'+currJoin.user._id)">聊一聊</van-button>
      </div>
    </transition>
    <transition name="van-slide-up">
      <InputBox v-if="isComment" :replyName="commentItem?commentItem.user.name:''" @toSend="toSend"/>
    </transition>
    <van-action-sheet v-model="showQr" :round="true" close-icon="cross"
    title="活动扫码分享">
      <div>
        <qrcode
          :url="'http://47.106.130.141:9566/#/joinDetails/' + $route.params.id"
          :wid="160"
          :hei="160"/>
        <p>打开乐中扫一扫，扫我</p>
      </div>
    </van-action-sheet>
    <van-action-sheet
      title=""
      close-icon=""
      v-model="showEdit"
      :actions="actions"
      cancel-text="取消"
      :round="true"
    />
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import InputBox from '@/components/InputBox.vue'
// @ts-ignore
import qrcode from 'vue_qrcodes'

@Component({
  components: {
    InputBox,
    qrcode
  }
})
export default class JoinDetails extends Vue {
  @Getter user!: any
  showEdit: boolean = false
  showMask: boolean = true
  showQr: boolean = false
  isRefresh: boolean = false
  isComment: boolean = false
  commentItem: any = {}
  commentList: Array<any> = []
  actions: Array<any> = [
    { name: '举报', disabled: true }
  ]
  current: number = 0
  currJoin: any = {
    title: '',
    type: 1,
    details: '',
    total: 1,
    count: 0,
    time: '',
    place: '',
    pointX: '',
    pointY: '',
    imgList: [],
    user: {}
  }
  getJoinById () {
    let data: any = {
      id: this.$route.params.id,
      viewer: this.user._id
    }
    this.$toPost.getJoinById(data).then((res: any) => {
      if (res.data && res.data._id) {
        this.currJoin = res.data
        if (this.currJoin.imgList && this.currJoin.imgList[0].trim() === '') {
          this.currJoin.imgList = []
        }
        this.showMask = false
        this.isRefresh = false
        this.getJoinComment()
      } else {
        this.$notify({ type: 'warning', message: '活动不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  onChange (index: any) {
    this.current = index
  }
  toShowImg (index: number) {
    this.$ImagePreview({
      images: this.currJoin.imgList,
      startPosition: index,
      closeOnPopstate: true,
      loop: false
    })
  }
  gotoLocation () {
    let point = new this.$win.BMap.Point(this.currJoin.pointX, this.currJoin.pointY)
    this.$store.commit('SET_TO_LOCATION', { point })
    this.$router.push('/location')
  }
  getJoinComment () {
    this.$toPost.getJoinCommentList({ joinId: this.$route.params.id }).then((res: any) => {
      res.data.pop()
      this.optionCommentList(res.data)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  optionCommentList (arr: any) {
    arr.forEach((element: any) => {
      if (!element.comment) {
        element.replyList = []
        this.commentList.unshift(element)
      }
    })
    arr.forEach((element: any) => {
      if (element.comment) {
        this.commentList.forEach((item: any, index: number) => {
          if (item._id === element.comment) {
            this.commentList[index].replyList.unshift(element)
          }
        })
      }
    })
  }
  replyComment (item: any) {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    this.commentItem = item
    this.isComment = true
  }
  toSend (sendText: string): void {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    let data: any = {
      content: sendText,
      user: this.$store.getters.user._id,
      join: this.$route.params.id
    }
    if (this.commentItem && this.commentItem._id) {
      data.comment = this.commentItem._id
    }
    this.$toPost.addJoinComment(data).then((res: any) => {
      this.$toast('已回复')
      let newComment = res.data[0]
      newComment.user = this.user
      this.optionCommentList([newComment])
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getJoinById()
  }
}
</script>

<style lang="less" scoped>
.my-content-fix{
  padding-bottom: 55px;
}
.join-bottom-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 5px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  box-sizing: border-box;
  >.van-button{
    width: 100%;
    margin: 0 5px;
  }
}
.join-details-warp{
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
.join-apply-cell{
  margin-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.join-wrap{
  padding: 15px 0;
  border-bottom: 1px solid #f8f8f8;
  h3{
    font-size: 15px;
  }
}
.join-title{
  & div {
    display: flex;
    margin-top: 10px;
    & p {
      margin-right: 20px;
      display: flex;
      align-items: center;
      color: #555;
      font-size: 13px;
      & .van-icon{
        margin-right: 5px;
      }
    }
  }
  .join-number{
    font-size: 22px;
    color: #7678f2;
    margin-right: 2px;
  }
}
.join-user{
  img{
    width: 45px;
    height: 45px;
  }
}
.join-text p{
  color: #444;
  padding: 10px 0;
}
.join-place p{
  background: #f5f5f5;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 2px;
  img {
    width: 40px;
    margin-right: 10px;
  }
}
.van-swipe {
  // background: url('./imgs/noimg.jpg');
  background-size: cover;
  .custom-indicator {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 4px 10px;
    color: #fff;
    font-size: 12px;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.4);
  }
}
.van-swipe-item{
  text-align: center;
  .van-image{
    width: 100%;
    height: 100%;
  }
  video{
    width: 100%;
    height: 100%;
    background: #000;
  }
  img{
    width: 100%;
  }
}
.comment-item-btn{
  display: inline-block;
  font-size: 13px;
  color: #7232dd;
  margin-bottom: 10px;
}
.post-box .post-item {
  border-bottom: 0;
  padding-bottom: 0;
}
.van-action-sheet__content{
  padding: 15px;
  text-align: center;
  >div{
    background: rgba(139, 129, 249, 0.1);
    padding: 20px;
    border-radius: 15px;
  }
  p{
    font-size: 13px;
    color: #aaa;
    margin-top: 10px;
  }
}
</style>
