<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="帖子详情" fixed left-arrow right-text="评论"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/postcomment/'+ $route.params.id)" />
    <div class="my-content-box">
      <van-pull-refresh v-if="postDetails" class="max1100" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getPostById"  @click.native="isComment=false">
        <div class="post-box">
          <div class="post-item">
            <div class="post-user">
              <img :src="postDetails.user.avatar || './imgs/ico.png'" @click.stop="$router.push('/userhomepage/' + postDetails.user._id)">
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
              <div><van-icon name="upgrade" />{{postDetails.count_agree}}</div>
            </div>
          </div>
        </div>
        <div class="post-details-tag">
          <van-image
            fit="cover"
            :src="postDetails.topic.img||'./imgs/ico.png'"
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
                <img :src="item.user.avatar || './imgs/ico.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
                <div class="post-user-text">
                  <b @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name}}</b>
                  <p>{{item.time.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</p>
                </div>
                <div class="comment-right-icon">
                  <van-icon name="upgrade" />
                  <span>{{item.count_agree}}</span>
                </div>
              </div>
              <div class="post-content">
                <p>{{item.content}}</p>
                <ImgBox v-if="item.imgList" :imgList="item.imgList.split(',')"/>
              </div>
              <div class="my-right">
                <span class="comment-item-btn" @click.stop="replyComment(item)">评论Ta</span>
              </div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
      <InputBox v-if="isComment" :replyName="commentItem.user.name" @toSend="toSend"/>
    </div>
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
  isRefresh: boolean = false
  isComment: boolean = false
  commentItem: any = {}
  loading: boolean = false
  finished: boolean = false
  postDetails: any = null
  commentList: Array<any> = []
  getData: any = {
    page: 1,
    number: 20
  }
  getPostById () {
    this.$toPost.getPostById({ id: this.$route.params.id }).then((res: any) => {
      if (res.data._id) {
        this.postDetails = res.data
        this.getfComments()
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
    this.getData.post = this.$route.params.id
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
    if (item._id) {
      this.commentItem = item
      this.isComment = true
    }
  }
  toSend (sendText: string): void {
  }
  activated () {
    // if (this.$store.getters.isForward) {
    //   this.getPostById()
    // }
  }
  created () {
    this.getPostById()
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
