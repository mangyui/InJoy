<template>
  <div class="bgMax">
    <form class="fix-top search-box" action="/">
      <van-search
        v-model="text"
        placeholder="搜索帖子/用户"
        show-action
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>
    <div class="max1100 search-tab-box">
      <van-tabs v-model="active" swipeable sticky :border="false" line-width="26" :offset-top="54">
        <van-tab title="帖子" name="post">
          <div class="scroll-wrap white-wrap">
            <PostList ref="postBox" :text="text"></PostList>
          </div>
        </van-tab>
        <van-tab title="用户" name="user">
          <div class="scroll-wrap">
            <UserList ref="userBox" :text="text"></UserList>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from '@/components/PostList.vue'
import UserList from '@/components/UserList.vue'

@Component({
  components: {
    PostList,
    UserList
  }
})
export default class Search extends Vue {
  text: string =''
  active: string = 'post'
  onSearch () {
    if (this.text.trim() !== '') {
      // @ts-ignore
      this.$refs.postBox.getPostList()

      // @ts-ignore
      this.$refs.userBox.getUserList()
    }
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.search-wrap{
  height: 100%;
  background: #f9f9f9;
  .search-scroll-wrap{
    /deep/ .my-content-box{
      height: auto;;
    }
  }
}
.search-tab-box{
  position: fixed;
  top: 53px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
