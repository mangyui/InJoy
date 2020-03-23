<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" fixed title="申请列表" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <van-pull-refresh class="my-content-fix max1100" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getJoinById">
      <div class="apply-top-title">
        <van-cell-group>
          <van-cell title="活动" :value="currJoin.title" />
          <van-cell title="邀请人数" :value="currJoin.total" />
          <van-cell title="已有人数" :value="currJoin.count" />
        </van-cell-group>
      </div>
      <div class="comment-line"><span>全部申请</span><span v-if="currJoin.user&&user._id===currJoin.user._id" class="my-right-tip">请向左划操作申请项</span></div>
      <div class="list-box">
        <van-swipe-cell v-for="(item, index) in applyList" :key="index">
          <div class="list-item"  @click="$router.push('/userhomepage/' + item.from_user._id)">
            <img :src="item.user.avatar||'./imgs/avatar.png'">
            <div class="list-item-left">
              <b>{{item.user.name}}</b>
              <p>{{item.text}}</p>
            </div>
            <div class="list-item-right">
              <van-tag mark :type="item.state==0?'default':'primary'">{{item.state==0?'待通过':'已同意'}}</van-tag>
            </div>
          </div>
          <template #right v-if="currJoin.user&&user._id===currJoin.user._id">
            <van-button @click.stop="setApplyPass(index)" square :type="item.state==0?'info':'danger'" :text="item.state==0?'同意':'取消'" />
          </template>
        </van-swipe-cell>
        <div v-show="!applyList[0]" class="white-wrap my-tip-box">
          <br/>
          无人问津
        </div>
      </div>
    </van-pull-refresh>
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ApplyList extends Vue {
  @Getter user!: any
  showMask: boolean = true
  isRefresh: boolean = false
  currJoin: any = {}
  applyList: Array<any> = []
  getJoinById () {
    let data: any = {
      id: this.$route.params.id
    }
    this.$toPost.getJoinById(data).then((res: any) => {
      if (res.data && res.data._id) {
        this.currJoin = res.data
        this.showMask = false
        this.getApplyByJoin()
      } else {
        this.$notify({ type: 'warning', message: '活动不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  getApplyByJoin () {
    this.$toPost.getApplyByJoin({ id: this.$route.params.id }).then((res: any) => {
      this.applyList = res.data
      this.isRefresh = false
      this.showMask = false
    }).catch((error: any) => {
      console.log(error)
      this.isRefresh = false
    })
  }
  setApplyPass (index: number) {
    this.$toast.loading({
      message: '执行中...',
      forbidClick: true
    })
    let data = {
      id: this.applyList[index]._id,
      state: this.applyList[index].state === 0 ? 1 : 0
    }
    this.$toPost.setApplyPass(data).then((res: any) => {
      this.currJoin.count = res.data.count
      this.applyList[index].state = res.data.state
      this.$toast.success('操作成功！')
    }).catch((error: any) => {
      console.log(error)
    })
  }
  created () {
    this.getJoinById()
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/listitem.less';
.list-box .list-item  img{
  border-radius: 50%;
}
.van-pull-refresh{
  /deep/ .van-pull-refresh__track{
    height: 100%;
  }
}
.apply-top-title{
  background: #f8f8f8;
  overflow: hidden;
}
.comment-line{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  .my-right-tip{
    font-size: 12px;
    color: #aaa;
  }
}

</style>
