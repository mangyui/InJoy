<template>
  <div class="bgMax post-wrap">
    <van-tabs class="my-theme-tabs" v-model="active" :border="false" sticky swipeable animated
     line-width="26"
     color="#fff"
     :offset-top="0"
     @rendered="getPost">
      <van-tab title="关注" name="m2">
        <div class="white-wrap max1100 scroll-wrap">
          <FollowPost v-show="user._id" :userId="user._id"></FollowPost>
          <div v-show="!user._id" class="my-tip-box">你还没有登录！</div>
        </div>
      </van-tab>
      <van-tab title="动态" name="m1" >
        <div v-show="isOver" style="min-height: 100%" class="white-wrap max1100 scroll-wrap">
          <PostList ref="postBox" @getOver="getOver"/>
        </div>
        <div v-show="!isOver" class="white-wrap max1100">
          <div v-for="item in 3"  :key="item">
            <br/>
            <van-skeleton  title avatar :row="3" />
          </div>
          <br/>
          <br/>
        </div>
      </van-tab>
    </van-tabs>
    <van-icon class="my-fixed-left" name="search"  @click="$router.push('/search')"/>
    <van-icon class="my-fixed-right" name="plus" @click="$router.push('/postadd')"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from '@/components/PostList.vue'
import FollowPost from '@/components/FollowPost.vue'
import { Getter } from 'vuex-class'

@Component({
  components: {
    PostList,
    FollowPost
  }
})
export default class Lobby extends Vue {
  @Getter user!: any
  isOver: boolean = false
  active: string = 'm1'
  getOver () {
    this.isOver = true
  }
  getPost () {
    if (!this.isOver) {
      // @ts-ignore
      this.$refs.postBox.getPostList()
    }
  }
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.post-wrap /deep/ .van-tabs__nav--line{
  width: 40%!important;
}
.my-fixed-left, .my-fixed-right{
  position: absolute;
  top: 0;
  line-height: 46px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.my-fixed-left{
  left: 15px;
}
.my-fixed-right{
  right: 15px;
}
</style>
