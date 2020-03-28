<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="我的申请记录" left-arrow
      @click-left="$router.go(-1)">
    </van-nav-bar>
    <van-pull-refresh class="refrsh-box max1100" :success-duration="1000" success-text="刷新完成" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getApply">
      <div class="list-box max1100">
        <template v-for="(item, index) in applyList">
          <van-swipe-cell :key="index">
            <div class="apply-box" @click.stop="$router.push('/joinDetails/' + item.join._id)">
              <div class="flex-rlc van-hairline--bottom">
                <van-tag mark :type="item.state==0?'default':'primary'">{{item.state==0?'待通过':'已加入'}}</van-tag>
                <span>{{$commomTime(item.time).substring(5, 16)}}</span>
              </div>
              <div class="apply-box-join">
                <p>活动：{{item.join.title}}<van-tag plain  :type="item.join.type===1?'warning':'success'" size="small">{{item.join.type===1?'线下':'线上'}}</van-tag></p>
                <p>主办方：{{item.join.user.name}}</p>
                <p>剩余时间：{{diffNow(item.join.time)}}</p>
              </div>
              <div class="apply-box-text van-multi-ellipsis--l2">{{item.text}}</div>
            </div>
            <template slot="right" v-if="item.state==0">
              <van-button @click="deleteApply(index)" square type="danger" text="撤销" />
            </template>
          </van-swipe-cell>
        </template>
        <div class="white-wrap my-tip-box">
          {{applyList[0]?'没有更多了':'赶紧去参与活动吧！'}}
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const tools = require('@/util/tools.js')

@Component
export default class MyApply extends Vue {
  @Getter user!: any
  isRefresh: boolean = true
  applyList: Array<any> = []
  diffNow: any = tools.diffNow
  getApply () {
    this.$toPost.getApplyByUser({ id: this.user._id }).then((res: any) => {
      this.applyList = res.data
      this.isRefresh = false
    }).catch((err: any) => {
      console.log(err)
    })
  }
  deleteApply (index: number) {
    this.$toast.loading({
      message: '执行中...',
      forbidClick: true
    })
    this.$toPost.deleteApply({ id: this.applyList[index]._id }).then((res: any) => {
      this.applyList.splice(index, 1)
      this.$toast.success('操作成功！')
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getApply()
  }
}
</script>

<style lang="less" scoped>
.apply-box{
  background: #fff;
  padding: 20px;
  color: #555;
  border-bottom: 4px solid #f8f8f8;
  .flex-rlc{
    padding: 10px 0;
    font-size: 12px;
    color: #888;
  }
  .apply-box-join {
    margin-top: 10px;
    flex-wrap: wrap;
    p{
      width: 50%;
      margin-bottom: 10px;
    }
    .van-tag{
      font-size: 11px;
      margin-left: 5px;
      padding: 2px 5px;
    }
  }
  .apply-box-text{
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
