<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="活动详情" left-arrow
      @click-left="$router.go(-1)">
       <van-icon name="ellipsis" slot="right" @click="showEdit=true"/>
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <div class="join-details-warp">
        <div class="join-title join-wrap">
          <div class="flex-rlc">
            <h2>{{currjoin.title}}</h2>
            <span><b class="join-number">{{currjoin.count}}</b>/{{currjoin.total}} 人</span>
          </div>
          <div>
            <p><van-icon name="label" /> {{['线上约', '线下约'][currjoin.type]}}</p>
            <p><van-icon name="underway" />{{$commomTime(currjoin.time)}}</p>
          </div>
        </div>
        <div class="join-user join-wrap">
          <div class="people-box">
            <img :src="currjoin.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">
            <div class="people-text mg-l-5">
              <span @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">{{currjoin.user.name||'匿名'}}</span>
            </div>
            <van-icon name="arrow" color="#ccc" />
          </div>
        </div>
        <div class="join-text join-wrap">
          <h3>活动详情</h3>
          <p>
            {{currjoin.details}}
          </p>
        </div>
        <div v-if="currjoin.place" class="join-place join-wrap">
          <h3>地址详情</h3>
          <p @click="gotoLocation">
            <img src="/imgs/mapMin.png">{{currjoin.place}}
          </p>
        </div>
        <div v-if="currjoin.imgList[0]" class="join-img join-wrap">
          <h3>活动图片</h3>
          <ImgBox :imgList="currjoin.imgList"/>
        </div>
      </div>
      <div class="comment-line">评论</div>
    </div>
    <div class="join-bottom-btn max1100">
      <van-button type="info" @click.stop="">发表评论</van-button>
      <van-button class="btn-theme" type="info" @click.stop="">立即沟通</van-button>
    </div>
    <van-action-sheet
      v-model="showEdit"
      :actions="actions"
      cancel-text="取消"
      :round="true"
    />
    <div v-show="showMask" class="white-mask">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'

@Component({
  components: {
    ImgBox
  }
})
export default class JoinDetails extends Vue {
  showEdit: boolean = false
  showMask: boolean = true
  actions: Array<any> = [
    { name: '修改' },
    { name: '删除', color: '#ee0a24' },
    { name: '举报', disabled: true }
  ]
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
  gotoLocation () {
    let point = new this.$win.BMap.Point(this.currjoin.pointX, this.currjoin.pointY)
    this.$store.commit('SET_TO_LOCATION', { point })
    this.$router.push('/location')
  }
  created () {
    this.getJoinById()
  }
}
</script>

<style lang="less" scoped>
.join-bottom-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  >.van-button{
    width: 50%;
    opacity: 0.8;
  }
  .btn-theme{
    margin-left: 10px;
  }
}
.join-details-warp{
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
.join-wrap{
  padding: 15px 0;
  border-bottom: 1px solid #f8f8f8;
}
.join-title{
  & div {
    display: flex;
    margin-top: 10px;
    & p {
      margin-right: 20px;
      display: flex;
      align-items: center;
      color: #555;
      font-size: 13px;
      & .van-icon{
        margin-right: 5px;
      }
    }
  }
  .join-number{
    font-size: 22px;
    color: #7678f2;
    margin-right: 2px;
  }
}
.join-user{
  img{
    width: 45px;
    height: 45px;
  }
}
.join-text p{
  color: #444;
  padding: 10px 0;
}
.join-place p{
  background: #f5f5f5;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 2px;
  img {
    width: 40px;
    margin-right: 10px;
  }
}
</style>
