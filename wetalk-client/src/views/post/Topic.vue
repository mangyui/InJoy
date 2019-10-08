<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" fixed title="话题" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <div class="my-content-fix max1100">
      <van-search
        v-model="text"
        placeholder="搜索话题"
        @search="getSearch"
      />
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in lists" :key="index" @click="selectTopic(item)">
          <img :src="item.img || './imgs/avatar.png'">
          <div class="list-item-left">
            <b>{{item.name}}</b>
            <p>{{item.desc}}</p>
          </div>
          <!-- <div class="list-item-right">
            <van-button size="small" @click="">选择</van-button>
          </div> -->
        </div>
        <br />
        <van-divider>话题添加中</van-divider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Topic extends Vue {
  lists: Array<any> = []
  text: string = ''
  selectTopic (item: any) {
    this.$store.commit('SELECT_TOPIC', item)
    this.$router.go(-1)
  }
  getSearch () {
  }
  getTopic () {
    this.$toGet.getTopic().then((res: any) => {
      this.lists = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
    this.getTopic()
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/listitem.less';
</style>
