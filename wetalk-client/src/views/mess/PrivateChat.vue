<template>
  <div class="max1100">
    <div class="list-box">
      <van-pull-refresh class="refrsh-box" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="refreshList">
        <div class="msg-wrap">
          <van-swipe-cell v-for="(item, index) in chatList" :key="index">
            <div class="list-item"  v-if="index.split('To')[0] === user._id&&item.mesgList[item.mesgList.length-1]" @click="$router.push('/UserChat/' + index.split('To')[1])">
              <img :src="item.user.avatar||'./imgs/avatar.png'">
              <div class="mess-right-l van-hairline--bottom">
                <b>{{item.user.name}}</b>
                <p class="van-ellipsis">{{item.mesgList[item.mesgList.length-1].type==2?'[图片]':(item.mesgList[item.mesgList.length-1].type==3?'[位置]':item.mesgList[item.mesgList.length-1].content)}}</p>
              </div>
              <span>{{$formatTime(item.mesgList[item.mesgList.length-1].time)}}</span>
              <p v-show="item.noRead&&item.noRead>0" class="noread-num">{{item.noRead}}</p>
            </div>
            <template slot="right">
              <van-button square type="info" text="标记已读" @click="toAllRead(index)"/>
              <van-button square type="danger" text="删除" @click="toDeleteChat(index)"/>
            </template>
          </van-swipe-cell>
        </div>
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
  toAllRead (index: any) {
    this.$store.commit('ALL_READ', index)
  }
  refreshList () {
    this.isRefresh = false
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.max1100{
  height: 100%;
  overflow: auto;
}
.msg-wrap{
  display: flex;
  flex-direction: column-reverse;
}
.mess-right-l{
  padding-right: 25px!important;
}
.noread-num{
  position: absolute;
  right: 15px;
  background: #f40;
  top: 35px;
  color: #fff;
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 20px;
}
</style>
