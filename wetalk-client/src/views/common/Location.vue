<template>
  <div>
    <van-nav-bar class="map-nav litheme" fixed :border="false" title="目标地址" left-arrow @click-left="$router.go(-1)">
    </van-nav-bar>
    <div id="MapBox">
    </div>
    <div class="join-bottom-btn max1100">
      <p>{{placeName}}</p>
      <span>距离：{{distance>1000?(distance/1000).toFixed(2)+'k':distance}}m</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
var mapSquare = require('@/util/mapSquare.js')

@Component
export default class Location extends Vue {
  @Getter myAddress!: any
  @Getter toLocation!: any

  BMap: any
  map: any
  mk: any // 我的定位标注
  mySquare: any // 活动标注
  placeName: string = ''
  distance: number = 0
  initMap () {
    this.map = new this.BMap.Map('MapBox') // 创建Map实例
    let mpoint = this.myAddress.point || new this.BMap.Point(116.404, 39.915)
    this.map.centerAndZoom(mpoint, 16)
    this.map.enableScrollWheelZoom()
    this.map.enableDragging()
    this.map.addControl(new this.BMap.NavigationControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))
    this.map.addControl(new this.BMap.ScaleControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))

    this.bindSquareEvent()
    this.map.disableDragging()
    // 触摸移动--开启拖动
    this.map.addEventListener('touchmove', () => {
      this.map.enableDragging()
    })

    // 触摸结束--开启禁止拖动
    this.map.addEventListener('touchend', () => {
      this.map.disableDragging()
    })

    this.$toast.clear()
  }
  bindSquareEvent () {
    // 添加自定义覆盖物
    this.mySquare = new mapSquare.SquareOverlay(this.toLocation.point, 110, 40, '#7678f2', '目标')
    this.map.addOverlay(this.mySquare)

    // 为当前添加激活效果
    this.mySquare._div.classList.add('mapJoin-item-active')
    new this.BMap.Geocoder().getLocation(this.toLocation.point, (rs: any) => {
      this.placeName = rs.address
    })
    this.map.panTo(this.toLocation.point)
    this.distance = this.map.getDistance(this.myAddress.point, this.toLocation.point).toFixed(2)
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
    let icon = new this.BMap.Icon('./imgs/mapThis.png', new this.BMap.Size(30, 40))
    this.mk = new this.BMap.Marker(me, { icon: icon })
    this.initMap()
    this.map.addOverlay(this.mk)
  }
  mounted () {
    if (!this.toLocation.point) {
      this.$toast('无效地址')
      setTimeout(() => {
        this.$router.go(-1)
      }, 200)
    } else {
      this.$toast.loading({
        duration: 0,
        message: '加载中...'
      })
      this.BMap = this.$win.BMap
      this.getLocation()
    }
  }
}
</script>

<style lang="less" scoped>
.join-bottom-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  span{
    color: #aaa;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
