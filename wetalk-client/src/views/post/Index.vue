<template>
  <div class="bgMax max1100">
    <van-nav-bar class="litheme" :border="false" title="大厅" fixed>
      <van-icon name="search" slot="right"  @click="$router.push('/search')"/>
    </van-nav-bar>
    <div class="my-content-box" @scroll="scroll" ref="content">
      <van-pull-refresh  pulling-text="下拉刷新" v-model="isLoading" @refresh="onRefresh">
        <div class="post-box">
          <div class="post-item" v-for="(item,index) in 15" :key="index" @click="$router.push('/postdetails/'+index)">
            <div class="post-user">
              <img src="http://p2.music.126.net/MHIswsnZuYdel2_roaLlYg==/109951164192558480.jpg?param=300x300">
              <div class="post-user-text">
                <p>沙雕{{index+1}}号</p>
                <span>9/13 21:46</span>
              </div>
            </div>
            <div class="post-content">
              <p>突然有一天西游记没经费了，于是师徒四人.....</p>
              <ImgBox :num="index"/>
            </div>
            <b class="post-tag">
              <div>
                <span>#</span><p>沙雕俱乐部</p>
              </div>
            </b>
            <div class="post-san">
              <div><van-icon name="share"/>15</div>
              <div><van-icon name="comment-o" />15</div>
              <div><van-icon name="upgrade" />15</div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
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
export default class Lobby extends Vue {
  isLoading: boolean = false
  scrollTop: number = 0
  onRefresh () {
    setTimeout(() => {
      this.$toast('刷新成功')
      this.isLoading = false
    }, 1000)
  }
  scroll () {
    // @ts-ignore
    this.scrollTop = this.$refs.content.scrollTop
  }
  activated () {
    // @ts-ignore
    this.$refs.content.scrollTop = this.scrollTop
  }
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.post-box{
  padding-bottom: 42px;
}
</style>
