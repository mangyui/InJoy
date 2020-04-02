<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed :title="currentSong.name" left-arrow @click-left="$router.go(-1)" >
    </van-nav-bar>
    <div class="my-content-fix max1100 music-wrap">
      <img :src="currentSong.img">
      <h3 class="music-art">{{currentSong.art}}</h3>
      <div class="flex-rlc">
        <span>{{name}}</span><span>{{getTime(currentSong.time)}}</span>
      </div>
      <van-slider v-model="value" active-color="#fff" inactive-color="#9b97f8"
        @drag-start="changeStart" @change="changeOver"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class MusicDetails extends Vue {
  @Getter isPlay!: number // ！声明肯定会有值
  @Getter currentSong!: any
  @Getter songTime!: any
  value: number = 0
  get name () {
    return this.getTime(this.songTime * this.currentSong.time / 100)
  }
  @Watch('songTime')
  changePlay (newValue: number, oldValue: number) {
    this.value = newValue
  }
  changeOver (value: any) {
    this.$store.commit('SET_SONG_TIME', value)
    let audio: any = document.getElementById('Audio')
    if ('fastSeek' in audio) {
      audio.fastSeek(value * this.currentSong.time / 100) // 改变audio.currentTime的值
    } else {
      // @ts-ignore
      audio.currentTime = parseInt(value * this.currentSong.time / 100000)
    }
    this.$store.commit('TOJIXU')
  }
  changeStart () {
    this.$store.commit('TOPAUSE')
    console.log(this.$route)
  }
  getTime (value: any) {
    if (isNaN(value)) {
      return '00:00'
    } else {
      // @ts-ignore
      let minutes = parseInt((parseInt(value) % (1000 * 60 * 60)) / (1000 * 60))
      // @ts-ignore
      let seconds = parseInt((parseInt(value) % (1000 * 60)) / 1000)

      return (minutes > 9 ? minutes : ('0' + minutes)) + ':' + (seconds > 9 ? seconds : ('0' + seconds))
    }
  }
  created () {

  }
}
</script>

<style lang="less" scoped>
.bgMax{
  background: #fff;
  background: linear-gradient(to top,#7678f2,#8b81f9)!important;
}
.music-wrap{
  padding: 20px;
  text-align: center;
  img{
    width: 240px;
    height: 240px;
    border-radius: 50%;
    box-shadow: 0 10px 24px #383a94;
  }
  .music-art{
    color: #eee;
    margin: 30px 0;
  }
  .flex-rlc{
    span{
      color: #ddd;
      font-size: 13px;
    }
    margin-bottom: 10px;
  }
}
</style>
