<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="听一听" left-arrow @click-left="$router.go(-1)" >
      <span v-show="!isRecommend" slot="right" @click="getRecommend">推荐</span>
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <van-search
        v-model="text"
        placeholder="搜索音乐"
        @search="getMusic"
      />
      <div class="list-box">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="musics[0]?'没有更多啦~':''"
          @load="getMore"
        >
          <div class="list-item" v-for="(item, index) in musics" :key="index" @click="toPlay(index)">
            <img v-lazy="item.album.picUrl + '?param=130y130'">
            <div class="list-item-left">
              <b>{{item.name}}</b>
              <p>{{item.artists[0].name|| '匿名'}}</p>
            </div>
            <div class="list-item-right">
              <div v-if="isPlay!=0&&currentSong.songid==item.id">
                <van-icon v-if="isPlay==1" name="pause-circle" color="#00a7ff"/>
                <van-icon v-else name="play-circle" color="#ccc"/>
              </div>
            </div>
          </div>
        </van-list>
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
  loading: boolean = false
  finished: boolean = false
  musics: Array<any> = []
  text: string = ''
  getParams: any = {
    s: '',
    offset: 0,
    limit: 10
  }
  isRecommend: boolean = true
  recommend: any = {
    id: '2829883282'
  }
  getMusic () {
    if (this.text.trim() !== '') {
      this.$toast.loading({
        duration: 0,
        message: '搜索中...'
      })
      this.getParams.offset = 0
      this.getParams.s = this.text
      this.$toGet.getMusics(this.getParams)
        .then((response: any) => {
          this.musics = response.result.songs
          this.isRecommend = false
          this.$toast.clear()
        })
        .catch((error: any) => {
          console.log(error)
          this.$toast.clear()
        })
    }
  }
  getMore () {
    if (this.isRecommend || !this.musics[0]) {
      this.loading = false
      return
    }
    this.getParams.offset = this.getParams.offset + this.getParams.limit
    this.$toGet.getMusics(this.getParams)
      .then((response: any) => {
        this.musics = this.musics.concat(response.result.songs)
        this.loading = false
        if (response.result.songs.length < this.getParams.limit) {
          this.finished = true
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  getRecommend () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    })
    this.$toGet.getMusicRecommend(this.recommend)
      .then((response: any) => {
        this.musics = response.result.tracks
        this.isRecommend = true
        this.$toast.clear()
      })
      .catch((error: any) => {
        console.log(error)
        this.$toast.clear()
      })
  }
  toPlay (index: any) {
    let currSong = {
      songid: this.musics[index].id,
      url: 'https://music.163.com/song/media/outer/url?id=' + this.musics[index].id + '.mp3',
      img: this.musics[index].album.picUrl
    }
    if (this.currentSong.songid === currSong.songid) {
      if (this.isPlay === 1) {
        this.$store.commit('TOPAUSE')
      } else {
        this.$store.commit('TOJIXU')
      }
    } else {
      this.$store.commit('TOPLAY', currSong)
    }
  }
  created () {
    this.getRecommend()
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/listitem.less';
.list-box .list-item  img{
  border-radius: 50%;
}
</style>
