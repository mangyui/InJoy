import request from './request'
import Vue from 'vue'
import qs from 'qs'
// import md5 from 'js-md5'
// import store from '../store'

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://47.106.130.141:9612' : 'http://47.106.130.141:9612' // api的base_url
// export const payUrl = process.env.NODE_ENV === 'production' ? 'http://47.106.130.141' : 'http://122.237.106.250:8080'

// eslint-disable-next-line
function addSign (data) {
  data.valid = 'mangyu'
  return data
}

const toPost = {
  // 获取垃圾（通用）
  getRubbish (datas) {
    return request({
      url: baseUrl + '/rubbish/getRubbish',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取垃圾（精确垃圾名）
  getRubbishByName (datas) {
    return request({
      url: baseUrl + '/rubbish/getRubbishByName',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取垃圾（精确垃圾名）
  getClassAndList (datas) {
    return request({
      url: baseUrl + '/garbage/getClassAndList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 垃圾识别
  garbageImg (datas) {
    return request({
      url: 'http://47.106.130.141:9610/retrieval',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取验证码
  getVCode (datas) {
    return request({
      url: baseUrl + '/user/getVCode',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 验证码方式登录
  loginVCode (datas) {
    return request({
      url: baseUrl + '/user/loginVCode',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取用户信息
  getUserById (datas) {
    return request({
      url: baseUrl + '/user/getById',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取用户信息
  updateUser (datas) {
    return request({
      url: baseUrl + '/user/update',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取用户列表
  getUserList (datas) {
    return request({
      url: baseUrl + '/user/getUserList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 发表帖子
  addPost (datas) {
    return request({
      url: baseUrl + '/post/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取图文列表
  getPostList (datas) {
    return request({
      url: baseUrl + '/post/getPostList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取图文详情
  getPostById (datas) {
    return request({
      url: baseUrl + '/post/getById',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 评论帖子
  addfComment (datas) {
    return request({
      url: baseUrl + '/fComment/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 根据postid或userid分页get
  getfComments (datas) {
    return request({
      url: baseUrl + '/fComment/getList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  }
}

Vue.prototype.$toPost = toPost
