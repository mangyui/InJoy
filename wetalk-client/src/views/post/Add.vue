<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" title="发动态" fixed left-arrow right-text="发表"
      @click-left="$router.go(-1)"
      @click-right="toPublish"
       />
    <div class="my-content-fix">
      <div class="max1100">
        <van-field
          v-model="text"
          type="textarea"
          placeholder="请输入内容"
          rows="6"
          autosize
        />
        <div class="imgorvideo">
          <van-icon name="photo" :color="isVideo?'#bbb':'#8b81f9'" @click="isVideo=false"/>
          <van-icon class="van-hairline--left" name="video" :color="isVideo?'#8b81f9':'#bbb'" @click="isVideo=true"/>
        </div>
        <div class="pad15" v-show="!isVideo">
          <van-uploader
            :preview-size="100"
            v-model="fileList"
            multiple
            :max-count="9"
          />
        </div>
        <div class="update-video-box" v-show="isVideo">
          <video v-if="videoUrl" :src="videoUrl" controls="controls"
            @loadeddata="$setVideoPoster" preload controlslist="nodownload" crossorigin="Anonymous"></video>
          <van-uploader
            accept="video/*"
            v-model="videoList"
            :after-read="afterRead"
            @delete="deleteVideo"
            @oversize="overSize"
            upload-icon="video"
            :max-count="1"
            :max-size="(240 * 1024 * 1024)"
          />
        </div>
        <div class="pad15">
          <van-cell-group>
            <van-field
              :value="joinAddress.place || ''"
              label="位置"
              left-icon="map-marked"
              right-icon="clear"
              placeholder="设置当前位置(可选)"
              @click="$router.push('/mapChoose')"
              @click-right-icon.stop="clearAddress"
            />
            <!-- <van-cell icon="map-marked" :title="joinAddress.place||''" is-link :value="joinAddress.place?'':'设置当前位置'" to="/mapChoose"/>
            <van-cell icon="smile-comment" :title="topic?topic.name:' '" is-link :value="topic?'':'请选择合适的话题'" to="/topic"/> -->
            <van-field
              :value="topic.name||''"
              label="话题"
              left-icon="smile-comment"
              right-icon="clear"
              placeholder="选择合适的话题(可选)"
              @click="$router.push('/topic')"
              @click-right-icon.stop="clearTopic"
            />
          </van-cell-group>
        </div>
        <br/>
        <br/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
@Component({
})
export default class PostAdd extends Vue {
  @Getter joinAddress!: any
  @Getter topic!: any
  text: string =''
  isVideo: boolean = false
  videoUrl: string = ''
  fileList: Array<any> = []
  videoList: Array<any> = []
  imgList: Array<string> = []
  toPublish () {
    if (!this.$store.getters.user || !this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (this.text.trim() === '') {
      this.$toast('内容不能为空！')
      return
    }
    this.$dialog.confirm({
      title: '确认发表该帖子？',
      closeOnPopstate: true
    }).then(() => {
      if (this.fileList.length > 0) {
        this.uploadImgs()
      } else {
        this.submitPost()
      }
    }).catch(() => {
      // on cancel
    })
  }
  submitPost () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '帖子发表中...'
    })
    let postData: any = {
      content: this.text,
      user: this.$store.getters.user._id
    }
    if (this.topic && this.topic._id) {
      postData.topic = this.topic._id
    }
    if (this.joinAddress.place && this.joinAddress.place.trim() !== '') {
      postData.address = this.joinAddress.place.trim()
    }
    if (!this.isVideo && this.imgList[0]) {
      postData.imgList = this.imgList.join(',')
    }
    if (this.isVideo && this.videoUrl !== '') {
      postData.video = this.videoUrl
    }
    this.$toPost.addPost(postData).then((res: any) => {
      this.text = ''
      this.fileList = []
      this.imgList = []
      this.videoUrl = ''
      this.videoList = []
      this.$toast.clear()
      this.$toast('发表成功！')
      this.$router.go(-1)
    }).catch((err: any) => {
      console.log(err)
      this.$toast.clear()
    })
  }
  uploadImgs () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '图片上传中...'
    })
    let data = new FormData()
    for (let i = 0; i < this.fileList.length; i++) {
      data.append('myimg', this.fileList[i].file)
    }
    this.$toUpload.uploadImgList(data).then((res: any) => {
      this.imgList = res.data
      this.submitPost()
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('图片上传失败')
    })
  }
  clearAddress () {
    this.$store.commit('RM_JOIN_ADDRESS')
  }
  clearTopic () {
    this.$store.commit('REMOVE_TOPIC')
  }
  overSize () {
    this.$toast.fail('请上传小于240M的视频')
  }
  afterRead (file: any) {
    file.status = 'uploading'
    file.message = '上传中...'
    let data = new FormData()
    data.append('myvideo', file.file)
    this.$toUpload.uploadVideo(data).then((res: any) => {
      file.status = 'done'
      this.videoUrl = res.data
    }).catch((err: any) => {
      file.status = 'failed'
      file.message = '上传失败'
      console.log(err)
      this.$toast.fail('视频上传失败')
    })
  }
  deleteVideo (file: any) {
    this.videoUrl = ''
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.imgorvideo{
  padding: 5px;
  font-size: 25px;
  color: #aaa;
  text-align: right;
  .van-icon{
    padding: 10px;
  }
}
</style>
