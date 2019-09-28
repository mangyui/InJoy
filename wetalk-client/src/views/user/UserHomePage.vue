<template>
  <div class="usercenter">
    <van-nav-bar class="litheme" fixed :title="(user.name||user.phone||'')+'主页'" :border="false" left-arrow  @click-left="$store.commit('GOBACK')">
      <van-icon v-if="$route.params.id==me._id" name="edit" slot="right" @click="$store.commit('GOLEFT', '/UserEdit')"/>
    </van-nav-bar>
    <van-pull-refresh pulling-text="下拉刷新" v-model="isLoading" @refresh="onRefresh">
    <div class="usercenter-top">
      <div class="user-bg">
        <div class="bg-mask" :style="{backgroundImage: 'url('+ (user.avatar || './imgs/ico.png')+')'}"></div>
        <div class="top-mask"></div>
        <!-- <van-icon class="re-btn" name="replay" size="26px" @click="refreshUser"></van-icon> -->
      </div>
      <div class="user-box max1100">
        <img :src="user.avatar||'./imgs/ico.png'">
        <div>
          <b>{{user.name||user.phone}}</b>
          <p>{{user.sex==1?'男':'女'}} &nbsp;&nbsp;{{user.age}} &nbsp;&nbsp;{{user.province}}&nbsp;&nbsp; {{user.city}}</p>
        </div>
      </div>
    </div>
    <div class="max1100">
      <van-tabs v-model="active" swipeable sticky :border="false" line-width="26" :offset-top="44" @change="tabChange">
        <van-tab title="帖子" name="post">
          <UserPost :user="user"/>
        </van-tab>
        <van-tab title="评论" name="comment">
          <UserComment :user="user"/>
        </van-tab>
      </van-tabs>
    </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import User from '@/model/user'
import Person from '@/util/Person'
import UserPost from './UserPost.vue'
import UserComment from './UserComment.vue'

let persons : Person[] = require('@/util/Persons').persons

@Component({
  components: {
    UserPost,
    UserComment
  }
})
export default class UserHomePage extends Vue {
  private user: any = {}
  private me: any = this.$store.getters.user
  isLoading: boolean = false
  isScroll: boolean = false
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
    this.$toPost.getUserById({ id: this.$route.params.id }).then((res: any) => {
      if (res.data && res.data._id) {
        this.user = res.data
        if (res.data._id && this.me._id === res.data._id && this.me !== res.data) { // 此处还得再优化
          this.$store.commit('initUserInfo', res.data)
        }
      } else {
        this.$notify({ type: 'warning', message: '用户不存在' })
        setTimeout(() => {
          this.$store.commit('GOBACK')
        }, 200)
      }
      this.isLoading = false
    }).catch((err: any) => {
      console.log(err)
      this.isLoading = false
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
  // refreshUser () {
  //   var index = Math.floor(Math.random() * persons.length)
  //   this.$store.commit('updateUserAvatar', persons[index].avatar)
  //   this.$store.commit('updateUserName', persons[index].name)
  // }
  mounted () {
    window.addEventListener('scroll', (e: any) => {
      if (e.target.scrollTop > 100) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }, true)
  }
  created () {
    this.getUser()
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
  height: 150px;
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
  background: rgba(0,0,0,0.45);
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
    margin-right: 20px;
    border: 1px solid #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }
  >div{
    text-align: left;
  }
  b{
    font-weight: bold;
    color: #fff;
    font-size: 18px;
  }
  p{
    margin: 10px 0;
    font-size: 13px;
    color: #666;
    text-align: left;
  }
}
</style>
