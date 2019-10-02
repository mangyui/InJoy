<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="大厅" fixed>
      <van-icon name="search" slot="right"  @click="$router.push('/search')"/>
    </van-nav-bar>
    <PostList ref="postBox" />
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
  mounted () {
    // @ts-ignore
    this.$refs.postBox.getPostList()
  }
}
</script>

<style lang="less" scoped>
.bgWhite /deep/ .post-box{
  padding-bottom: 42px;
}
</style>
