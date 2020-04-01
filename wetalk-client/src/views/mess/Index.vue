<template>
  <div class="mess-wrap bgWhite" ref="content">
    <van-tabs class="my-theme-tabs" v-model="active" :border="false" sticky animated line-width="26" :offset-top="0">
      <van-tab title="提醒" name="m1">
        <NoticeList />
      </van-tab>
      <van-tab class="myTab-max" title="私信" name="m2">
        <privateChat />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NoticeList from './NoticeList.vue'
import privateChat from './PrivateChat.vue'

@Component({
  components: {
    NoticeList,
    privateChat
  }
})
export default class Message extends Vue {
  active: string = 'm2'
  created () {
  }
}
</script>

<style lang="less" scoped>
.myTab-max{
  /deep/ .van-tab__pane{
    height: 100%;
  }
}

.my-theme-tabs /deep/ .list-box{
  padding: 0 0px 45px;
  min-height: 400px;
  .list-item{
    display: flex;
    padding: 10px 15px 0;
    position: relative;
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
