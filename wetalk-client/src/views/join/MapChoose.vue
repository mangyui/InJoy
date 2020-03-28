<template>
  <div>
    <van-nav-bar class="map-nav litheme" fixed :border="false" title="选择地址" left-arrow @click-left="spaceBack">
      <van-icon name="aim" slot="right" @click="toMe"/>
    </van-nav-bar>
    <div id="MapBox">
    </div>
    <div class="join-bottom-btn max1100">
      <van-button class="btn-theme max-btn" type="info" @click.stop="chooseBack">确定</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
var mapSquare = require('@/util/mapSquare.js')

@Component
export default class MapChoose extends Vue {
  @Getter myAddress!: any

  BMap: any
  map: any
  mk: any // 我的定位标注
  mySquare: any // 活动标注
  joinAddress: any = {
    point: '',
    place: ''
  }
  initMap () {
    this.map = new this.BMap.Map('MapBox') // 创建Map实例
    let mpoint = this.myAddress.point || new this.BMap.Point(116.404, 39.915)
    this.map.centerAndZoom(mpoint, 16)
    this.map.enableScrollWheelZoom()
    this.map.enableDragging()
    this.map.addControl(new this.BMap.NavigationControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))
    this.map.addControl(new this.BMap.ScaleControl({ anchor: this.$win.BMAP_ANCHOR_TOP_LEFT }))

    this.map.addEventListener('click', (e: any) => {
      this.bindSquareEvent(e.point)
    })

    if (this.joinAddress.point) {
      this.bindSquareEvent(this.joinAddress.point)
    }

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
  bindSquareEvent (point: any) {
    this.map.removeOverlay(this.mySquare)
    // 添加自定义覆盖物
    this.mySquare = new mapSquare.SquareOverlay(point, 110, 40, '#7678f2', '目标地址')
    this.map.addOverlay(this.mySquare)

    // 为当前添加激活效果
    this.mySquare._div.classList.add('mapJoin-item-active')
    new this.BMap.Geocoder().getLocation(point, (rs: any) => {
      // addressComponents对象可以获取到详细的地址信息
      // var addComp = rs.addressComponents
      // var site = addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber
      // console.log(rs.address) // 详细地址
      this.joinAddress = {
        point: point,
        place: rs.address
      }
      this.map.panTo(point)
    })
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
  toMe () {
    if (this.myAddress.point) {
      this.map.panTo(this.myAddress.point)
      this.bindSquareEvent(this.myAddress.point)
    } else {
      this.getLocation()
    }
  }
  chooseBack () {
    if (this.joinAddress.place.trim() !== '') {
      this.$store.commit('SET_JOIN_ADDRESS', this.joinAddress)
      this.$router.go(-1)
    } else {
      this.$toast('请点击选择地址')
    }
  }
  spaceBack () {
    // this.$store.commit('RM_JOIN_ADDRESS')
    this.$router.go(-1)
  }
  mounted () {
    this.$toast.loading({
      duration: 0,
      message: '加载中...'
    })
    this.joinAddress = this.$store.getters.joinAddress
    this.BMap = this.$win.BMap
    this.getLocation()
  }
}
</script>

<style lang="less" scoped>

.join-bottom-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.8);
  >.van-button{
    opacity: 0.8;
  }
}
</style>
