<template>
  <div>
    <van-nav-bar class="map-nav litheme" fixed :border="false" title="线下活动" left-arrow @click-left="$router.go(-1)">
      <span slot="right" @click="showArea=true">{{currCity}}</span>
      <van-icon name="hotel-o" slot="right" @click="showArea=true"/>
    </van-nav-bar>
    <div id="MapBox">
    </div>
    <!-- <div class="my-distance-slider">
      <van-slider v-model="distanceValue" vertical min="1" max="100"/>
    </div> -->
    <van-action-sheet v-model="showDetails" :overlay="false" :round="true" close-icon="cross"
    :title="chooseJoin>-1?joinList[chooseJoin].title:''" @close="planeClose">
      <div class="details-content">
        <div class="details-text">
          {{joinList[chooseJoin]?joinList[chooseJoin].details : ''}}
        </div>
        <div class="flex-rlc">
          <span class="join-distance">距离您：{{distance>1000?(distance/1000).toFixed(2)+'k':distance}}m</span>
          <van-button size="small" class="btn-theme" type="info" @click="$router.push('/joinDetails/'+joinList[chooseJoin]._id)">查看详情 >></van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" :columns-num="2" title="切换城市"
      :value="cityCode"
      @cancel="showArea=false"
      @confirm="areaConfirm"/>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { areaList } from '@/util/Area.ts'
var mapSquare = require('@/util/mapSquare.js')

@Component
export default class MapJoin extends Vue {
  // private user: any = this.$store.getters.user
  @Getter myAddress!: any
  showDetails: boolean = false
  showArea: boolean = false
  areaList: JSON = areaList
  currCity: string = ''
  cityCode: string = ''
  BMap: any
  map: any
  mk: any // 我的定位标注
  chooseJoin: number = -1
  ZoomNum: number = 16 // 地图放大倍数
  distance: number = 0
  joinList: Array<any> = []
  getJoinList () {
    if (this.ZoomNum <= 12) {
      return
    }
    let data = {
      city: this.currCity
    }
    this.$toPost.getJoinByCity(data).then((res: any) => {
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

    this.map.addEventListener('zoomend', () => {
      this.ZoomNum = this.map.getZoom() // 12（5公里）且不包含12为分界线
      if (this.ZoomNum <= 12) {
        this.map.clearOverlays()
        this.joinList = []
        this.map.addOverlay(this.mk)
      } else {
        if (!this.joinList[0]) {
          this.getJoinList()
        }
      }
    })
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
    this.map.clearOverlays()
    this.map.addOverlay(this.mk)
    this.joinList.forEach((item, index) => {
      // 添加自定义覆盖物
      var mySquare = new mapSquare.SquareOverlay(new this.BMap.Point(item.pointX, item.pointY), 110, 35, '#7678f2', item.title.substr(0, 7))
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
    let icon = new this.BMap.Icon('./imgs/mapThis.png', new this.BMap.Size(30, 40))
    this.mk = new this.BMap.Marker(me, { icon: icon })
    this.currCity = this.myAddress.place
    this.initMap()
  }
  toMe () {
    if (this.myAddress.point) {
      this.map.panTo(this.myAddress.point)
    } else {
      this.getLocation()
    }
  }
  areaConfirm (value: Array<any>) {
    this.currCity = value[1].name
    this.cityCode = value[1].code
    this.map.centerAndZoom(this.currCity, 13)
    this.showArea = false
    this.getJoinList()
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
.van-action-sheet{
  box-shadow: 0 -1px 7px #abadf7;
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
    line-height: 20px;
  }
  & .join-distance {
    color: #aaa;
    font-size: 12px;
  }
}
.my-distance-slider{
  height: 180px;
  position: fixed;
  right: 30px;
  top: 70px;
}
</style>
