<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" :title="gClass.name" fixed left-arrow  @click-left="$router.go(-1)"></van-nav-bar>
    <div class="my-content-fix" @scroll="scroll" ref="content">
      <div class="max1100">
        <div v-show="!isOver" class="skeleton-box">
          <van-skeleton v-for="(item, index) in 10" :key="index" title :row="1" />
        </div>
        <van-index-bar>
          <template v-for="(item, index) in gList">
            <van-index-anchor :index="index" :key="index"/>
            <van-cell v-for="(lg, li) in item" :key="li" :title="lg" />
          </template>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const Letter = require('@/util/chineseFirst.js')

@Component
export default class GarbageList extends Vue {
  classId: string = ''
  isOver: boolean = false
  gClass: any = {}
  gList: any = {}
  scrollTop: number = 0
  getClassAndList () {
    this.$toPost.getClassAndList({ id: this.$route.params.id }).then((res: any) => {
      this.gClass = res.data.gClass
      this.gList = this.toGroup(res.data.gList)
      this.isOver = true
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
    // console.log(this.classId, this.$route.params.id)
    // if (this.classId !== this.$route.params.id) {
    //   this.getClassAndList()
    //   this.classId = this.$route.params.id
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
.skeleton-box{
  background: #fff;
  padding: 10px 0;
  max-height: 100%;
  overflow: hidden;
  .van-skeleton{
    margin-bottom: 10px;
  }
}
</style>
