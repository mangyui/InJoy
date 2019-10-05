<template>
  <div class="usercenter">
    <van-nav-bar class="litheme" fixed :title="(user.name||user.phone||'')+'主页'" :border="false" left-arrow  @click-left="$router.go(-1)">
      <van-icon v-if="$route.params.id==me._id" name="edit" slot="right" @click="$router.push('/UserEdit')"/>
      <span v-if="$route.params.id!==me._id" slot="right" @click="toUserChat">私信</span>
    </van-nav-bar>
    <div class="my-content-box" @scroll="scroll" ref="content">
      <div class="usercenter-top">
        <div class="user-bg">
          <div class="bg-mask" :style="{backgroundImage: 'url('+ (user.avatar || './imgs/avatar.png')+')'}"></div>
          <div class="top-mask"></div>
        </div>
        <div class="user-box max1100">
          <img :src="user.avatar||'./imgs/avatar.png'">
          <div class="user-info">
            <b class="my-one-line">{{user.name||user.phone}}</b>
            <p>{{user.sex==1?'男':'女'}} &nbsp;&nbsp;{{user.age}} &nbsp;&nbsp; {{user.city}}</p>
          </div>
          <div class="user-right-box">
            <div v-if="user._id!==me._id" class="right-box-btn" @click.stop="userFollow"><van-icon :name="user.alreadyFollow?'like':'like-o'" /><p>{{user.alreadyFollow?'已':''}}关注</p></div>
            <div class="flex-rlc">
              <div class="right-box-fan">{{user.following||0}}<p>关注</p></div>
              <div class="right-box-fan">{{user.followers||0}}<p>粉丝</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="max1100">
        <van-tabs v-model="active" swipeable sticky :border="false" line-width="26" :offset-top="44" @change="tabChange">
          <van-tab title="帖子" name="post">
            <div class="scroll-wrap">
              <PostList ref="postBox" :userId="$route.params.id"  @getOver="getOver"/>
            </div>
          </van-tab>
          <van-tab title="评论" name="comment">
            <UserComment :userId="user._id"/>
          </van-tab>
        </van-tabs>
        <div v-show="active=='post'&&isNone" class="white-wrap my-tip-box">
          求你发个帖子吧！
        </div>
      </div>
    </div>
    <div v-show="showMask" class="white-mask"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Person from '@/util/Person'
import PostList from '@/components/PostList.vue'
import UserComment from './UserComment.vue'

let persons : Person[] = require('@/util/Persons').persons

@Component({
  components: {
    PostList,
    UserComment
  }
})
export default class UserHomePage extends Vue {
  showMask: boolean = true
  isNone: boolean = false
  private user: any = {}
  private me: any = this.$store.getters.user
  scrollTop: number = 0
  isLoading: boolean = false
  active: string = 'post'
  oldActive: string = 'post'
  tabScrollList: any = {
    post: 165,
    comment: 165
  }
  onRefresh () {
    this.getUser()
  }
  getUser () {
    let data: any = {
      id: this.$route.params.id
    }
    if (this.$store.getters.user._id) {
      data.viewer = this.$store.getters.user._id
    }
    this.$toPost.getUserById(data).then((res: any) => {
      if (res.data && res.data._id) {
        this.user = res.data
        if (res.data._id && this.me._id === res.data._id && this.me !== res.data) { // 此处还得再优化
          this.$store.commit('initUserInfo', res.data)
        }
        this.childPostList()
      } else {
        this.$notify({ type: 'warning', message: '用户不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
      this.showMask = false
    }).catch((err: any) => {
      console.log(err)
      this.showMask = false
    })
  }
  tabChange (name: string) {
    let app: any = document.getElementById('app')
    if (app.scrollTop >= 165) {
      this.tabScrollList[this.oldActive] = app.scrollTop
      app.scrollTop = this.tabScrollList[name]
    }
    this.oldActive = name
  }
  childPostList () {
    // @ts-ignore
    this.$refs.postBox.getPostList()
  }
  getOver (postList: any) {
    if (postList[0]) {
      this.isNone = false
    } else {
      this.isNone = true
    }
  }
  userFollow () {
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (this.$store.getters.user._id === this.user._id) {
      return
    }
    let data = {
      from_user: this.$store.getters.user._id,
      to_user: this.user._id
    }
    this.$toPost.followAddOrRm(data).then((data: any) => {
      this.user.alreadyFollow = !this.user.alreadyFollow
      this.user.followers += (this.user.alreadyFollow ? 1 : -1)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  toUserChat () {
    if (this.user._id) {
      this.$router.push('/UserChat/' + this.user._id)
    }
  }
  // refreshUser () {
  //   var index = Math.floor(Math.random() * persons.length)
  //   this.$store.commit('updateUserAvatar', persons[index].avatar)
  //   this.$store.commit('updateUserName', persons[index].name)
  // }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
    if (this.$store.getters.isForward || !this.user._id) {
      this.showMask = true
      this.getUser()
    } else {
      this.showMask = false
    }
  }
  mounted () {
  }
  created () {
    // this.getUser()
  }
}
</script>

<style lang="less" scoped>
.litheme{
  z-index: 99!important;
  box-shadow: 0 0 3px rgba(0,0,0,0.1)
}
.usercenter{
  .usercenter-top{
    background: #fff;
    padding-bottom: 15px;
  }
}
.user-bg{
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  .edit-btn{
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
    z-index: 20;
  }
}
.bg-mask{
  position: absolute;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  z-index: 10;
}
.top-mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  z-index: 11;
}
.user-box{
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-top: -50px;
  position: relative;
  z-index: 20;
  img {
    background: #fefefe;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    margin-right: 15px;
    border: 1px solid #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }
  .user-info{
    text-align: left;
    width: 0;
    flex-grow: 1;
    b{
      font-weight: bold;
      color: #fff;
      font-size: 18px;
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    p{
      margin: 10px 0;
      font-size: 13px;
      color: #666;
      text-align: left;
    }
  }
  .user-right-box{
    text-align: right;
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: -90px;
    min-width: 80px;
    .right-box-btn{
      padding: 10px 15px;
      background: rgba(139, 129, 249,1);
      align-items: center;
      display: flex;
      color: #eee;
      border-radius: 50px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      .van-icon{
        font-size: 16px;
      }
      p{
        width: 50px;
        text-align: center;
      }
    }
    .right-box-fan{
      text-align: center;
      margin-left: 5px;
      padding-top: 5px;
      color: rgb(255, 255, 255);
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
      height: 40px;
      box-sizing: border-box;
      p{
        margin-top: 5px;
      }
    }
  }

}
</style>
