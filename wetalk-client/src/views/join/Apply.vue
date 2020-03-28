<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed title="申请加入活动" left-arrow
      @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <JoinBox :currjoin="currjoin" />
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
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import JoinBox from '@/components/JoinBox.vue'

@Component({
  components: {
    JoinBox
  }
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
      if (res.data && res.data._id) {
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
      }, 1000)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getJoinById()
  }
}
</script>
