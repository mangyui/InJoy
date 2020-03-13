<template>
  <div class="max1100">
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
        </van-panel>
      </template>
      <div v-show="!joinList[0]" class="white-wrap my-tip-box">
        <br/>
        赶紧去参与活动吧！
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoticeList extends Vue {
  joinList: Array<any> = []
  created () {
  }
}
</script>

<style lang="less" scoped>
.notice-box{
  padding: 5px 15px 15px;
  .notice-item{
    margin-bottom: 15px;
    border-radius: 5px;
    overflow: hidden;
    .notice-title {
      padding: 10px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(139, 129, 249, 0.8);
      span{
        color: #eee;
        font-size: 12px;
      }
    }
    .notice-content {
      color: #666;
      padding: 15px;
      min-height: 60px;
      background: rgba(139, 129, 249, 0.1);
    }
  }
}
</style>
