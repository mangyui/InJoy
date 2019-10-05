<template>
  <div class="max1100">
    <div class="my-content-box">
      <van-search
        v-model="text"
        placeholder="搜索通知"
      />
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in 3" :key="index" @click="toPlay(item)">
          <img :src="'./imgs/ico.png'">
          <div class="list-item-left">
            <b>官方通知</b>
            <p>欢迎使用乐中APP,乐在其中</p>
          </div>
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
@import '../../styles/listitem.less';
.list-box .list-item  img{
  border-radius: 50%;
}
</style>
