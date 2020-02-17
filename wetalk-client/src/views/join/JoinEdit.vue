<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed title="发布活动" left-arrow
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
          :value="joinAddress.place||''"
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
      <van-panel title="活动图片(可选)">
        <van-uploader
          :preview-size="100"
          v-model="fileList"
          multiple
          :max-count="9"
        />
      </van-panel>
      <van-button class="max-btn btn-theme" hairline type="danger" @click="saveJoin">立即发布</van-button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

const tools = require('@/util/tools.js')

@Component
export default class JoinEdit extends Vue {
  @Getter joinAddress!: any
  private user: any = this.$store.getters.user
  showType: boolean = false
  showDate: boolean = false
  currDate: any = new Date(Date.now() + 600000)
  maxDate: any = new Date(2120, 10, 1)
  minDate: any = new Date(Date.now() + 600000)
  fileList: Array<any> = []
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
    imgList: null,
    user: this.$store.getters.user._id
  }
  avatarFile: any = {
    contentImg: '',
    imgFlie: ''
  }
  getAvatar (file: any) {
    tools.dealImage(file.content, 500, (newBase64: any) => {
      this.avatarFile.contentImg = newBase64
    })
    this.avatarFile.imgFlie = file.file
    var data = new FormData()
    data.append('myimg', file.file)
    this.$toUpload.uploadImg(data).then((res: any) => {
      this.avatarFile.contentImg = res.data
    }).catch((err: any) => {
      console.log(err)
      this.avatarFile.contentImg = ''
      this.$toast.fail('图片上传失败')
    })
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
      title: '确认发表该活动？',
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
    this.$toPost.addJoin(this.addJoin).then((res: any) => {
      this.$toast.success('发布成功')
    }).catch((err: any) => {
      this.$toast.fail('发布失败，请稍后重试')
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
}
</script>

<style lang="less" scoped>

</style>
