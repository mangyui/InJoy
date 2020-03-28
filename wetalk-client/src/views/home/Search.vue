<template>
  <div class="bgMax">
    <form class="fix-top search-box" action="/">
      <van-search
        v-model="text"
        placeholder="搜索帖子/用户"
        show-action
        @input="textChange"
        @cancel="$router.go(-1)"
      />
    </form>
    <div class="max1100 my-content-fix white-wrap" @scroll="scroll" ref="content">
      <van-tabs v-model="active" swipeable animated sticky :border="false" line-width="26" :offset-top="54" @change="changeTab">
        <van-tab title="活动" name="0">
          <div>
            <JoinList ref="joinBox" :text="text"></JoinList>
          </div>
        </van-tab>
        <van-tab title="动态" name="1">
          <div>
            <PostList ref="postBox" :text="text"></PostList>
          </div>
        </van-tab>
        <van-tab title="用户" name="2">
          <div>
            <UserList ref="userBox" :text="text"></UserList>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from '@/views/user/UserPost.vue'
import UserList from '@/components/UserList.vue'
import JoinList from '@/components/JoinList.vue'
const tools = require('@/util/tools.js')

@Component({
  components: {
    PostList,
    UserList,
    JoinList
  }
})
export default class Search extends Vue {
  scrollTop: number = 0
  text: string =''
  active: string = '0'
  isSearch: Array<number> = [0, 0, 0]
  textChange: any = tools.debounce(this.onSearch, 800) // 防抖函数
  onSearch () {
    if (this.text.trim() !== '') {
      this.isSearch = [0, 0, 0]
      this.toSearch()
    }
  }
  changeTab (name: string) {
    if (this.isSearch[parseInt(name)] === 0 && this.text.trim() !== '') {
      Vue.nextTick(() => {
        this.toSearch()
      })
    }
  }
  toSearch () {
    if (this.active === '0') {
      // @ts-ignore
      this.$refs.joinBox.getJoinList()
    } else if (this.active === '1') {
      // @ts-ignore
      this.$refs.postBox.getPostList()
    } else if (this.active === '2') {
      // @ts-ignore
      this.$refs.userBox.getUserList()
    }
    this.isSearch[parseInt(this.active)] = 1
  }
  activated () {
    if (this.$store.getters.isForward) {
      if (this.$route.query.text && this.$route.query.text !== this.text) {
        this.text = this.$route.query.text.toString()
        this.active = '0'
        Vue.nextTick(() => {
          this.onSearch()
        })
      }
    } else {
      // @ts-ignore
      this.$refs.content.scrollTop = this.scrollTop
    }
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
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
.my-content-fix{
  top: 0;
  margin-top: 54px;
}
</style>
