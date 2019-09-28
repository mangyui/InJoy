<template>
  <div class="bgMax max1100">
    <van-nav-bar class="litheme" :border="false" :title="gClass.name" fixed left-arrow  @click-left="$store.commit('GOBACK')"></van-nav-bar>
    <van-index-bar :sticky-offset-top="46">
      <template v-for="(item, index) in gList">
        <van-index-anchor :index="index" :key="index"/>
        <van-cell v-for="(lg, li) in item" :key="li" :title="lg" />
      </template>
    </van-index-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MSTminxin from '@/util/MSTminxin'
const Letter = require('@/util/chineseFirst.js')

@Component({
  mixins: [MSTminxin]
})
export default class GarbageList extends Vue {
  gClass: any = {}
  gList: Array<any> = []
  getClassAndList () {
    this.$toPost.getClassAndList({ id: this.$route.params.id }).then((res: any) => {
      this.gClass = res.data.gClass
      this.gList = this.toGroup(res.data.gList)
      // console.log(this.gList)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  toGroup (arr: Array<any>) {
    let group: any = {}
    for (var i = 65; i < 91; i++) {
      group[String.fromCharCode(i)] = []
    }
    group['*'] = []
    for (let i = 0; i < arr.length; i++) {
      let gname = Letter(arr[i].name)[0]
      if (/^[A-Z]+$/.test(gname)) {
        group[gname].push(arr[i].name)
      } else {
        group['*'].push(arr[i].name)
      }
    }
    return group
  }
  created () {
    this.getClassAndList()
  }
}

</script>

<style lang="less" scoped>
.litheme{
  z-index: 9!important;
}
.van-index-bar{
  background: #f8f8f8;
}
</style>
