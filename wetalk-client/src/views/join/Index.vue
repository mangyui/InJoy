<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="" fixed
    >
      <span slot="left">
        <van-icon name="location-o" size="1.2em"/>
        <span class="mg-l-5">{{myAddress.place || user.city}}</span>
      </span>
      <van-icon name="map-marked" slot="right" @click="$router.push('/mapJoin')"/>
      <van-icon name="plus" slot="right" @click="$router.push('/joinEdit')"/>
    </van-nav-bar>
    <van-sticky :offset-top="46">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="joinType" :options="joinTypeList" @change="getJoinList"/>
        <van-dropdown-item v-model="joinOrder" :options="joinOrderList" @change="getJoinList"/>
      </van-dropdown-menu>
    </van-sticky>
    <div class="max1100 my-content-fix" @scroll="scroll" ref="content">
      <div class="join-wrap">
        <div v-show="!isOver" class="my-content-box white-wrap">
          <div v-for="item in 3"  :key="item">
            <br/>
            <van-skeleton  title :row="3" />
          </div>
        </div>
        <template v-for="(item, index) in joinList">
          <van-panel v-show="joinType==-1||joinType==item.type"
          :key="index" :title="item.title"
          :desc="['线上活动', '线下活动'][item.type]"
          :status="item.count+'/'+item.total"
          @click="$router.push('/joinDetails/' + item._id)">
            <div>{{item.details}}</div>
            <p class="join-right-time"><span>{{$commomTime(item.time)}}</span><van-icon name="clock" /></p>
            <div class="people-box mg-t-15">
              <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <div class="people-text mg-l-5">
                <span @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name||'匿名'}}</span>
              </div>
              <van-icon name="arrow" color="#ccc" />
            </div>
          </van-panel>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Join extends Vue {
  @Getter user!: any
  @Getter myAddress!: any
  scrollTop: number = 0
  isOver: boolean = false
  joinType: number = -1
  joinOrder: string = 'new'
  joinTypeList: Array<object> = [
    { text: '全部', value: -1 },
    { text: '线上约', value: 0 },
    { text: '线下约', value: 1 }
  ]
  joinOrderList: Array<object> = [
    { text: '近期活动', value: 'new' },
    { text: '热门活动', value: 'top' }
  ]
  joinList: Array<object> = []
  getJoinList () {
    let data = {
      pointX: this.myAddress.point.lng,
      pointY: this.myAddress.point.lat,
      long: 1.0,
      type: this.joinType,
      order: this.joinOrder
    }
    this.$toPost.getJoinByLocation(data).then((res: any) => {
      this.joinList = res.data
      this.isOver = true
    }).catch((err: any) => {
      console.log(err)
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
      this.getJoinList()
      this.$toast({
        message: '定位完成',
        position: 'bottom'
      })
    }, (e: any) => {
      this.$toast('定位失败')
    }, { provider: 'baidu' })
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
      this.getJoinList()
    }
  }
}
</script>

<style lang="less" scoped>
.max1100{
  position: relative;
}
.join-wrap{
  padding-bottom: 50px;
}
.van-cell__title, .van-dropdown-item /deep/ .van-cell__title {
  font-weight: normal;
}
.van-cell__title span{
  font-weight: bold;
  font-size: 15px;
}
.van-skeleton{
  margin-bottom: 15px;
}
.my-content-fix{
  position: fixed!important;
  top: 90px;
}
.join-right-time{
  display: flex;
  color: #999;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  & span{
    margin-right: 5px;
    font-size: 12px;
  }
}
</style>
