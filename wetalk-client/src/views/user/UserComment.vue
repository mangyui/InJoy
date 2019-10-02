<template>
  <div>
    <van-pull-refresh pulling-text="下拉刷新" v-model="isRefresh" @refresh="getfComments">
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
            <div class="flex-rlc comment-post-box" @click="$router.push('/postdetails/'+item.post._id)">
              <p>原帖：{{item.post.content}}</p>
              <van-icon name="arrow"/>
            </div>
          </div>
        </van-list>
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
  @Prop() userId!: number
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
  mounted () {
    this.getfComments()
  }
}
</script>

<style lang="less" scoped>
.comment-post-box{
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
