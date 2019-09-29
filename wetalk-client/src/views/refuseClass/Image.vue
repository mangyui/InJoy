<template>
  <div class="bgMax max1100">
    <van-nav-bar class="litheme" :border="false" title="垃圾识别" fixed left-arrow  @click-left="$router.go(-1)">
    </van-nav-bar>
    <div v-show="contentImg" class="garbage-box my-content-box">
      <van-image
        class="garbage-img"
        fit="contain"
        :src="contentImg"
      />
      <p class="text-btn"><span @click="scanGarbage">点击识别</span></p>
      <div v-show="refuseList[0]">
        <div>
          <van-cell-group>
            <van-cell v-for="(item, index) in refuseList" :key="index" :title="item.keyword" :is-link="item.classId?false:true">
              <span v-if="item.classId" :style="{background: item.classId.color+'22', color: item.classId.color }" class="class-tag" slot="default">{{item.classId.name}}</span>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <div class="garbage-img-btn">
      <van-button class="btn-theme" type="info" @click="cameraTakePicture">拍照</van-button>
      <van-uploader
        :after-read="readImg"
        capture="camera"
        :max-count="1">
        <van-button type="info">图库</van-button>
      </van-uploader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})
export default class GarbageImg extends Vue {
  contentImg: any = ''
  imgFlie: any = ''
  refuseList: Array<any> = []
  readImg (file: any) {
    this.contentImg = file.content
    this.imgFlie = file.file
  }
  scanGarbage () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '识别中...'
    })
    let _data = {
      'image': this.contentImg.replace(/data:image\/.*;base64,/, '')
    }
    this.$toPost.garbageImg(_data).then((res: any) => {
      this.refuseList = res.result
      this.$toast.clear()
    }).catch((err: any) => {
      console.log(err)
      this.$toast.clear()
    })
  }
  cameraTakePicture () {
    // if (navigator.camera) {
    //   navigator.camera.getPicture(this.onSuccess, this.onFail, {
    //     quality: 50,
    //     destinationType: Camera.DestinationType.DATA_URL,//eslint-disable-line
    //     encodingType: Camera.EncodingType.JPEG,//eslint-disable-line
    //     sourceType: Camera.PictureSourceType.Camera//eslint-disable-line
    //   })
    // } else {
    this.$toast('该设备不支持打开相机！')
    // }
  }
  onSuccess (imageURI: any) {
    this.contentImg = imageURI
  }
  onFail (mess: any) {
    console.log(mess)
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.garbage-box{
  padding-bottom: 60px;
  .garbage-img{
    padding: 10px 0;
    background-color: #fff;
    width: 100%;
    height: 200px;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);
    img{
      border-radius: 5px;
    }
  }
}
.garbage-img-btn{
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  >.van-button{
    width: 50%;
    opacity: 0.8;
  }
  .van-uploader{
    width: 50%;
    /deep/ .van-uploader__input-wrapper,.van-button{
      width: 100%;
      opacity: 0.8;
    }
  }
  .btn-theme{
    margin-right: 10px;
  }
}
.text-btn{
  text-align: center;
  cursor: pointer;
  color: #1989fa;
  padding: 10px;
  span{
    padding: 5px 10px;
    border-radius: 3px;
    &:active{
      background: #c3defa;
    }
  }

}
</style>
