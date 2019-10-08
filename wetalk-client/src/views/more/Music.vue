<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" fixed title="听一听" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <div class="my-content-fix max1100">
      <van-search
        v-model="text"
        placeholder="搜索音乐"
        @search="getMusic"
      />
      <div class="list-box">
        <div class="list-item" v-for="(item, index) in musics" :key="index" @click="toPlay(item)">
          <img v-lazy="item.pic">
          <div class="list-item-left">
            <b>{{item.title}}</b>
            <p>{{item.author}}</p>
          </div>
          <div class="list-item-right">
            <div v-if="isPlay!=0&&currentSong.songid==item.songid">
              <van-icon v-if="isPlay==1" name="pause-circle" color="#00a7ff"/>
              <van-icon v-else name="play-circle" color="#ccc"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Music extends Vue {
  @Getter isPlay!: number // ！声明肯定会有值
  @Getter currentSong!: any
  musics: Array<any> = []
  text: string = ''
  getMusic () {
    if (this.text.trim() !== '') {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      this.$toGet.getMusics({ name: this.text })
        .then((response: any) => {
          this.musics = response.result
          this.$toast.clear()
        })
        .catch((error: any) => {
          console.log(error)
          this.$toast.clear()
        })
    }
  }
  toPlay (song: any) {
    if (this.currentSong.songid === song.songid) {
      if (this.isPlay === 1) {
        this.$store.commit('TOPAUSE')
      } else {
        this.$store.commit('TOJIXU')
      }
    } else {
      this.$store.commit('TOPLAY', song)
    }
  }
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
