<template>
  <div class="max1100">
    <div class="list-box">
      <van-pull-refresh class="refrsh-box" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="refreshList">
        <van-swipe-cell v-for="(item, index) in chatList" :key="index">
          <div class="list-item"  v-if="index.split('To')[0] === user._id&&item.mesgList[item.mesgList.length-1]" @click="$router.push('/UserChat/' + index.split('To')[1])">
            <img :src="item.user.avatar||'./imgs/avatar.png'">
            <div class="mess-right-l van-hairline--bottom">
              <b>{{item.user.name}}</b>
              <p class="van-ellipsis">{{item.mesgList[item.mesgList.length-1].type==2?'[图片]':(item.mesgList[item.mesgList.length-1].type==3?'[位置]':item.mesgList[item.mesgList.length-1].content)}}</p>
            </div>
            <span>{{$formatTime(item.mesgList[item.mesgList.length-1].time)}}</span>
          </div>
          <template slot="right">
            <van-button square type="danger" text="删除" @click="toDeleteChat(index)"/>
          </template>
        </van-swipe-cell>
        <div class="white-wrap my-tip-box">
          快去私信TA
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Getter } from 'vuex-class'

@Component({
  computed: {
    ...mapGetters(['chatList'])
  }
})
export default class PrivateChat extends Vue {
  @Getter user!: any
  isRefresh: boolean = false
  toDeleteChat (index: any) {
    this.$store.commit('RM_USER', index)
  }
  refreshList () {
    this.isRefresh = false
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.list-box{
  padding: 0 0px 45px;
  .list-item{
    display: flex;
    padding: 10px 15px 0;
    &:active{
      background-color: #ebe9ff;
    }
    >img{
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }
    .mess-right-l{
      flex-grow: 1;
      padding: 5px 0px 15px 15px;
      width: 0;
      p{
        color: #8f92a9;
        padding-top: 5px;
        line-height: 19px;
        font-size: 13px;
      }
      b{
        display: block;
        font-size: 16px;
        font-weight: normal;
        color: #333;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    span{
      font-size: 11px;
      color: #888;
      position: absolute;
      right: 15px;
    }
  }
}
</style>
