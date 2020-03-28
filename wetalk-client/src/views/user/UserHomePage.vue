<template>
  <div class="usercenter">
    <van-nav-bar class="litheme" fixed :title="(user._id&&user._id!==meId?user.name:'我')+'的主页'" :border="false" left-arrow  @click-left="$router.go(-1)">
      <van-icon v-if="user._id&&user._id!==meId" name="ellipsis" slot="right" @click="showEdit=true"/>
      <van-icon v-if="user._id&&user._id==meId" name="edit" slot="right"  @click="$router.push('/UserEdit')"/>
    </van-nav-bar>
    <div class="my-content-fix" @scroll="scroll" ref="content">
      <div class="usercenter-top">
        <div class="user-bg" :style="{backgroundImage: 'url('+ (user.avatar || './imgs/avatar.png')+')'}">
          <div class="bg-mask" ></div>
          <div class="top-mask"></div>
          <div class="user-box max1100">
            <img :src="user.avatar||'./imgs/avatar.png'">
            <div class="user-info">
              <b class="my-one-line">{{user.name||user.phone}}</b>
              <div>
                <van-tag color="#ec6899" round type="primary">{{user.sex==1?'男':'女'}}</van-tag>
                &nbsp;
                <van-tag color="#1989fa" round type="primary">{{user.age}}</van-tag>
                &nbsp;
                <van-tag color="#8b81f9" round type="primary">{{user.city}}</van-tag>
              </div>
              <p class="van-multi-ellipsis--l2">{{user.intro||'这个人很懒，什么都没留下'}}</p>
            </div>
            <div class="user-right-box">
              <div class="right-box-fan" @click="$router.push('/following/'+user._id)"><b>{{user.following||0}}</b>关注</div>
              <div class="right-box-fan" @click="$router.push('/followers/'+user._id)"><b>{{user.followers||0}}</b>粉丝</div>
            </div>
          </div>
        </div>
      </div>
      <div class="max1100">
        <van-tabs v-model="active" swipeable animated sticky  line-width="26" :offset-top="44" @change="tabChange">
          <van-tab title="帖子" name="post">
            <PostList v-if="!showMask" ref="postBox" :userId="user._id"/>
          </van-tab>
          <van-tab title="评论" name="comment">
            <UserComment v-if="!showMask" ref="commentBox" :userId="user._id" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div v-if="user._id&&user._id!==meId" class="user-bottom-btn max1100">
      <van-button type="info" :plain="user.alreadyFollow?false:true" @click.stop="userFollow">{{user.alreadyFollow?'已关注':'关注TA'}}</van-button>
      <van-button class="btn-theme" type="info" @click="toUserChat">私信TA</van-button>
    </div>
    <van-action-sheet
      v-model="showEdit"
      :actions="actions"
      cancel-text="取消"
      :round="true"
    />
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PostList from './UserPost.vue'
import UserComment from './UserComment.vue'

@Component({
  components: {
    PostList,
    UserComment
  }
})
export default class UserHomePage extends Vue {
  showMask: boolean = true
  showEdit: boolean = false
  actions: Array<any> = [
    { name: '举报' }
  ]
  private user: any = {}
  private meId: any = this.$store.getters.user._id
  scrollTop: number = 0
  isLoading: boolean = false
  active: string = 'post'
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
        if (this.meId === res.data._id) { // 此处还得再优化
          this.$store.commit('initUserInfo', res.data)
          this.user = this.$store.getters.user
        }
      } else {
        this.$notify({ type: 'warning', message: '用户不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
      this.showMask = false
    }).catch((err: any) => {
      console.log(err)
      setTimeout(() => {
        this.$router.go(-1)
      }, 200)
    })
  }
  tabChange (name: string) {
  }
  childPostList () {
    // @ts-ignore
    this.$refs.postBox.getPostList()
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
    if (!this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (this.user._id) {
      this.$router.push('/UserChat/' + this.user._id)
    }
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    if (this.meId === this.user._id) {
      this.user = this.$store.getters.user
    }
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
    if (this.$store.getters.isForward || !this.user._id) {
      this.active = 'post'
      this.showMask = true
      this.getUser()
    } else {
      this.showMask = false
    }
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
  background: #eff0f7;
}
.my-content-fix{
  padding-bottom: 50px;
}
.user-bg{
  width: 100%;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
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
  background: inherit;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: 10;
}
.top-mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background:rgba(139, 129, 249, 0.3);
  z-index: 11;
}
.user-box{
  padding: 10px;
  position: relative;
  z-index: 20;
  box-sizing: border-box;
  img {
    margin-top: 30px;
    background: #fefefe;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 10px;
    border: 1px solid #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }
  .user-info{
    text-align: left;
    flex-grow: 1;
    b, div, p {
      padding-left: 10px;
    }
    b{
      margin: 10px 0;
      font-weight: bold;
      color: #fff;
      font-size: 20px;
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    .van-tag{
      padding: 3px 8px;
    }
    p{
      margin: 10px 0;
      color: #eee;
      text-align: left;
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
  }
  .user-right-box{
    display: flex;
    position: absolute;
    top: 15px;
    right: 15px;
    .right-box-fan{
      text-align: center;
      margin-left: 20px;
      padding-top: 5px;
      color: #eee;
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
      box-sizing: border-box;
      font-size: 13px;
      b{
        margin-right: 5px;
        font-size: 17px;
        color: #fff;
      }
    }
  }
}
.user-bottom-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  >.van-button{
    width: 50%;
    opacity: 0.8;
  }
  .btn-theme{
    margin-left: 10px;
  }
}
</style>
