<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" fixed title="编辑资料" left-arrow  right-text="保存"
      @click-left="$router.go(-1)"
      @click-right="saveUser"></van-nav-bar>
    <div class="my-edit max1100 my-content-box">
      <div class="my-avatar-box">
        <van-uploader
          :after-read="getAvatar"
          :max-count="1"
        >
        <van-image
          fit="contain"
          :src="avatarFile.contentImg||user.avatar||'./imgs/ico.png'"
        />
        </van-uploader>
        <p>手机号：{{user.phone}}</p>
      </div>
      <van-cell-group>
        <van-field
          v-model="user.name"
          label="昵称"
          placeholder="请填写昵称"
        />
        <van-field
          :value="user.sex==1?'男':'女'"
          label="性别"
          placeholder="请填写性别"
          disabled
          @click="showSex = true"
        />
        <van-field
          :value="user.age"
          label="年龄"
          placeholder="请填写年龄"
          disabled
          @click="showDate = true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="定位" is-link  @click="getCity"/>
        <van-field
          v-model="user.province"
          label="省份"
          placeholder="请填写省份"
          disabled
           @click="showArea=true"
        />
        <van-field
          v-model="user.city"
          label="城市"
          placeholder="请填写城市"
          disabled
           @click="showArea=true"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="user.profile"
          label="签名"
          type="textarea"
          placeholder="介绍下自己吧"
          autosize
        />
      </van-cell-group>
    </div>
    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="['女', '男']"
        title="性别"
        @cancel="showSex = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currDate"
        :min-date="minDate"
        :max-date="maxDate"
        type="year-month"
        :formatter="formatter"
        @cancel="showDate = false"
        @confirm="dateConfirm"
      />
    </van-popup>
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" :columns-num="2" title="城市"
      :value="user.cityCode"
      @cancel="showArea=false"
      @confirm="areaConfirm"/>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import User from '@/model/user'
import { areaList } from '@/util/Area.ts'
const tools = require('@/util/tools.js')

@Component
export default class UserEdit extends Vue {
  private user: User = this.$store.getters.user
  areaList: JSON = areaList
  showSex: boolean = false
  showDate: boolean = false
  showArea: boolean = false
  currDate: any = new Date()
  maxDate: any = new Date()
  minDate: any = new Date(1900, 10, 1)
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
  saveUser () {
    if (this.user.name.trim() === '') {
      this.$toast('昵称不能为空')
      return
    }
    if (this.avatarFile.contentImg !== '') {
      this.user.avatar = this.avatarFile.contentImg
    }
    this.$toPost.updateUser(this.user).then((res: any) => {
      this.$store.commit('initUserInfo', this.user)
      this.$toast('保存成功')
    }).catch((err: any) => {
      console.log(err)
    })
  }
  formatter (type: any, value: any) {
    if (type === 'year') {
      return `${value}年`
    } else if (type === 'month') {
      return `${value}月`
    }
    return value
  }
  onConfirm (value: string, index: number) {
    this.user.sex = index
    this.showSex = false
  }
  dateConfirm (value: any) {
    this.user.age = Math.floor(Math.abs(this.maxDate - this.currDate) / 1000 / 60 / 60 / 24 / 365)
    this.showDate = false
  }
  areaConfirm (value: Array<any>) {
    this.user.province = value[0].name
    this.user.city = value[1].name
    this.user.cityCode = value[1].code
    this.showArea = false
  }
  getCity () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    })
    const geolocation = new this.$win.BMap.Geolocation()
    var _this = this
    geolocation.getCurrentPosition(function getinfo (position: any) {
      let city = position.address.city
      let province = position.address.province // 获取省份信息
      // console.log(position)
      _this.$toast.clear()
      _this.$toast('定位完成')
      _this.user.province = province
      _this.user.city = city
    }, (e: any) => {
      _this.$toast('定位失败')
    }, { provider: 'baidu' })
  }
}
</script>

<style lang="less" scoped>
.my-avatar-box{
  padding: 25px 15px;
  background: #fff;
  text-align: center;
  /deep/ img{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: #f3f3f3;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2)
  }
  p{
    margin-top: 15px;
    color: #777;
  }
}
</style>
