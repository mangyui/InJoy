<template>
  <div class="bgWhite max1100">
    <form class="fix-top search-box" action="/">
      <van-search
        v-model="text"
        placeholder="搜索帖子/用户"
        show-action
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>
    <div class="my-content-box">
      <van-tabs v-model="active" swipeable sticky :border="false" line-width="26" :offset-top="46">
        <!-- <van-tab title="话题" name="tag">
        </van-tab> -->
        <van-tab title="帖子" name="post">
          <div class="scroll-wrap">
            <PostList ref="postBox" :text="text"></PostList>
          </div>
        </van-tab>
        <van-tab title="用户" name="user">
          <UserList ref="userBox" :text="text"></UserList>
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
      if (this.active === 'post') {
        // @ts-ignore
        this.$refs.postBox.getPostList()
      } else if (this.active === 'user') {
        // @ts-ignore
        this.$refs.userBox.getUserList()
      }
    }
  }
  created () {
  }
}
</script>
