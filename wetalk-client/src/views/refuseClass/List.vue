<template>
  <div class="bgMax max1100">
    <van-nav-bar class="litheme" :border="false" :title="gClass.name" fixed left-arrow  @click-left="$router.go(-1)"></van-nav-bar>
    <div class="my-content-box" @scroll="scroll" ref="content">
      <van-index-bar>
        <template v-for="(item, index) in gList">
          <van-index-anchor :index="index" :key="index"/>
          <van-cell v-for="(lg, li) in item" :key="li" :title="lg" />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const Letter = require('@/util/chineseFirst.js')

@Component
export default class GarbageList extends Vue {
  gClass: any = {}
  gList: Array<any> = []
  scrollTop: number = 0
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
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
    // if (this.$store.getters.isForward) {
    //   this.getClassAndList()
    // }
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
