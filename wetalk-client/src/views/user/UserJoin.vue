<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="我发布的活动" left-arrow @click-left="$router.go(-1)" >
      <van-icon name="edit" slot="right"  @click="isEdit=!isEdit"/>
    </van-nav-bar>
    <van-pull-refresh class="my-content-fix max1100" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getMyJoin">
      <div class="list-box max1100">
        <template v-for="(item, index) in joinList">
          <van-panel
          class="join-box"
          :key="index" :title="item.title"
          :desc="['线上活动', '线下活动'][item.type]"
          :status="item.count+'/'+item.total"
          @click="$router.push('/joinDetails/' + item._id)">
            <div class="join-text">{{item.details}}</div>
            <br/>
            <van-grid v-show="item.imgList[0]" :border="false" :column-num="3" square>
              <van-grid-item>
                <van-image fit="cover" lazy-load v-show="item.imgList[0]" :src="item.imgList[0]" />
              </van-grid-item>
              <van-grid-item>
                <van-image fit="cover" lazy-load v-show="item.imgList[1]" :src="item.imgList[1]" />
              </van-grid-item>
              <van-grid-item>
                <van-image fit="cover" lazy-load v-show="item.imgList[2]" :src="item.imgList[2]" />
              </van-grid-item>
            </van-grid>
            <p v-if="item.place" class="van-ellipsis post-address"><van-icon name="location" />{{item.place}}</p>
            <div v-if="item.user" class="people-box mg-t-15">
              <img :src="item.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + item.user._id)">
              <div class="people-text mg-l-5">
                <span @click.stop="$router.push('/userhomepage/' + item.user._id)">{{item.user.name||'匿名'}}</span>
              </div>
              <p class="join-right-time"><span>{{$commomTime(item.time).substring(5, 16)}}</span><van-icon name="clock" /></p>
            </div>
            <div v-show="isEdit" slot="footer" class="my-right">
              <van-button size="small" type="danger" plain >删除</van-button>
              <van-button class="btn-theme" size="small" type="danger" @click.stop="$router.push('/joinEdit/'+item._id)">编辑</van-button>
            </div>
          </van-panel>
        </template>
        <div v-show="!joinList[0]" class="white-wrap my-tip-box">
          <br/>
          快去发布个活动呗！
        </div>
      </div>
    </van-pull-refresh>
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class UserJoin extends Vue {
  showMask: boolean = true
  isRefresh: boolean = false
  isEdit: boolean = false
  joinList: Array<any> = []
  getData: any = {
    id: this.$store.getters.user._id
  }
  getMyJoin () {
    this.$toPost.getJoinList(this.getData).then((res: any) => {
      res.data.pop()
      this.joinList = res.data
      this.showMask = false
      this.isRefresh = false
    }).catch((error: any) => {
      console.log(error)
      this.isRefresh = false
    })
  }
  created () {
    this.getMyJoin()
  }
}
</script>

<style lang="less" scoped>

.van-panel__footer .van-button {
    margin-left: 5px;
}
.van-pull-refresh{
  /deep/ .van-pull-refresh__track{
    height: 100%;
  }
}

</style>
