<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" fixed title="用一用" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <div class="my-content-fix max1100">
      <van-search
        v-model="text"
        placeholder="搜索小应用"
        @search="getSearch"
      />
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in lists" :key="index">
          <img :src="item.pic">
          <div class="list-item-left">
            <b>{{item.title}}</b>
            <p>{{item.desc}}</p>
          </div>
          <div class="list-item-right">
            <van-button size="small" @click="toStart(item)">启动</van-button>
          </div>
        </div>
        <br />
        <van-divider>敬请期待</van-divider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Applications extends Vue {
  lists: Array<any> = [{
    title: 'base64编码/解码',
    pic: 'http://images.liqucn.com/h018/h47/img201411030418350433_info300X300.png',
    desc: 'base64转化原文本，原文本转化base64',
    url: '/applications/base64'
  }, {
    title: '文字识别',
    pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570016680280&di=4a93a34a2481e02ae54c92e69d83f6b5&imgtype=0&src=http%3A%2F%2Fimg.lenovomm.com%2Fs3%2Fimg%2Ficon%2Fapp%2Fapp-img-lestore%2F5349-2018-12-24053741-1545644261811.png',
    desc: '在线图像文字识别',
    otherWeb: 'http://47.106.130.141:9530/#/'
  }]
  text: string = ''
  getSearch () {
  }
  toStart (item: any) {
    if (item.url) {
      this.$router.push(item.url)
    } else if (item.otherWeb) {
      this.$store.commit('SET_OTHER_URL', item.otherWeb)
      this.$router.push('/web')
    }
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/listitem.less';
</style>
