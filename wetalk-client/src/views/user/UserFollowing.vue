<template>
  <div class="bgWhite max1100">
    <van-nav-bar class="litheme" :border="false" fixed :title="$route.params.id==$store.getters.user._id?'我关注的人':'TA关注的人'" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <van-pull-refresh class="my-content-fix max1100" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getFollowing">
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in followingList" :key="index" @click="$router.push('/userhomepage/' + item.to_user._id)">
          <img :src="item.to_user.avatar||'./imgs/avatar.png'">
          <div class="list-item-left">
            <b>{{item.to_user.name}}</b>
            <p>{{item.to_user.intro}}</p>
          </div>
          <div  v-if="$store.getters.user&&$store.getters.user._id!=item.to_user._id" class="list-item-right">
            <van-button size="small" @click.stop="$router.push('/UserChat/' + item.to_user._id)">私信TA</van-button>
          </div>
        </div>
        <div v-show="!followingList[0]" class="white-wrap my-tip-box">
          <br/>
          点个关注会si吗
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
  followingList: Array<any> = []
  getFollowing () {
    this.$toPost.getFollowing({ userId: this.$route.params.id }).then((res: any) => {
      this.followingList = res.data
      this.showMask = false
      this.isRefresh = false
    }).catch((error: any) => {
      console.log(error)
      this.isRefresh = false
    })
  }
  created () {
    this.getFollowing()
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
