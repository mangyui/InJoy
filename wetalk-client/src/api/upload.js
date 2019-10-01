import request from './request'
import Vue from 'vue'
import qs from 'qs'
// import md5 from 'js-md5'

const baseUrl = 'http://47.106.130.141:9612' // api的base_url

// eslint-disable-next-line
function addSign (data) {
  data.valid = 'mangyu'
  return data
}

const toUpload = {
  // 获取垃圾（通用）
  uploadImg (datas) {
    return request({
      url: baseUrl + '/upload/img',
      method: 'post',
      data: datas
    })
  },
  uploadImgList (datas) {
    return request({
      url: baseUrl + '/upload/img9',
      method: 'post',
      data: datas
    })
  }
}

Vue.prototype.$toUpload = toUpload
