<template>
  <div class="bgWhite max1100">
    <van-nav-bar class="litheme" :border="false" fixed :title="$route.params.id==$store.getters.user._id?'关注我的人':'关注TA的人'" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <van-pull-refresh class="my-content-fix max1100" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getFollowers">
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in followerList" :key="index" @click="$router.push('/userhomepage/' + item.from_user._id)">
          <img :src="item.from_user.avatar||'./imgs/avatar.png'">
          <div class="list-item-left">
            <b>{{item.from_user.name}}</b>
            <p>{{item.from_user.intro}}</p>
          </div>
          <div v-if="$store.getters.user&&$store.getters.user._id!=item.from_user._id" class="list-item-right">
            <van-button size="small" @click.stop="$router.push('/UserChat/' + item.from_user._id)">私信TA</van-button>
          </div>
        </div>
        <div v-show="!followerList[0]" class="white-wrap my-tip-box">
          <br/>
          一点也不受欢迎
        </div>
      </div>
    </van-pull-refresh>
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class UserFollower extends Vue {
  showMask: boolean = true
  isRefresh: boolean = false
  followerList: Array<any> = []
  getFollowers () {
    this.$toPost.getFollowers({ userId: this.$route.params.id }).then((res: any) => {
      this.followerList = res.data
      this.showMask = false
      this.isRefresh = false
    }).catch((error: any) => {
      console.log(error)
      this.isRefresh = false
    })
  }
  created () {
    this.getFollowers()
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/listitem.less';
.list-box .list-item  img{
  border-radius: 50%;
}
.van-pull-refresh{
  /deep/ .van-pull-refresh__track{
    height: 100%;
  }
}
</style>
