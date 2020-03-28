<template>
  <div class="max1100">
    <van-pull-refresh class="refrsh-box" :success-duration="1000" success-text="刷新完成" pulling-text="下拉刷新" v-model="isRefresh">
      <div class="list-box max1100">
        <van-tabs sticky swipeable animated color="#8b81f9">
          <van-tab title="点赞">
            <div class="white-wrap my-tip-box">
              <br/>
              暂无点赞
            </div>
          </van-tab>
          <van-tab title="评论">
            <div class="white-wrap my-tip-box">
              <br/>
              暂无评论
            </div>
          </van-tab>
          <van-tab title="申请">
            <div class="white-wrap my-tip-box">
              <br/>
              暂无申请
            </div>
          </van-tab>
          <van-tab title="关注">
            <div class="white-wrap my-tip-box">
              <br/>
              暂无关注
            </div>
          </van-tab>
          <van-tab title="留言">
            <div class="white-wrap my-tip-box">
              <br/>
              暂无留言
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const tools = require('@/util/tools.js')

@Component
export default class NoticeList extends Vue {
  @Getter user!: any
  isRefresh: boolean = true
  created () {

  }
}
</script>

<style lang="less" scoped>

</style>
