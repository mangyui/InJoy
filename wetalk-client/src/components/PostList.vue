<template>
  <div class="my-content-box" @scroll="scroll" ref="content">
    <van-pull-refresh class="max1100" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getPostList">
      <div class="post-box">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="postList[0]?'没有更多啦~':''"
            @load="getMore"
          >
          <div class="post-item" v-for="(item,index) in postList" :key="index" @click="$router.push('/postdetails/'+item._id)">
            <div class="post-user" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <img :src="item.avatar || './imgs/ico.png'">
              <div class="post-user-text">
                <p>{{item.user.name}}</p>
                <span>{{item.time.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</span>
              </div>
            </div>
            <div class="post-content">
              <p>{{item.content}}</p>
              <ImgBox v-if="item.imgList" :imgList="item.imgList.split(',')"/>
            </div>
            <b v-if="item.topic" class="post-tag">
              <div>
                <span>#</span><p>{{item.topic.name}}</p>
              </div>
            </b>
            <div class="post-san">
              <div><van-icon name="share"/>{{item.count_forward}}</div>
              <div><van-icon name="comment-o" />{{item.count_comment}}</div>
              <div><van-icon name="upgrade" />{{item.count_agree}}</div>
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
export default class PostList extends Vue {
  @Prop() text!: string
  @Prop() user!: any
  isRefresh: boolean = false
  loading: boolean = false
  finished: boolean = false
  scrollTop: number = 0
  getData: any = {
    page: 1,
    number: 20
  }
  postList: Array<any> = []
  getPostList () {
    this.postList = []
    this.getData.page = 1
    if (this.text && this.text.trim() !== '') {
      this.getData.name = this.text.trim()
    }
    if (this.user && this.user._id) {
      this.getData.userId = this.user._id
    }
    this.$toPost.getPostList(this.getData).then((res: any) => {
      res.data.pop()
      this.postList = res.data
      if (res.data.length < this.getData.number) {
        this.finished = true
      } else {
        this.finished = false
      }
      this.isRefresh = false
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
    this.$toPost.getPostList(this.getData).then((res: any) => {
      res.data.pop()
      this.postList = this.postList.concat(res.data)
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
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
  }
  created () {
  }
}
</script>
