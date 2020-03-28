<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="" fixed>
      <span slot="left">
        <van-icon name="location-o" size="1.2em"/>
        <span class="mg-l-5">{{myAddress.place || user.city}}</span>
      </span>
      <template #title>
        <van-search
          class="join-search-box"
          v-model="searchValue"
          shape="round"
          background="transparent"
          placeholder="搜索活动"
          @search="$router.push('/search?text='+searchValue)"
        />
      </template>
      <div class="home-my-avatar" slot="right">
        <img v-if="user._id" :src="user.avatar || './imgs/avatar.png'" @click="$router.push('/home/usercenter')">
        <van-icon v-if="!user._id" name="user-o" @click="$router.push('/login')"/>
      </div>
    </van-nav-bar>
    <div class="max1100" @scroll="scroll" ref="content">
      <div class="icon-menu white-wrap">
        <div class="icon-menu-item" @click="scanQrCode">
          <van-icon name="scan" />
          <p>扫一扫</p>
        </div>
        <div class="icon-menu-item"  @click="$router.push('/mapJoin')">
          <van-icon name="map-marked" />
          <p>活动地图</p>
        </div>
        <div class="icon-menu-item" @click="$router.push('/myApply')">
          <van-icon name="invition" />
          <p>我的申请</p>
        </div>
        <!-- <div class="icon-menu-item">
          <van-icon name="todo-list" />
          <p>他人申请</p>
        </div> -->
      </div>
      <van-sticky :offset-top="46">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="joinType" :options="joinTypeList" @change="joinListGet"/>
          <van-dropdown-item v-model="joinOrder" :options="joinOrderList" @change="joinListGet"/>
          <van-dropdown-item v-model="joinCity" :options="joinCityList" @change="joinListGet"/>
        </van-dropdown-menu>
      </van-sticky>
      <div class="join-wrap">
        <div v-show="!this.$refs.joinBox || !this.$refs.joinBox.joinList[0]" class="my-content-box white-wrap">
          <div v-for="item in 2"  :key="item">
            <br/>
            <van-skeleton  title :row="3" />
          </div>
        </div>
        <JoinList ref="joinBox" :type="joinType" :order="joinOrder" :isCity="joinCity"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import JoinList from '@/components/JoinList.vue'

@Component({
  components: {
    JoinList
  }
})
export default class Join extends Vue {
  @Getter user!: any
  @Getter myAddress!: any
  scrollTop: number = 0
  isOver: boolean = false
  searchValue: string = ''
  joinType: number = -1
  joinOrder: string = 'near'
  joinCity: boolean = true
  joinTypeList: Array<object> = [
    { text: '所有类型', value: -1 },
    { text: '线上约', value: 0 },
    { text: '线下约', value: 1 }
  ]
  joinOrderList: Array<object> = [
    { text: '近期活动', value: 'near' },
    { text: '默认排序', value: 'new' }
  ]
  joinCityList: Array<object> = [
    { text: '不限地区', value: false },
    { text: '同城活动', value: true }
  ]
  joinListGet () {
    Vue.nextTick(() => {
      // @ts-ignore
      this.$refs.joinBox.getJoinList()
    })
  }
  getMyLocation () {
    let geolocation = new this.$win.BMap.Geolocation()
    geolocation.getCurrentPosition((position: any) => {
      let myLocation = {
        point: position.point,
        place: position.address.city
      }
      this.$store.commit('SET_MY_ADDRESS', myLocation)
      this.joinListGet()
      this.$toast({
        message: '定位完成',
        position: 'bottom'
      })
      this.isOver = true
    }, (e: any) => {
      this.$toast('定位失败')
    }, { provider: 'baidu' })
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
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
  }
  mounted () {
    if (!this.myAddress.place || this.myAddress.place === '') {
      this.getMyLocation()
    } else {
      this.joinListGet()
    }
  }
}
</script>

<style lang="less" scoped>
.max1100{
  position: relative;
  height: 100%;
  overflow-y: auto;
  /deep/ .van-sticky--fixed{
    top: 46px!important;
  }
}
.van-cell-group{
  margin: 10px 0;
}
.join-wrap{
  padding-bottom: 50px;
}
.van-skeleton{
  margin-bottom: 15px;
}
.my-content-fix{
  position: fixed!important;
  top: 90px;
}
.join-search-box{
  padding: 0;
  height: 46px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  .van-search__content{
    background: rgba(255,255,255,0.4);
  }
  /deep/ .van-field__control{
    color: #fefefe;
  }
  /deep/ .van-icon{
    color: #eee;
    font-weight: bold;
  }
}
.icon-menu{
  padding: 20px 15px;
  .van-icon{
    font-size: 30px;
    background: rgba(0,0,0,0.05);
    border-radius: 50%;
    text-shadow: 0px 2px 15px;
    padding: 8px;
  }
  p{
    font-size: 13px;
    margin-top: 10px;
    color: #444;
  }
  .icon-menu-item {
    padding: 5px;
    justify-content: space-between;
    cursor: pointer;
    &:nth-child(1)  .van-icon {
      color: rgb(0, 170, 255);
      background: rgba(0, 170, 255, 0.1);
    }
    &:nth-child(2)  .van-icon {
      color: #7678f2;
      background: rgba(118, 120, 242, 0.1);
    }
    &:nth-child(3)  .van-icon {
      color: #f95063;
      background: rgba(249, 80, 99, 0.1);
    }
    &:nth-child(4)  .van-icon {
      color: rgb(83, 197, 137);
      background: rgba(83, 197, 137, 0.1);
    }
  }
}
.home-my-avatar{
  height: 46px;
  display: flex;
  align-items: center;
  img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .van-icon{
    background: #ddd;
    padding: 5px;
    border-radius: 50%;
  }
}
</style>
