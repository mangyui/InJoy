<template>
  <div>
    <van-pull-refresh  :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getfComments">
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
                <p>{{$formatTime(item.time)}}</p>
              </div>
              <div  @click.stop="commentAgree(item)" :class="item.alreadyAgree===true?'comment-right-icon comment-right-icon-active':'comment-right-icon'">
                <van-icon name="upgrade" />
                <span>{{item.count_agree}}</span>
              </div>
            </div>
            <div class="post-content">
              <p>{{item.content}}</p>
              <ImgBox v-if="item.imgList" :imgList="item.imgList.split(',')"/>
            </div>
            <div class="flex-rlc comment-post-box" @click="$router.push('/postdetails/'+item.post._id)">
              <p>原帖：{{item.post.content}}</p>
              <van-icon name="arrow"/>
            </div>
          </div>
        </van-list>
        <div v-show="!commentList[0]" class="white-wrap my-tip-box">
          暂无评论记录
        </div>
      </div>
    </van-pull-refresh>
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
export default class UserComment extends Vue {
  @Prop() userId!: string
  isRefresh: boolean = false
  loading: boolean = false
  finished: boolean = false
  commentList: Array<any> = []
  getData: any = {
    page: 1,
    number: 20
  }
  getfComments () {
    if (!this.userId) {
      return
    }
    this.getData.userId = this.userId
    this.commentList = []
    this.getData.page = 1
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
      this.isRefresh = false
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
  // noneGet () {
  //   if (!this.commentList[0]) {
  //     this.getfComments()
  //   }
  // }
  mounted () {
    this.getfComments()
  }
}
</script>

<style lang="less" scoped>
.comment-box .post-item .post-content{
  padding-left: 0;
}
.comment-post-box{
  margin-top: 5px;
  padding: 15px;
  background: #f3f3f3;
  border-radius: 5px;
  color: #666;
  p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
