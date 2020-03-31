import request from './request'
import Vue from 'vue'
import qs from 'qs'
// import md5 from 'js-md5'

const baseUrl = 'http://localhost:9612' // api的base_url

// eslint-disable-next-line
function addSign (data) {
  data.valid = 'mangyu'
  return data
}

const toUpload = {
  // 上传一张图片
  uploadImg (datas) {
    return request({
      url: baseUrl + '/upload/img',
      method: 'post',
      data: datas
    })
  },
  // 上传多张图片
  uploadImgList (datas) {
    return request({
      url: baseUrl + '/upload/img9',
      method: 'post',
      data: datas
    })
  },
  // 上传一个视频
  uploadVideo (datas) {
    return request({
      url: baseUrl + '/upload/video',
      method: 'post',
      data: datas
    })
  }
}

Vue.prototype.$toUpload = toUpload
