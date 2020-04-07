<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed :title="this.optionType + '活动'" left-arrow
      @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <van-cell-group>
        <van-field
          v-model="addJoin.title"
          label="标题"
          placeholder="请填写活动主题"
        />
        <van-field
          :value="addJoin.type==1?'线下约':'线上约'"
          label="类别"
          placeholder="请选择活动类型"
          readonly
          is-link
          @click="showType = true"
        />
        <van-field
          :value="addJoin.time"
          label="时间"
          placeholder="请选择活动时间"
          readonly
          is-link
          @click="showDate = true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="总需人数">
          <van-stepper slot="default" @change="totalChange" v-model="addJoin.total" max="999" min="1" integer  input-width="40px" button-size="32px" />
        </van-cell>
        <van-cell title="已有人数">
          <van-stepper slot="default" v-model="addJoin.count" :max="addJoin.total" integer min="0" input-width="40px" button-size="32px" />
        </van-cell>
      </van-cell-group>
      <van-cell-group v-show="addJoin.type==1">
        <van-field
          :value="joinAddress.place || ''"
          label="地点定位"
          @click="$router.push('/mapChoose')"
          right-icon="map-marked"
        />
        <!-- <van-field
          v-model="addJoin.place"
          label="地点备注"
          placeholder="请填写地点其他说明"
        /> -->
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="addJoin.details"
          label="要求详情"
          type="textarea"
          placeholder="介绍活动详细内容，及要求"
          autosize
        />
      </van-cell-group>
      <van-panel title="宣传视频(可选)">
        <div class="update-video-box">
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
      </van-panel>
      <van-panel title="活动图片(可选)">
        <van-uploader
          :preview-size="95"
          v-model="fileList"
          multiple
          :max-count="9"
        />
      </van-panel>
      <van-button class="max-btn btn-theme" hairline type="danger" @click="saveJoin">{{'立即'+ this.optionType}}</van-button>
      <br />
    </div>
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="['线上约', '线下约']"
        title="活动类型"
        @cancel="showType = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currDate"
        :min-date="minDate"
        :max-date="maxDate"
        type="datetime"
        :formatter="formatter"
        @cancel="showDate = false"
        @confirm="dateConfirm"
      />
    </van-popup>
    <Loading :showMask="showMask"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

const tools = require('@/util/tools.js')

@Component
export default class JoinAdd extends Vue {
  @Getter joinAddress!: any
  showMask: boolean = false
  showType: boolean = false
  showDate: boolean = false
  currDate: any = new Date(Date.now() + 600000)
  maxDate: any = new Date(2120, 10, 1)
  minDate: any = new Date(Date.now() + 600000)
  fileList: Array<any> = []
  videoList: Array<any> = []
  videoUrl: string = ''
  optionType: string = '发布'
  addJoin: any = {
    title: '',
    type: 1,
    details: '',
    total: 1,
    count: 0,
    time: '',
    place: '',
    pointX: '',
    pointY: '',
    video: '',
    imgList: null,
    user: this.$store.getters.user._id
  }
  saveJoin () {
    if (this.addJoin.title.trim() === '') {
      this.$toast('标题不能为空')
      return
    }
    if (this.addJoin.type === 1 && (!this.joinAddress.place || this.joinAddress.place === '')) {
      this.$toast('线下活动请定位活动地址')
      return
    }
    this.$dialog.confirm({
      title: '确认' + this.optionType + '该活动？',
      closeOnPopstate: true
    }).then(() => {
      if (this.fileList.length > 0) {
        this.uploadImgs()
      } else {
        this.publishJoin()
      }
    }).catch(() => {
    })
  }
  publishJoin () {
    if (this.addJoin.type === 1) {
      this.addJoin.place = this.joinAddress.place
      this.addJoin.pointX = this.joinAddress.point.lng
      this.addJoin.pointY = this.joinAddress.point.lat
    }
    if (this.videoUrl.trim() !== '') {
      this.addJoin.video = this.videoUrl
    }
    this.$toPost.addJoin(this.addJoin).then((res: any) => {
      this.$toast.success(this.optionType + '成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    }).catch((err: any) => {
      this.$toast.fail(this.optionType + '失败，请稍后重试')
      console.log(err)
    })
  }
  formatter (type: any, value: any) {
    if (type === 'year') {
      return `${value}年`
    } else if (type === 'month') {
      return `${value}月`
    } else if (type === 'day') {
      return `${value}日`
    } else if (type === 'hour') {
      return `${value}时`
    } else if (type === 'minute') {
      return `${value}分`
    }
    return value
  }
  onConfirm (value: string, index: number) {
    this.addJoin.type = index
    this.showType = false
  }
  dateConfirm (value: any) {
    // 格式化通用时间
    this.addJoin.time = this.$commomTime(this.currDate)
    this.showDate = false
  }
  totalChange () {
    if (this.addJoin.total < this.addJoin.count) {
      this.addJoin.count = this.addJoin.total
    }
  }
  uploadImgs () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '图片上传中...'
    })
    var data = new FormData()
    for (let i = 0; i < this.fileList.length; i++) {
      data.append('myimg', this.fileList[i].file)
    }
    this.$toUpload.uploadImgList(data).then((res: any) => {
      this.addJoin.imgList = res.data
      this.publishJoin()
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('图片上传失败')
    })
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
}
</script>

<style lang="less" scoped>
.update-video-box{
  padding: 0;
  .van-uploader{
    padding: 0;
  }
  video{
    width: 95%;
    height: 100%;
  }
}
</style>
