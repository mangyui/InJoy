<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="乐中动态" fixed>
      <van-icon name="search" slot="left"  @click="$router.push('/search')"/>
      <van-icon name="plus" slot="right" @click="$router.push('/postadd')"/>
    </van-nav-bar>
    <div v-show="!isOver" class="my-content-box white-wrap max1100">
      <div v-for="item in 3"  :key="item">
        <br/>
        <van-skeleton  title avatar :row="3" />
      </div>
    </div>
    <div v-show="isOver" style="min-height: 100%" class="white-wrap max1100 scroll-wrap">
      <PostList ref="postBox" @getOver="getOver"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from '@/components/PostList.vue'

@Component({
  components: {
    PostList
  }
})
export default class Lobby extends Vue {
  isOver: boolean = false
  getOver () {
    this.isOver = true
  }
  activated () {
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
.bgMax /deep/ .post-box{
  padding-bottom: 42px;
}
</style>
