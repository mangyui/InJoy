<template>
  <div class="find-wrap borderBox height100">
    <van-nav-bar class="litheme" fixed :border="false"  @click-right="$router.push('/setting')">
      <van-icon name="setting-o" slot="right"/>
    </van-nav-bar>
    <div class="my-content-box">
      <div class="bgtheme">
        <div class="find-user max1100" @click="toUserPage">
          <img :src="user.avatar||'./imgs/avatar.png'">
          <div v-if="user._id">
            <p>{{user.name||user.phone}} <img class="icon-sex"  :src="user.sex==1?require('@/assets/img/male.svg'):require('@/assets/img/female.svg')"></p>
            <span>{{user.intro || '这个人超级懒，什么都没留下'}}</span>
            <van-icon class="me-icon" name="arrow" />
          </div>
          <div v-if="!user._id">
            <p>请先登录</p>
            <span>未登录不影响使用下面的功能</span>
            <van-icon class="me-icon" name="arrow" />
          </div>
        </div>
      </div>
      <div class="my-info max1100">
        <!-- <van-cell-group title="">
          <van-cell title="动态" is-link icon="./icons/星星.svg" />
        </van-cell-group> -->
        <van-cell-group title="">
          <van-cell title="天气" is-link icon="./icons/weather.svg" to='/weather' />
          <van-cell title="地图" is-link icon="./icons/map.svg" to='/MyMap' />
        </van-cell-group>
        <van-cell-group title="">
          <van-cell title="用一用" is-link icon="./icons/expression.svg" to='/applications' />
          <van-cell title="玩一玩" is-link icon="./icons/game.svg" to='/games' />
          <van-cell title="听一听" is-link icon="./icons/music.svg" to='/music' />
        </van-cell-group>
        <van-cell-group title="">
          <van-cell title="酷站" is-link icon="./icons/star.svg" to='/other' />
          <!-- <van-cell title="事务" is-link icon="./icons/list.svg" /> -->
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class UserCenter extends Vue {
  @Getter user!: any
  toUserPage () {
    if (this.user._id) {
      this.$router.push('/userhomepage/' + this.user._id)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.find-wrap{
  background: #f9f9f9;
  padding-top: 44px;
  padding-bottom: 55px;
  overflow-y: auto;
}
.bgtheme{
  background: #8b81f9;
  background: linear-gradient(to top,#7678f2,#8b81f9)!important;
}
.find-user{
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
  // background: #fff;
  // border-bottom: 1px solid #f4f4f4;
  // background-image: linear-gradient(to bottom, #fff, #f9f9f9);
  >img {
    background: #fefefe;
    width: 75x;
    height: 75px;
    border-radius: 4px;
    margin-right: 20px;
    border: 1px solid #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
    transition: 0.28s;
  }
  .me-icon{
    position: absolute;
    right: 15px;
    bottom: 50%;
    transform: translateY(50%);
    color: #ddd;
    font-size: 18px;
  }
  p{
    font-size: 17px;
    margin-bottom: 2px;
    color: #fefefe;
    font-weight: bold;
    margin-bottom: 5px;
    img{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fefefe;
      vertical-align: middle;
    }
  }
  span{
    font-size: 12px;
    color: #ddd;
  }
}
</style>
