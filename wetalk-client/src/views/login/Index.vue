<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="" left-arrow
      @click-left="$router.go(-1)"></van-nav-bar>
      <div class="login-wrap">
        <div class="my-logo">
          <img :src="'./imgs/ico.png'">
        </div>
        <div class="login-box">
          <div class="login-item">
            <van-icon name="phone-o" />
            <input v-model="loginForm.phone" placeholder="手机号" type="text">
          </div>
          <div class="login-item">
            <van-icon name="certificate" />
            <input v-model="loginForm.vcode" placeholder="验证码" type="text">
            <van-button class="code-btn" size="small" color="#16cff0" @click="getVcode">{{msgText}}</van-button>
          </div>
        </div>
        <van-button class="max-btn"  color="#16cff0" @click="toLogin">登录</van-button>
        <div class="login-footer">
          <van-divider>未注册账号将直接注册并登录</van-divider>
          <!-- <div class="login-more">
            <div>
              <van-icon name="./icons/QQ.svg" />
              <p>QQ</p>
            </div>
            <div>
              <van-icon name="./icons/weibo.svg" />
              <p>微博</p>
            </div>
          </div> -->
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const MSGINIT = '发送验证码'
const MSGTIME = 60
const reg = /^1[3|4|5|7|8][0-9]\d{8}$/

@Component
export default class Login extends Vue {
  isGetting: boolean = false
  msgText: string = '发送验证码'
  msgTime: number = 60
  loginForm: any = {
    phone: this.$store.getters.rememberPhone,
    vcode: ''
  }
  getVcode () {
    if (this.isGetting) {
      return
    }
    if (!reg.test(this.loginForm.phone)) {
      this.$toast.fail('手机号不正确')
      return
    }
    this.isGetting = true
    this.$toPost.getVCode({ phone: this.loginForm.phone }).then((res: any) => {
      this.msgText = this.msgTime + 's'
      if (res.data.code) {
        this.loginForm.vcode = res.data.code
      }
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = this.msgTime + 's'
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.isGetting = false
          clearInterval(time)
        }
      }, 1000)
    }).catch((err: any) => {
      console.log(err)
      this.isGetting = false
      this.msgTime = MSGTIME
      this.msgText = MSGINIT
      this.$toast.fail('发送验证码失败')
    })
  }
  toLogin () {
    if (!reg.test(this.loginForm.phone) || !this.loginForm.vcode) {
      this.$toast('请正确填写')
      return
    }
    this.$toast.loading({
      mask: false,
      duration: 0,
      message: '登录中...'
    })
    this.loginForm.name = '用户' + this.loginForm.phone.substr(7)
    this.$toPost.loginVCode(this.loginForm).then((res: any) => {
      if (res.data.success) {
        this.$store.commit('initUserInfo', res.data.user)
        this.$store.commit('SET_TOKEN', res.data.token)
        location.reload()
        this.$toast.clear()
      } else {
        this.$toast.fail(res.data.result)
      }
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('登录操作失败')
    })
    this.$store.commit('SAVE_PHONE', this.loginForm.phone)
  }
}

</script>

<style lang="less" scoped>
.bgMax{
  background: #fff;
  background: linear-gradient(to top,#7678f2,#8b81f9)!important;
}
.login-wrap{
  max-width: 780px;
  margin: 0 auto;
  padding: 0 20px;
}
.login-box{
  padding: 20px;
}
.login-item{
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  .van-icon{
    font-size: 25px;
    color: #16cff0;
    margin-right: 10px;
  }
  input{
    flex-grow: 1;
    width: 0;
    background: transparent;
    border: 0;
    font-size: 15px;
    color: #f9f9f9;
    &::-webkit-input-placeholder{
      color: #ccc;
    }
  }
}
.login-footer{
  margin-top: 30px;
  padding: 20px;
  p,.van-divider{
    color: #ccc;
  }
  .van-icon{
    font-size: 30px;
  }
  .login-more{
    display: flex;
    align-items: center;
    justify-content: space-around;
    >div{
      text-align: center;
    }
  }
}
.code-btn{
  min-width: 78px;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}
</style>
