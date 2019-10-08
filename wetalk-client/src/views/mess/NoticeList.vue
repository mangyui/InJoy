<template>
  <div class="max1100">
    <div class="">
      <van-search
        v-model="text"
        placeholder="搜索通知"
      />
      <div class="notice-box">
        <div class="notice-item" v-for="(item, index) in 3" :key="index">
          <div class="notice-title"><b>官方通知</b><span>10/06 16:29</span></div>
          <p class="notice-content">欢迎使用乐中APP, Enjoy In Joy, 乐在其中</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoticeList extends Vue {
  musics: Array<any> = []
  text: string = ''
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
      background: rgba(139, 129, 249, 0.2);
    }
  }
}
</style>
