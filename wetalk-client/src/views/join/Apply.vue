<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed title="申请加入活动" left-arrow
      @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <van-panel :title="currjoin.title"
        :desc="['线上活动', '线下活动'][currjoin.type]"
        :status="currjoin.count+'/'+currjoin.total"
        @click="$router.push('/joinDetails/' + currjoin._id)">
        <div>{{currjoin.details}}</div>
        <div class="join-imgs-warp">
          <img :src="currjoin.imgList[0]">
          <img v-show="currjoin.imgList[1]" :src="currjoin.imgList[1]">
          <img v-show="currjoin.imgList[2]" :src="currjoin.imgList[2]">
        </div>
        <div class="people-box mg-t-15">
          <img :src="currjoin.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">
          <div class="people-text mg-l-5">
            <span @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">{{currjoin.user.name||'匿名'}}</span>
          </div>
          <p class="join-right-time"><span>{{$commomTime(currjoin.time).substring(5, 16)}}</span><van-icon name="clock" /></p>
        </div>
      </van-panel>
      <div>
        <van-cell-group>
          <div class="comment-line">申请信息</div>
          <van-field
            :value="user.name"
            readonly
            label="申请人"
          />
          <van-field
            :value="user.sex==1?'男':'女'"
            label="性别"
            readonly
          />
          <van-field
            v-model="applyData.text"
            label="备注"
            type="textarea"
            placeholder="介绍自己的情况，便于邀请人查看"
            autosize
          />
        </van-cell-group>
      </div>
      <van-button class="max-btn btn-theme" hairline type="danger" @click="applyJoin">立即申请</van-button>
      <br>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
})
export default class ApplyJoin extends Vue {
  @Getter user!: any
  showMask: boolean = true
  currjoin: any = {
    title: '',
    type: 1,
    details: '',
    total: 1,
    count: 0,
    time: '',
    place: '',
    pointX: '',
    pointY: '',
    imgList: [],
    user: {}
  }
  applyData: any = {
    text: ''
  }
  getJoinById () {
    let data: any = {
      id: this.$route.params.id
    }
    this.$toPost.getJoinById(data).then((res: any) => {
      if (res.data._id) {
        this.currjoin = res.data
        this.showMask = false
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
  applyJoin () {
    this.applyData.user = this.user._id
    this.applyData.join = this.currjoin._id
    this.$toPost.applyJoin(this.applyData).then((res: any) => {
      this.$toast('已发送申请')
      setTimeout(() => {
        this.$router.go(-1)
      }, 1500)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getJoinById()
  }
}
</script>
