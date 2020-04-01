import request from './request'
import Vue from 'vue'
import qs from 'qs'
import md5 from 'js-md5'
import store from '../store'

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://47.106.130.141:9612' : 'http://47.106.130.141:9612' // api的base_url

// eslint-disable-next-line
function addSign (data) {
  let time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  let valid = md5(md5(JSON.stringify(time)).substr(1, 6) + 'mangyu')
  data.stime = time
  data.svalid = valid.substr(4, 24)
  if (store.getters.user._id) {
    data.suser = store.getters.user._id
    data.stoken = store.getters.token
  }
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
  // 获取用户数字
  getUserNumber (datas) {
    return request({
      url: baseUrl + '/user/getUserNumber',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取操作数据（点赞，评论，关注）
  getOptionData (datas) {
    return request({
      url: baseUrl + '/user/getOptionData',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 更新用户信息
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
  // 发表动态
  addPost (datas) {
    return request({
      url: baseUrl + '/post/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 删除动态
  deletePost (datas) {
    return request({
      url: baseUrl + '/post/rm',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 根据id获取话题
  getTopicById (datas) {
    return request({
      url: baseUrl + '/topic/getById',
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
  // 获取关注好友的图文
  getPostByFollow (datas) {
    return request({
      url: baseUrl + '/post/getPostByFollow',
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
  // 根据postid或userid分页getfComment
  getfComments (datas) {
    return request({
      url: baseUrl + '/fComment/getList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 回复评论
  addSComment (datas) {
    return request({
      url: baseUrl + '/sComment/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // post点赞取消赞
  postAddOrRmAgree (datas) {
    return request({
      url: baseUrl + '/postAgree/addOrRm',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // comment点赞取消赞
  commentAddOrRmAgree (datas) {
    return request({
      url: baseUrl + '/commentAgree/addOrRm',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // follow关注或取消关注
  followAddOrRm (datas) {
    return request({
      url: baseUrl + '/follow/addOrRm',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取粉丝
  getFollowers (datas) {
    return request({
      url: baseUrl + '/follow/getFollowers',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取关注的人
  getFollowing (datas) {
    return request({
      url: baseUrl + '/follow/getFollowing',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 发布活动
  addJoin (datas) {
    return request({
      url: baseUrl + '/join/add',
      method: 'post',
      data: qs.stringify(addSign(datas), { arrayFormat: 'repeat' }) // 数组格式化a=b&a=c (图片数组)
    })
  },
  // 编辑活动
  editJoin (datas) {
    return request({
      url: baseUrl + '/join/update',
      method: 'post',
      data: qs.stringify(addSign(datas), { arrayFormat: 'repeat' }) // 数组格式化a=b&a=c (图片数组)
    })
  },
  // 根据获取活动列表
  getJoinList (datas) {
    return request({
      url: baseUrl + '/join/getJoinList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 根据id获取活动信息
  getJoinById (datas) {
    return request({
      url: baseUrl + '/join/getById',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 根据位置获取活动
  getJoinByLocation (datas) {
    return request({
      url: baseUrl + '/join/getByLocation',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 根据城市获取活动
  getJoinByCity (datas) {
    return request({
      url: baseUrl + '/join/getByCity',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 申请加入活动
  applyJoin (datas) {
    return request({
      url: baseUrl + '/apply/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取用户的所有申请
  getApplyByUser (datas) {
    return request({
      url: baseUrl + '/apply/getByUser',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取活动的所有申请
  getApplyByJoin (datas) {
    return request({
      url: baseUrl + '/apply/getByJoin',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 修改申请状态
  setApplyPass (datas) {
    return request({
      url: baseUrl + '/apply/applyPass',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 撤销申请
  deleteApply (datas) {
    return request({
      url: baseUrl + '/apply/rm',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 添加活动评论
  addJoinComment (datas) {
    return request({
      url: baseUrl + '/joinComment/add',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  },
  // 获取活动评论
  getJoinCommentList (datas) {
    return request({
      url: baseUrl + '/joinComment/getList',
      method: 'post',
      data: qs.stringify(addSign(datas))
    })
  }
  // addOrUpdate (datas) {
  //   return request({
  //     url: baseUrl + '/myApp/addOrUpdate',
  //     method: 'post',
  //     data: qs.stringify(addSign(datas))
  //   })
  // }
}

Vue.prototype.$toPost = toPost
