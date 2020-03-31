<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="二维码名片" left-arrow @click-left="$router.go(-1)" >
      <van-icon name="ellipsis" slot="right"/>
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <div class="my-theme-box">
        <div class="people-box van-hairline--bottom">
          <img :src="user.avatar || './imgs/avatar.png'">
          <div class="people-text mg-l-5">
            <span>{{user.name}}</span>
          </div>
        </div>
        <qrcode
          :url="codeUrl"
          :iconurl="user.avatar||'./imgs/avatar.png'"
          :wid="160"
          :hei="160"/>
          <p>打开乐中扫一扫，扫我</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

// @ts-ignore
import qrcode from 'vue_qrcodes'

@Component({
  components: {
    qrcode
  }
})
export default class UserQrCode extends Vue {
  @Getter user!: any
  codeUrl: String = ''
  created () {
    this.codeUrl = 'http://47.106.130.141:9566/#/userhomepage/' + this.user._id
  }
}
</script>

<style lang="less" scoped>
.bgMax{
  background: #fff;
  background: linear-gradient(to top,#7678f2,#8b81f9)!important;
}
.people-box{
  padding: 10px 0;
  margin-bottom: 30px;
  text-align: left;
  img{
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
}
.my-theme-box{
  background: #fff;
  margin: 24px;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  p {
    margin: 20px 0;
    color: #c6c6c6;
  }
}

</style>
