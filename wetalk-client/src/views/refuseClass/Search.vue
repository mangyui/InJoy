<template>
  <div class="bgMax max1100 refuse-search-wrap">
    <form class="fix-top search-box" action="/">
      <van-search
        v-model="getData.name"
        placeholder="搜索垃圾"
        show-action
        @search="onSearch"
        @cancel="$store.commit('GOBACK')"
      />
    </form>
    <div v-show="isSearch">
      <p class="s-text">搜索最热</p>
      <van-cell-group>
        <van-cell v-for="(item, index) in refuseList" :key="index" :title="item.name">
          <span :style="{background: item.classId.color+'22', color: item.classId.color }" class="class-tag" slot="default">{{item.classId.name}}</span>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-show="!isSearch">
      <p class="s-text">共匹配到{{maxNumber}}项</p>
      <van-cell-group>
        <van-cell v-for="(item, index) in refuseList" :key="index" :title="item.name">
          <span :style="{background: item.classId.color+'22', color: item.classId.color }" class="class-tag" slot="default">{{item.classId.name}}</span>
        </van-cell>
      </van-cell-group>
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
    if (this.getData.name.trim() !== '') {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$toPost.getRubbish(this.getData).then((res: any) => {
        this.maxNumber = parseInt(res.data.pop())
        this.refuseList = res.data
        this.isSearch = false
        this.$toast.clear()
      }).catch((err: any) => {
        console.log(err)
        this.$toast.clear()
      })
    }
  }
  getMost () {
    this.$toGet.recentGs().then((res: any) => {
      this.refuseMost = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    // this.getMost()
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
