<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="我发布的活动" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <van-pull-refresh class="my-content-fix max1100" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getMyJoin">
      <div class="list-box max1100">
        <template v-for="(item, index) in joinList">
          <van-panel v-show="joinType==-1||joinType==item.type"
          :key="index" :title="item.title"
          :desc="['线上活动', '线下活动'][item.type]"
          :status="item.count+'/'+item.total"
          @click="$router.push('/joinDetails/' + item._id)">
            <div>{{item.details}}</div>
            <div v-if="item.user" class="people-box mg-t-15">
              <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <div class="people-text mg-l-5">
                <span @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name||'匿名'}}</span>
              </div>
              <p class="join-right-time"><span>{{$commomTime(item.time).substring(5, 16)}}</span><van-icon name="clock" /></p>
            </div>
            <div slot="footer" class="my-right">
              <van-button size="small" type="danger" plain >删除</van-button>
              <van-button class="btn-theme" size="small" type="danger">完成</van-button>
            </div>
          </van-panel>
        </template>
        <div v-show="!joinList[0]" class="white-wrap my-tip-box">
          <br/>
          快去发布个活动呗！
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class UserJoin extends Vue {
  isRefresh: boolean = false
  joinType: number = -1
  joinList: Array<any> = []
  getData: any = {
    userId: this.$store.getters.user._id
  }
  getMyJoin () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    })
    this.$toPost.getJoinList(this.getData).then((res: any) => {
      res.data.pop()
      this.joinList = res.data
      this.$toast.clear()
      this.isRefresh = false
    }).catch((error: any) => {
      console.log(error)
      this.$toast.clear()
      this.isRefresh = false
    })
  }
  created () {
    this.getMyJoin()
  }
}
</script>

<style lang="less" scoped>
.join-right-time{
  display: flex;
  color: #aaa;
  align-items: center;
  justify-content: flex-end;
  span{
    margin-right: 5px;
    font-size: 12px;
  }
  .van-icon {
    font-size: 16px;
  }
}
.van-cell__title, .van-dropdown-item /deep/ .van-cell__title {
  font-weight: normal;
}
.van-panel__footer .van-button {
    margin-left: 5px;
}
</style>
