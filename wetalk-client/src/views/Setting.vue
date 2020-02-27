<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed title="设置" left-arrow
      @click-left="$router.go(-1)"></van-nav-bar>
    <div class="my-edit max1100 my-content-fix">
      <van-cell-group>
        <van-cell title="账户安全" is-link />
      </van-cell-group>

      <van-cell-group>
        <van-cell title="清除位置缓存" is-link />
      </van-cell-group>

      <!-- <van-cell-group>
        <van-switch-cell v-model="isOpen" title="显示聊天室进出" @change="suChange"/>
      </van-cell-group> -->
      <van-cell-group>
        <van-cell title="关于乐中" is-link />
        <van-cell :value="currentVersion" is-link @click="toShow">
          <template slot="title">
            <span class="custom-title">检查更新</span>
            <van-tag v-show="myApp.value && myApp.value !== currentVersion" type="danger">NEW</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <van-button class="max-btn" plain hairline type="danger" @click="toLogin">{{this.$store.getters.user._id?'退出账号':'登录'}}</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Music extends Vue {
  // @Getter isShowInOut!: boolean
  currentVersion: string = '1.0.1'
  myApp: any = {}
  isOpen: boolean = false
  suChange (checked: boolean) {
    this.$store.commit('SETShowInOut', checked)
  }
  toLogin () {
    if (this.$store.getters.user._id) {
      this.$dialog.confirm({
        title: '确定要退出该账号吗？'
      }).then(() => {
        this.$store.commit('logoutUser')
        this.$router.replace('/login')
      }).catch(() => {
      })
    } else {
      this.$router.push('/login')
    }
  }
  toShow () {
    if (!this.myApp.value || this.myApp.value === this.currentVersion) {
      this.$dialog.alert({
        title: '当前已是最新版本',
        closeOnPopstate: true,
        closeOnClickOverlay: true
      }).then(() => {
      }).catch(() => {
      })
    } else {
      this.$dialog.alert({
        title: '乐中新版本' + this.myApp.value,
        message: '还不赶紧更新，发现更完美的乐中',
        confirmButtonText: '马上升级',
        closeOnPopstate: true,
        closeOnClickOverlay: true
      }).then(() => {
        window.open(this.myApp.other)
      }).catch(() => {
      })
    }
  }
  getVersion () {
    this.$toGet.getVersion().then((res: any) => {
      this.myApp = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  mounted () {
    this.getVersion()
  }
}

</script>
