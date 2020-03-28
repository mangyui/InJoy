<template>
  <div class="find-wrap borderBox height100">
    <van-nav-bar class="litheme" fixed :border="false" >
      <van-icon name="qr" slot="right" @click="$router.push('/UserQrCode')"/>
      <van-icon name="edit" slot="right"  @click="$router.push('/UserEdit')"/>
    </van-nav-bar>
    <div class="my-content-fix">
      <div class="bgtheme">
        <div class="find-user max1100" @click="toUserPage('/userhomepage/')">
          <img :src="user.avatar||'./imgs/avatar.png'">
          <div v-if="user._id">
            <p>{{user.name||user.phone}} <img class="icon-sex"  :src="user.sex==1?'./icons/male.svg':'./icons/female.svg'"></p>
            <span>{{user.intro || '这个人超级懒，什么都没留下'}}</span>
            <van-icon class="me-icon" name="arrow" />
          </div>
          <div v-if="!user._id">
            <p>请先登录</p>
            <span>登录认识更多的人</span>
            <van-icon class="me-icon" name="arrow" />
          </div>
        </div>
      </div>
      <div class="my-info max1100">
        <div class="my-user-digit">
          <div @click="$router.push('/userjoin/')">
            <span>{{dataNumber.joinCount||0}}</span>
            <p>活动</p>
          </div>
          <div @click="toUserPage('/userhomepage/')">
            <span>{{dataNumber.postCount||0}}</span>
            <p>动态</p>
          </div>
          <div @click="toUserPage('/following/')">
            <span>{{dataNumber.followCount||0}}</span>
            <p>关注</p>
          </div>
          <div @click="toUserPage('/followers/')">
            <span>{{dataNumber.followersCount||0}}</span>
            <p>粉丝</p>
          </div>
        </div>
        <van-cell-group title="">
          <van-cell title="垃圾分类" is-link icon="./icons/bottle.svg" to='/refuseclass' />
          <van-cell title="地图" is-link icon="./icons/map.svg" to='/MyMap' />
          <!-- <van-cell title="天气" is-link icon="./icons/weather.svg" to='/weather' /> -->
        </van-cell-group>
        <van-cell-group title="">
          <van-cell title="扫一扫" is-link icon="./icons/scan.svg" @click="scanQrCode" />
          <van-cell title="听一听" is-link icon="./icons/music.svg" to='/music' />
          <van-cell title="用一用" is-link icon="./icons/expression.svg" to='/applications' />
        </van-cell-group>
        <van-cell-group title="">
          <!-- <van-cell title="酷站" is-link icon="./icons/star.svg" to='/other' />
          <van-cell title="事务" is-link icon="./icons/list.svg" /> -->
          <van-cell title="设置" is-link icon="./icons/setting.svg" to='/setting' />
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
  dataNumber: any = {}
  toUserPage (path: string) {
    if (this.user._id) {
      this.$router.push(path + this.user._id)
    } else {
      this.$router.push('/login')
    }
  }
  getUserNumber () {
    this.$toPost.getUserNumber({ id: this.user._id }).then((res: any) => {
      this.dataNumber = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  scanQrCode () {
    // @ts-ignore
    cordova.plugins.barcodeScanner.scan(
      (result: any) => {
        if (result.cancelled) {
          this.$toast('取消扫描')
        } else if (result.text) {
          this.$toast(result.text)
          let arr = result.text.split('#')
          if (arr[0] === 'http://47.106.130.141:9566/') {
            let arr2 = arr[1].split('/')
            if (arr2[2].length === 24) {
              this.$router.push(arr[1])
            } else {
              this.$toast.fail('该二维码无效')
            }
          } else {
            this.$toast.fail('无法识别非本应用的二维码')
          }
        }
      },
      (error: any) => {
        console.log(error)
        this.$toast(error)
      }
    )
  }
  activated () {
    if (this.user._id) {
      this.getUserNumber()
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
  .van-cell-group{
    margin: 10px 0;
  }
}
.bgtheme{
  background: #8b81f9;
  background: linear-gradient(to top,#7678f2,#8b81f9)!important;
  padding-bottom: 65px;
}
.my-user-digit{
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin: 0 15px;
  border-radius: 5px;
  padding: 20px 10px;
  position: relative;
  box-shadow: 0 2px 6px 1px rgba(0,0,0,0.03);
  & > div {
    text-align: center;
    span{
      font-size: 21px;
      color: #7979f3;
      font-weight: bold;
    }
    p{
      margin-top: 8px;
      color: #888;
      font-size: 13px;
    }
  }
}
.find-user{
  display: flex;
  align-items: center;
  padding: 0px 15px 0px 20px;
  position: relative;
  // background: #fff;
  // border-bottom: 1px solid #f4f4f4;
  // background-image: linear-gradient(to bottom, #fff, #f9f9f9);
  >img {
    background: #fefefe;
    width: 65x;
    height: 65px;
    border-radius: 50%;
    margin-right: 15px;
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
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fefefe;
      vertical-align: top;
    }
  }
  span{
    font-size: 12px;
    color: #ddd;
  }
}
.my-info{
  padding-bottom: 55px;
  margin-top: -50px;
}
</style>
