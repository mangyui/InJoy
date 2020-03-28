<template>
  <div class="my-content-box" @scroll="scroll" ref="content">
    <van-pull-refresh class="max1100 white-wrap" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getFollowPost">
      <div class="post-box">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="postList[0]?'没有更多啦~':'空空路也'"
            @load="getMore"
          >
          <div class="post-item" v-for="(item,index) in postList" :key="index" @click="$router.push('/postdetails/'+item._id)">
            <div class="post-user">
              <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <div class="post-user-text">
                <b @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name}}</b>
                <p>{{$formatTime(item.time)}}</p>
              </div>
            </div>
            <div class="post-content">
              <p>{{item.content}}</p>
              <ImgBox v-if="item.imgList" :imgList="item.imgList.split(',')"/>
            </div>
            <div class="flex-rlc">
              <b v-if="item.topic" class="post-tag" @click.stop="$router.push('/topicpost/'+item.topic._id)">
              {{item.topic.name}}
              </b>
              <p v-if="item.address" class="van-ellipsis post-address"><van-icon name="location" />{{item.address}}</p>
            </div>
            <div class="post-san">
              <div><van-icon name="share" @click.stop="openShare(item)"/>分享</div>
              <div><van-icon name="comment-o" @click.stop="$router.push('/postcomment/'+ item._id)" />{{item.count_comment}}</div>
              <div :class="item.alreadyAgree===true?'post-san-active':''"><van-icon :name="item.alreadyAgree===true?'good-job':'good-job-o'" @click.stop="postAgree(item)"/>{{item.count_agree}}</div>
            </div>
            <van-icon class="post-more-btn" name="ellipsis" />
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-popup
      v-model="showShare"
      closeable
      position="bottom"
      get-container="#app">
      <div class="comment-line">分享</div>
      <div class="share-box">
        <div @click="shareQQ">
          <van-icon name="./icons/QQ.svg" />
          <p>QQ</p>
        </div>
        <div @click="shareWeibo">
          <van-icon name="./icons/weibo.svg" />
          <p>微博</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'

@Component({
  components: {
    ImgBox
  }
})
export default class PostList extends Vue {
  @Prop() text!: string
  @Prop() userId!: any
  @Prop() topicId!: any
  showShare: boolean = false
  isRefresh: boolean = false
  loading: boolean = false
  finished: boolean = false
  scrollTop: number = 0
  sharePost: any = {}
  getData: any = {
    page: 1,
    number: 20
  }
  postList: Array<any> = []
  getFollowPost () {
    this.postList = []
    this.getData.page = 1
    if (this.text && this.text.trim() !== '') {
      this.getData.name = this.text.trim()
    }
    if (this.userId) {
      this.getData.id = this.userId
    }
    if (this.topicId) {
      this.getData.topicId = this.topicId
    }
    this.$toPost.getPostByFollow(this.getData).then((res: any) => {
      res.data.pop()
      this.postList = res.data
      if (res.data.length < this.getData.number) {
        this.finished = true
      } else {
        this.finished = false
      }
      this.isRefresh = false
      this.$emit('getOver', res.data)
    }).catch((err: any) => {
      console.log(err)
      this.isRefresh = false
    })
  }
  getMore () {
    if (!this.postList[0]) {
      this.loading = false
      return
    }
    this.getData.page += 1
    this.$toPost.getPostByFollow(this.getData).then((res: any) => {
      res.data.pop()
      this.postList = this.postList.concat(res.data)
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
    }).catch((err: any) => {
      console.log(err)
      this.loading = false
    })
  }
  postAgree (post: any) {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    let data = {
      userId: this.$store.getters.user._id,
      postId: post._id
    }
    this.$toPost.postAddOrRmAgree(data).then((data: any) => {
      post.alreadyAgree = !post.alreadyAgree
      post.count_agree += (post.alreadyAgree ? 1 : -1)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  openShare (post: any) {
    if (post._id) {
      this.sharePost = post
      this.showShare = true
    }
  }
  shareWeibo () {
    let url = 'http://service.weibo.com/share/share.php?url=http://localhost:8080/#/postdetails/' + this.sharePost._id + '&title= ' + this.sharePost.content + '&source= 乐中，乐在其中'
    window.open(url)
  }
  shareQQ () {
    let url = 'http://connect.qq.com/widget/shareqq/index.html?url=http://localhost:8080/#/postdetails/' + this.sharePost._id + '&title= ' + this.sharePost.content + '&source= 乐中，乐在其中'
    window.open(url)
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
  }
  created () {
    if (this.$store.getters.user._id) {
      this.getFollowPost()
    }
  }
}
</script>

<style lang="less" scoped>
.share-box{
  padding: 25px;
  display: flex;
  align-items: center;
  >div{
    margin-right: 30px;
    text-align: center;
  }
  .van-icon{
    font-size: 26px;
    padding: 10px;
    background: #c0bbff;
    border-radius: 50%;
  }
  p{
    margin-top: 8px;
    font-size: 11px;
    color: #666;
  }
}
</style>
