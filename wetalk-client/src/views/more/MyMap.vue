<template>
  <div>
    <van-nav-bar class="map-nav litheme" fixed :border="false" title="地图" left-arrow @click-left="$router.go(-1)">
      <van-icon name="search" slot="right" @click="isSearch=true"/>
      <van-icon name="map-marked" slot="right" @click="toMe"/>
    </van-nav-bar>
    <form action="/" v-show="isSearch">
      <van-search class="map-search"
        v-model="value"
        placeholder="搜索地名"
        show-action
        @search="searchArea"
        @cancel="isSearch=false"
      />
    </form>
    <div id="MapBox"></div>
    <!-- <div id="results"></div> -->
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 30000
}

@Component
export default class MyMap extends Vue {
  private user: any = this.$store.getters.user
  @Getter myAddress!: any
  isSearch: boolean = false
  value: string = ''
  BMap: any
  map: any
  point: any
  mk: any
  timeEve: any
  // styleOptions : any = {
  //   strokeColor: 'red',    //边线颜色。
  //   fillColor: 'red',      //填充颜色。当参数为空时，圆形将没有填充效果。
  //   strokeWeight: 3,       //边线的宽度，以像素为单位。
  //   strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
  //   fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
  //   strokeStyle: 'solid' //边线的样式，solid或dashed。
  // }
  initMap () {
    this.map = new this.BMap.Map('MapBox') // 创建Map实例
    let mpoint = this.point || new this.BMap.Point(116.404, 39.915)
    this.map.centerAndZoom(mpoint, 17)
    this.map.enableScrollWheelZoom()
    this.map.enableDragging()
    this.map.addControl(new this.BMap.NavigationControl())
    this.map.addControl(new this.BMap.GeolocationControl())

    this.$toast.clear()
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
    // var drawingManager = new BMapLib.DrawingManager(this.map, {
    //   isOpen: true, // 是否开启绘制模式
    //   enableDrawingTool: true, // 是否显示工具栏
    //   drawingToolOptions: {
    //     anchor: 100, // 位置
    //     offset: new this.BMap.Size(5, 5), // 偏离值
    //   },
    //   circleOptions: this.styleOptions, // 圆的样式
    //   polylineOptions: this.styleOptions, // 线的样式
    //   polygonOptions: this.styleOptions, // 多边形的样式
    //   rectangleOptions: this.styleOptions // 矩形的样式
    // })
  }
  mapMyLocation (me: any) {
    let icon = new this.BMap.Icon('./imgs/mapThis.png', new this.BMap.Size(30, 40))
    if (this.mk) {
      this.mk.setPosition(me)
    } else {
      this.mk = new this.BMap.Marker(me, { icon: icon })
      this.initMap()
    }
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

  searchArea () {
    this.map.clearOverlays()
    let local = new this.BMap.LocalSearch(this.map, {
      renderOptions: { map: this.map }
    })
    local.searchInBounds(this.value, this.map.getBounds())
    if (this.mk) {
      this.map.addOverlay(this.mk)
    }
  }
  // addEve () {
  //   this.timeEve = setInterval(() => {
  //     this.getLocation(false)
  //   }, 10000)
  // }
  mounted () {
    this.$toast.loading({
      duration: 0,
      message: '加载中...'
    })
    this.BMap = this.$win.BMap
    this.getLocation()
    // this.addEve()
  }
  beforeDestroy () {
    if (this.timeEve) {
      clearInterval(this.timeEve)
    }
  }
}
</script>

<style lang="less" scoped>

.map-search{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
