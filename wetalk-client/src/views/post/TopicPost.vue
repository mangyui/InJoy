<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" :title="topicDetails.name||'话题'" fixed left-arrow @click-left="$router.go(-1)">
      <span slot="right" @click="topicAddPost">发帖</span>
    </van-nav-bar>
    <div class="max1100 my-content-fix" @scroll="scroll" ref="content">
      <div class="topic-top-box">
        <van-image
            fit="cover"
            :src="topicDetails.img||'./imgs/avatar.png'"
          />
        <div>
          <b># {{topicDetails.name}} #</b>
          <p>{{topicDetails.desc}}</p>
        </div>
      </div>
      <div class="comment-line">新帖</div>
      <div class="white-wrap max1100 scroll-wrap">
        <PostList ref="postBox" :topicId="$route.params.id"/>
      </div>
    </div>
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from '@/views/user/UserPost.vue'

@Component({
  components: {
    PostList
  }
})
export default class TopicPost extends Vue {
  showMask: boolean = true
  scrollTop: number = 0
  topicDetails: any = {}
  getTopic () {
    this.$toPost.getTopicById({ id: this.$route.params.id }).then((res: any) => {
      this.topicDetails = res.data
      // @ts-ignore
      this.$refs.postBox.getPostList()
      this.showMask = false
    }).catch((err: any) => {
      console.log(err)
    })
  }
  topicAddPost () {
    if (this.topicDetails._id) {
      this.$store.commit('SELECT_TOPIC', this.topicDetails)
      this.$router.push('/postadd')
    }
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
    if (this.$store.getters.isForward) {
      this.showMask = true
      // @ts-ignore
      this.$refs.content.scrollTop = 0
      this.getTopic()
    } else {
      this.showMask = false
    }
  }
  created () {

  }
}
</script>

<style lang="less" scoped>
.topic-top-box{
  padding: 15px;
  align-items: center;
  text-align: center;
  color: #666;
  background: #fff;
  border-bottom: 7px solid #f9f9f9;
  b{
    color: #8b81f9;
    display: block;
    margin-bottom: 10px;
  }
  .van-image{
    margin-bottom: 15px;
  }
  /deep/ img{
    background-color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 3px;
  }
}
</style>
