<template>
  <div class="max1100 my-content-fix">
    <van-pull-refresh class="refrsh-box" :success-duration="1000" success-text="刷新完成" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getOptionData">
      <div class="list-box max1100">
        <van-tabs sticky swipeable animated color="#8b81f9" title-active-color="#8b81f9">
          <van-tab title="点赞">
            <TipList type="点赞" :dataList="dataList.agree || []"/>
          </van-tab>
          <van-tab title="评论">
            <TipList type="评论" :dataList="dataList.comment || []"/>
          </van-tab>
          <van-tab title="申请">
            <TipList type="申请" :dataList="dataList.apply || []"/>
          </van-tab>
          <van-tab title="留言">
            <TipList type="留言" :dataList="dataList.message || []"/>
          </van-tab>
          <van-tab title="关注">
            <TipList type="关注" :dataList="dataList.follow || []"/>
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import TipList from './TipList.vue'

@Component({
  components: {
    TipList
  }
})
export default class NoticeList extends Vue {
  @Getter user!: any
  isRefresh: boolean = true
  dataList: any = []
  getOptionData () {
    this.$toPost.getOptionData({ id: this.user._id }).then((res: any) => {
      this.dataList = res.data
      this.isRefresh = false
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getOptionData()
  }
}
</script>

<style lang="less" scoped>
.my-content-fix{
  top: 0;
}
</style>
