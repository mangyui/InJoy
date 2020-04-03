<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed :title="currentSong.name" left-arrow @click-left="$router.go(-1)" >
    </van-nav-bar>
    <div class="my-content-fix max1100 music-wrap">
      <img :src="currentSong.img">
      <h2 class="music-title">{{currentSong.name}}</h2>
      <h4 class="music-art">-{{currentSong.art}}-</h4>
      <div class="music-fixed">
        <div class="flex-rlc">
          <span>{{name}}</span><span>{{getTime(currentSong.time)}}</span>
        </div>
        <van-slider v-model="value" active-color="#fff" inactive-color="#9b97f8"
          @drag-start="musicPause" @change="changeOver"/>
        <div class="music-btn">
          <van-icon v-show="isPlay==1" name="pause" @click="musicPause"/>
          <van-icon v-show="isPlay!=1" name="play" @click="musicContinue"/>
        </div>
      </div>
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
  musicPause () {
    this.$store.commit('TOPAUSE')
  }
  musicContinue () {
    this.$store.commit('TOJIXU')
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
  activated () {
    if (!this.currentSong.songid) {
      this.$notify({ type: 'warning', message: '当前没有播放音乐' })
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
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
    box-shadow: 0 0px 24px #383a94;
    animation: Mybling2 15s linear infinite;
    position: relative;
  }
  .music-title{
    color: #eee;
    margin-top: 30px;
  }
  .music-art{
    color: #eee;
    margin: 20px 0;
  }
  .flex-rlc{
    span{
      color: #ddd;
      font-size: 13px;
    }
    margin-bottom: 10px;
  }
}
@keyframes Mybling2{
  from{
      transform: rotate(0);
  }
  to{
      transform: rotate(360deg);
  }
}
.music-btn{
  font-size: 54px;
  color: #b9b7ff;
  margin-top: 40px;
  text-shadow: 0 1px 3px #4c4caf;
}
.music-fixed{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
}
</style>
