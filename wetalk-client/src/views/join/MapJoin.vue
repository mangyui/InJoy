<template>
  <div>
    <van-nav-bar class="map-nav litheme" fixed :border="false" title="线下活动" left-arrow @click-left="$router.go(-1)">
      <van-icon name="aim" slot="right" @click="toMe"/>
    </van-nav-bar>
    <div id="MapBox">
    </div>
    <van-action-sheet v-model="showDetails" :overlay="false" :round="true" close-icon="cross"
    :title="chooseJoin>-1?joinList[chooseJoin].title:''" @close="planeClose">
      <div class="details-content">
        <div class="details-text">
          {{joinList[chooseJoin]?joinList[chooseJoin].details : ''}}
        </div>
        <div class="flex-rlc">
          <span class="join-distance">距离您：{{distance}}m</span>
          <van-button size="small" class="btn-theme" type="info" @click="$router.push('/joinDetails/'+joinList[chooseJoin]._id)">查看详情 >></van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

var mapSquare = require('@/util/mapSquare.js')

@Component
export default class MapJoin extends Vue {
  // private user: any = this.$store.getters.user
  @Getter myAddress!: any
  showDetails: boolean = false
  BMap: any
  map: any
  mk: any // 我的定位标注
  chooseJoin: number = -1
  distance: number = 0
  joinList: Array<any> = []
  getJoinList () {
    let data = {
      pointX: this.myAddress.point.lng,
      pointY: this.myAddress.point.lat,
      long: 1.0,
      type: 1
    }
    this.$toPost.getJoinByLocation(data).then((res: any) => {
      this.joinList = res.data
      this.bindSquareEvent()
    }).catch((err: any) => {
      console.log(err)
    })
  }
  initMap () {
    this.map = new this.BMap.Map('MapBox') // 创建Map实例
    let mpoint = this.myAddress.point || new this.BMap.Point(116.404, 39.915)
    this.map.centerAndZoom(mpoint, 16)
    this.map.enableScrollWheelZoom()
    this.map.enableDragging()
    this.map.addControl(new this.BMap.NavigationControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))
    this.map.addControl(new this.BMap.ScaleControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))

    this.map.disableDragging()
    // 触摸移动--开启拖动
    this.map.addEventListener('touchmove', () => {
      this.map.enableDragging()
    })

    // 触摸结束--开启禁止拖动
    this.map.addEventListener('touchend', () => {
      this.map.disableDragging()
    })
    this.getJoinList()
    this.$toast.clear()
  }
  bindSquareEvent () {
    this.joinList.forEach((item, index) => {
      // 添加自定义覆盖物
      var mySquare = new mapSquare.SquareOverlay(new this.BMap.Point(item.pointX, item.pointY), 110, 40, '#7678f2', item.title)
      this.map.addOverlay(mySquare)
      mySquare._div.addEventListener('click', (e: any) => {
        e.stopPropagation()
        if (this.chooseJoin !== index) { // 当点中新活动时
          this.showDetails = false
          this.chooseJoin = index
          // 通过Dom移除上次选中的激活效果
          let oldDoc = document.getElementsByClassName('mapJoin-item-active')[0]
          if (oldDoc) {
            oldDoc.classList.remove('mapJoin-item-active')
          }
          // 定位位置，并计算与我的距离
          let tpoint = new this.BMap.Point(item.pointX, item.pointY)
          this.map.panTo(tpoint)
          this.distance = this.map.getDistance(this.myAddress.point, tpoint).toFixed(2)
          // 卡片延迟出现，达到切换效果
          setTimeout(() => {
            this.showDetails = true
            // 为当前添加新的激活效果
            mySquare._div.classList.add('mapJoin-item-active')
          }, 200)
        } else { // 重复点击
          this.showDetails = !this.showDetails
          mySquare._div.classList.toggle('mapJoin-item-active')
        }
      })
    })
  }
  planeClose () {
    let oldDoc = document.getElementsByClassName('mapJoin-item-active')[0]
    if (oldDoc) {
      oldDoc.classList.remove('mapJoin-item-active')
    }
  }
  getLocation () {
    if (this.myAddress.point) {
      this.mapMyLocation(this.myAddress.point)
    } else {
      let geolocation = new this.BMap.Geolocation()
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition((position: any) => {
        let myLocation = {
          point: position.point,
          place: position.address.city
        }
        this.$store.commit('SET_MY_ADDRESS', myLocation)
        this.mapMyLocation(position.point)
      }, (err: any) => {
        console.log(err)
      }, { provider: 'baidu' })
    }
  }
  mapMyLocation (me: any) {
    let icon = new this.BMap.Icon('./icons/mapThis.png', new this.BMap.Size(30, 40))
    this.mk = new this.BMap.Marker(me, { icon: icon })
    this.initMap()
    this.map.addOverlay(this.mk)
    this.map.panTo(me)
  }
  toMe () {
    if (this.myAddress.point) {
      this.map.panTo(this.myAddress.point)
    } else {
      this.getLocation()
    }
  }
  mounted () {
    this.$toast.loading({
      duration: 0,
      message: '加载中...'
    })
    this.BMap = this.$win.BMap
    this.getLocation()
  }
}
</script>

<style lang="less" scoped>
#MapBox{
  width: 100%;
  height: calc(100% - 46px);
  margin-top: 46px;
  & /deep/ .anchorBL a{
    display: none;
  }
  & /deep/ .mapJoin-item {
    position: absolute;
    border-radius: 10px;
    box-shadow: 0 2px 6px #5a5eff;
    opacity: 0.80;
    align-items: center;
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    z-index: 800;
    &::after {
      display: block;
      content: '';
      border: 5px solid;
      border-width: 10px 8px;
      position: absolute;
      top: 100%;
      right: 50%;
      transform: translateX(50%);
      border-color: #797df3 transparent  transparent transparent;
    }
  }
  & /deep/ .mapJoin-item-active {
    opacity: 1;
    background: #595bd8!important;
    z-index: 801;
    &::after {
      border-color: #5c60e0 transparent  transparent transparent;
    }
  }
}
.van-action-sheet{
  box-shadow: 0 -2px 7px #abadf7;
  width: 96%;
  margin-left: 2%;
}
.details-content{
  margin: 20px;
  & .details-text{
    background: #ececff;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    min-height: 60px;
  }
  & .join-distance {
    color: #aaa;
    font-size: 12px;
  }
}
</style>
