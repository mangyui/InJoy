<template>
  <van-panel :title="currjoin.title"
    class="join-box"
    :desc="['线上活动', '线下活动'][currjoin.type]"
    :status="currjoin.count+'/'+currjoin.total"
    @click="$router.push('/joinDetails/' + currjoin._id)">
    <div class="join-text">{{currjoin.details}}</div>
    <br/>
    <video class="join-video" v-if="currjoin.video" :src="currjoin.video" controls="controls" onenterpictureinpicture="true"
                @loadeddata="$setVideoPoster" preload controlslist="nodownload" crossorigin="Anonymous"></video>
    <van-grid v-show="!currjoin.video && currjoin.imgList[0]" :border="false" :column-num="3" square>
      <van-grid-item>
        <van-image fit="cover" lazy-load v-show="currjoin.imgList[0]" :src="currjoin.imgList[0]" >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-grid-item>
      <van-grid-item>
        <van-image fit="cover" lazy-load v-show="currjoin.imgList[1]" :src="currjoin.imgList[1]" >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-grid-item>
      <van-grid-item>
        <van-image fit="cover" lazy-load v-show="currjoin.imgList[2]" :src="currjoin.imgList[2]" >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-grid-item>
    </van-grid>
    <p v-if="currjoin.place" class="van-ellipsis post-address"><van-icon name="location" />{{currjoin.place}}</p>
    <div class="people-box mg-t-15">
      <img :src="currjoin.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">
      <div class="people-text mg-l-5">
        <span @click.stop="$router.push('/userhomepage/' + currjoin.user._id)">{{currjoin.user.name||'匿名'}}</span>
      </div>
      <p class="join-right-time"><span>{{$commomTime(currjoin.time).substring(5, 16)}}</span><van-icon name="clock" /></p>
    </div>
  </van-panel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class JoinBox extends Vue {
  @Prop() currjoin!: any
}
</script>

<style lang="less" scoped>
.join-video{
  max-width: 100%;
  max-height: 320px;
  border-radius: 0 15px 0 0;
}
video::-webkit-media-controls-volume-slider, video::-webkit-media-controls-mute-button{ //隐藏android端video标签自带的音量调节按钮
  display: none;
}
</style>
