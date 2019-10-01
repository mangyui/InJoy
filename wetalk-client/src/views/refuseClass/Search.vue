<template>
  <div class="bgMax refuse-search-wrap">
    <form class="fix-top search-box" action="/">
      <van-search
        v-model="text"
        placeholder="搜索垃圾"
        show-action
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>
    <div class="my-content-box">
      <div class="max1100">
        <div v-show="isSearch">
          <p class="s-text">搜索最热</p>
          <van-cell-group>
            <van-cell v-for="(item, index) in refuseMost" :key="index" :title="item.name">
              <span :style="{background: item.classId.color+'22', color: item.classId.color }" class="class-tag" slot="default">{{item.classId.name}}</span>
            </van-cell>
          </van-cell-group>
        </div>
        <div v-show="!isSearch">
          <p class="s-text">共匹配到 {{maxNumber}} 项</p>
          <van-cell-group>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有了"
              @load="getMore"
            >
              <van-cell v-for="(item, index) in refuseList" :key="index">
                <template slot="title">
                  <span class="custom-title" v-html="item.name"></span>
                </template>
                <span :style="{background: item.classId.color+'22', color: item.classId.color }" class="class-tag" slot="default">{{item.classId.name}}</span>
              </van-cell>
            </van-list>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MSTminxin from '@/util/MSTminxin'

@Component({
  mixins: [MSTminxin]
})
export default class Search extends Vue {
  loading: boolean = false
  finished: boolean = false
  text: string = ''
  maxNumber: number = 0
  getData: any = {
    page: 1,
    number: 20,
    name: '',
    classId: 0
  }
  refuseList: Array<any> = []
  refuseMost: Array<any> = []
  isSearch: boolean = true
  onSearch () {
    if (this.text.trim() !== '') {
      this.refuseList = []
      this.finished = false
      this.getData.name = this.text
      this.getData.page = 1
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$toPost.getRubbish(this.getData).then((res: any) => {
        this.maxNumber = parseInt(res.data.pop())
        this.refuseList = this.heightLight(res.data)
        this.isSearch = false
        if (res.data.length < this.getData.number) {
          this.finished = true
        }
        this.$toast.clear()
      }).catch((err: any) => {
        console.log(err)
        this.$toast.clear()
      })
    }
  }
  getMore () {
    this.getData.page += 1
    this.$toPost.getRubbish(this.getData).then((res: any) => {
      res.data.pop()
      this.refuseList = this.refuseList.concat(this.heightLight(res.data))
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  heightLight (arr: Array<any>) {
    let value = this.getData.name
    arr.forEach((item: any) => {
      // 匹配关键字正则
      var replaceReg = new RegExp(value, 'g')
      // 高亮替换v-html值
      var replaceString = '<span style="background:#ff0;font-weight: bold;">' + value + '</span>'
      // 开始替换
      item.name = item.name.replace(replaceReg, replaceString)
    })
    return arr
  }
  getMost () {
    this.$toGet.getRubbishMost().then((res: any) => {
      this.refuseMost = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getMost()
  }
}
</script>

<style lang="less" scoped>
.s-text{
  margin-top: 30px;
  padding: 0 15px;
  color: #666;
}

</style>
