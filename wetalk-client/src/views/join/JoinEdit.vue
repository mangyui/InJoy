<template>
  <div class="bgF7">
    <van-nav-bar class="litheme" :border="false" fixed title="编辑活动" left-arrow
      @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="my-content-fix max1100">
      <van-cell-group>
        <van-field
          v-model="editJoin.title"
          label="标题"
          placeholder="请填写活动主题"
        />
        <van-field
          :value="editJoin.type==1?'线下约':'线上约'"
          label="类别"
          placeholder="请选择活动类型"
          readonly
          is-link
          @click="showType = true"
        />
        <van-field
          :value="editJoin.time"
          label="时间"
          placeholder="请选择活动时间"
          readonly
          is-link
          @click="showDate = true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="总需人数">
          <van-stepper slot="default" @change="totalChange" v-model="editJoin.total" max="999" min="1" integer  input-width="40px" button-size="32px" />
        </van-cell>
        <van-cell title="已有人数">
          <van-stepper slot="default" disabled  v-model="editJoin.count" :max="editJoin.total" integer min="0" input-width="40px" button-size="32px" />
        </van-cell>
      </van-cell-group>
      <van-cell-group v-show="editJoin.type==1">
        <van-field
          :value="joinAddress.place || ''"
          label="地点定位"
          @click="$router.push('/mapChoose')"
          right-icon="map-marked"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="editJoin.details"
          label="要求详情"
          type="textarea"
          placeholder="介绍活动详细内容，及要求"
          autosize
        />
      </van-cell-group>
      <van-panel title="活动图片(可选)">
        <van-uploader
          :preview-size="95"
          v-model="fileList"
          multiple
          :max-count="9"
        />
      </van-panel>
      <van-button class="max-btn btn-theme" hairline type="danger" @click="saveJoin">保存修改</van-button>
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
export default class JoinEdit extends Vue {
  @Getter joinAddress!: any
  showMask: boolean = true
  showType: boolean = false
  showDate: boolean = false
  currDate: any = new Date(Date.now() + 600000)
  maxDate: any = new Date(2120, 10, 1)
  minDate: any = new Date(Date.now() + 600000)
  fileList: Array<any> = []
  editJoin: any = {
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
  getJoinById () {
    this.showMask = true
    let data: any = {
      id: this.$route.params.id
    }
    this.$toPost.getJoinById(data).then((res: any) => {
      if (res.data && res.data._id) {
        this.editJoin = res.data
        this.editData()
        this.showMask = false
      } else {
        this.$notify({ type: 'warning', message: '活动不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  editData () {
    // 还原时间
    this.dateConfirm(this.editJoin.time)
    // 还原位置
    if (this.editJoin.type === 1) {
      let address = {
        point: new this.$win.BMap.Point(this.editJoin.pointX, this.editJoin.pointY),
        place: this.editJoin.place
      }
      this.$store.commit('SET_JOIN_ADDRESS', address)
    }
    // 还原图片
    this.fileList = []
    this.editJoin.imgList.forEach((item: any) => {
      if (item.trim() !== '') {
        this.fileList.push({ url: item, isImage: true })
      }
    })
  }
  saveJoin () {
    if (this.editJoin.title.trim() === '') {
      this.$toast('标题不能为空')
      return
    }
    if (this.editJoin.type === 1 && (!this.joinAddress.place || this.joinAddress.place === '')) {
      this.$toast('线下活动请定位活动地址')
      return
    }
    this.$dialog.confirm({
      title: '确认保存该活动信息？',
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
    if (this.editJoin.type === 1) {
      this.editJoin.place = this.joinAddress.place
      this.editJoin.pointX = this.joinAddress.point.lng
      this.editJoin.pointY = this.joinAddress.point.lat
    }
    this.editJoin.id = this.editJoin._id
    delete this.editJoin._id
    this.$toPost.editJoin(this.editJoin).then((res: any) => {
      this.$toast.success('保存成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    }).catch((err: any) => {
      this.$toast.fail('保存失败，请稍后重试')
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
    this.editJoin.type = index
    this.showType = false
  }
  dateConfirm (value: any) {
    // 格式化通用时间
    this.editJoin.time = this.$commomTime(value)
    this.showDate = false
  }
  totalChange () {
    if (this.editJoin.total < this.editJoin.count) {
      this.editJoin.count = this.editJoin.total
    }
  }
  uploadImgs () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '图片上传中...'
    })
    var data = new FormData()
    // 保留原本图片路径，上传新图片
    this.editJoin.imgList = []
    for (let i = 0; i < this.fileList.length; i++) {
      data.append('myimg', this.fileList[i].file)
      if (!this.fileList[i].file && this.fileList[i].url) {
        this.editJoin.imgList.push(this.fileList[i].url)
      }
    }
    this.$toUpload.uploadImgList(data).then((res: any) => {
      this.editJoin.imgList = this.editJoin.imgList.concat(res.data)
      this.publishJoin()
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('图片上传失败')
    })
  }
  activated () {
    // @ts-ignore
    if (this.$store.getters.isForward) {
      this.showMask = true
      this.getJoinById()
    } else {
      this.showMask = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
