<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="帖子详情" fixed left-arrow right-text="评论"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/postcomment/'+ $route.params.id)" />
    <div class="my-content-box" @scroll="scroll" ref="content">
      <van-pull-refresh v-if="postDetails._id" class="max1100"  :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getPostById"  @click.native="isComment=false">
        <div class="post-box">
          <div class="post-item">
            <div class="post-user">
              <img :src="postDetails.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + postDetails.user._id)">
              <div class="post-user-text">
                <b @click.stop="$router.push('/userhomepage/' + postDetails.user._id)">{{postDetails.user?postDetails.user.name:'该用户不存在'}}</b>
                <p>{{postDetails.time.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</p>
              </div>
              <van-button round size="mini" type="info">关注</van-button>
            </div>
            <div class="post-content">
              <p class="my-max-height">{{postDetails.content}}</p>
              <ImgBox v-if="postDetails.imgList" :imgList="postDetails.imgList.split(',')"/>
            </div>
            <br />
            <div class="post-san">
              <div><van-icon name="share"/>{{postDetails.count_forward}}</div>
              <div><van-icon name="comment-o" />{{postDetails.count_comment}}</div>
              <div :class="postDetails.alreadyAgree===true?'post-san-active':''"><van-icon :name="postDetails.alreadyAgree===true?'good-job':'good-job-o'" @click.stop="postAgree(postDetails)"/>{{postDetails.count_agree}}</div>
            </div>
          </div>
        </div>
        <div v-if="postDetails.topic" class="post-details-tag" @click="$router.push('/topicpost/'+postDetails.topic._id)">
          <van-image
            fit="cover"
            :src="postDetails.topic.img||'./imgs/avatar.png'"
          />
          <div class="tag-right">
              <p># {{postDetails.topic.name}} #</p>
              <!-- <span>666 只沙雕</span> -->
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="comment-line">评论</div>
        <div class="comment-box post-box white-wrap">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="commentList[0]?'没有更多啦~':''"
            @load="getMore"
          >
            <div class="post-item" v-for="(item,index) in commentList" :key="index">
              <div class="post-user">
                <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
                <div class="post-user-text">
                  <b @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name}}</b>
                  <p>{{item.time.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</p>
                </div>
                <div @click.stop="commentAgree(item)" :class="item.alreadyAgree===true?'comment-right-icon comment-right-icon-active':'comment-right-icon'">
                  <van-icon name="upgrade" />
                  <span>{{item.count_agree}}</span>
                </div>
              </div>
              <div class="post-content">
                <p>{{item.content}}</p>
                <ImgBox v-if="item.imgList" :imgList="item.imgList.split(',')"/>
                <div v-if="item.sCommentList&&item.sCommentList[0]" class="scomment-box">
                  <p v-for="scmoment in item.sCommentList" :key="scmoment._id">
                    <router-link :to="'/userhomepage/' + scmoment.user._id">{{scmoment.user.name}}</router-link>
                    : {{scmoment.content}}
                  </p>
                </div>
              </div>
              <div class="my-right">
                <span class="comment-item-btn" @click.stop="replyComment(item)">回复Ta</span>
              </div>
            </div>
          </van-list>
          <div v-show="!commentList[0]" class="white-wrap my-tip-box">
            暂无评论
          </div>
        </div>
      </van-pull-refresh>
      <InputBox v-if="isComment" :replyName="commentItem.user.name" @toSend="toSend"/>
    </div>
    <div v-show="showMask" class="white-mask"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'
import InputBox from '@/components/InputBox.vue'

@Component({
  components: {
    ImgBox,
    InputBox
  }
})
export default class PostDetails extends Vue {
  scrollTop: number = 0
  showMask: boolean = true
  isRefresh: boolean = false
  isComment: boolean = false
  commentItem: any = {}
  loading: boolean = false
  finished: boolean = false
  postDetails: any = {}
  commentList: Array<any> = []
  getData: any = {
    page: 1,
    number: 20
  }
  getPostById () {
    let data: any = {
      id: this.$route.params.id
    }
    if (this.$store.getters.user._id) {
      data.viewer = this.$store.getters.user._id
    }
    this.$toPost.getPostById(data).then((res: any) => {
      if (res.data._id) {
        this.postDetails = res.data
        this.getfComments()
        this.showMask = false
      } else {
        this.$notify({ type: 'warning', message: '帖子不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
      this.isRefresh = false
    }).catch((err: any) => {
      console.log(err)
      this.isRefresh = false
    })
  }
  getfComments () {
    this.commentList = []
    this.getData.page = 1
    this.getData.postId = this.$route.params.id
    if (this.$store.getters.user._id) {
      this.getData.viewer = this.$store.getters.user._id
    }
    this.$toPost.getfComments(this.getData).then((res: any) => {
      res.data.pop()
      this.commentList = res.data
      if (res.data.length < this.getData.number) {
        this.finished = true
      } else {
        this.finished = false
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  getMore () {
    if (!this.commentList[0]) {
      this.loading = false
      return
    }
    this.getData.page += 1
    this.$toPost.getfComments(this.getData).then((res: any) => {
      res.data.pop()
      this.commentList = this.commentList.concat(res.data)
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
    }).catch((err: any) => {
      console.log(err)
      this.loading = false
    })
  }
  replyComment (item: any) {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (item._id) {
      this.commentItem = item
      this.isComment = true
    }
  }
  toSend (sendText: string): void {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    let data: any = {
      content: sendText,
      user: this.$store.getters.user._id,
      comment: this.commentItem._id,
      post: this.$route.params.id
    }
    this.$toPost.addSComment(data).then((res: any) => {
      this.$toast('已回复')
      this.commentItem.sCommentList.push({
        content: sendText,
        user: this.$store.getters.user,
        comment: this.commentItem._id,
        post: this.$route.params.id
      })
      this.postDetails.count_comment += 1
      this.isComment = false
    }).catch((err: any) => {
      console.log(err)
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
  commentAgree (comment: any) {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    let data = {
      userId: this.$store.getters.user._id,
      commentId: comment._id
    }
    this.$toPost.commentAddOrRmAgree(data).then((data: any) => {
      comment.alreadyAgree = !comment.alreadyAgree
      comment.count_agree += (comment.alreadyAgree ? 1 : -1)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
    if (this.$store.getters.isForward || !this.postDetails._id) {
      this.showMask = true
      this.getPostById()
    } else {
      this.showMask = false
    }
  }
  created () {
    // this.getPostById()
  }
}
</script>

<style lang="less" scoped>
.post-details-tag{
  margin-bottom: 8px;
  display: flex;
  background: #fff;
  padding: 10px 15px;
  align-items: center;
  .van-image{
    width: 50px;
    height: 50px;
    /deep/ img {
      border-radius: 5px;
    }
  }
  .tag-right{
    padding-left: 10px;
    flex-grow: 1;
    p{
      font-size: 15px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    span{
      font-size: 12px;
      color: #666;
    }
  }
}
.comment-item-btn{
  display: inline-block;
  font-size: 13px;
  color: #7232dd;
  margin-top: 10px;
}
</style>
