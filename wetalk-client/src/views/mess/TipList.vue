<template>
  <div class="max1100">
    <div class="list-box">
      <template v-for="(item, index) in dataList" >
        <div class="list-item" :key="index" @click="gotoRouter(item)">
          <img :src="item[typeObj[type]['userType']].avatar||'./imgs/avatar.png'">
          <div class="mess-right-l van-hairline--bottom">
            <b>{{item[typeObj[type]['userType']].name}}</b>
            <p class="van-ellipsis">{{(type=='评论'||type=='留言')?item.content:typeObj[type]['msg']}}</p>
            <div v-if="type!='关注'" class="flex-rlc comment-post-box">
              <p class="van-multi-ellipsis--l2">{{(type=='评论'||type=='点赞')?'动态':'活动'}}：{{item[typeObj[type]['idType']][typeObj[type]['text']]}}</p>
            </div>
          </div>
          <span>{{$formatTime(item.time)}}</span>
        </div>
      </template>
      <div class="white-wrap my-tip-box" v-show="!dataList[0]">
        暂无{{type}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class TipList extends Vue {
  @Prop() dataList!: Array<any>
  @Prop() type!: string
  typeObj: any = {
    '点赞': {
      msg: '赞了你的动态',
      router: '/postdetails/',
      idType: 'postId',
      userType: 'userId',
      text: 'content'
    },
    '评论': {
      msg: '评论了你的动态',
      router: '/postdetails/',
      idType: 'post',
      userType: 'user',
      text: 'content'
    },
    '申请': {
      msg: '申请了你的活动，快点让我通过吧',
      router: '/applyList/',
      idType: 'join',
      userType: 'user',
      text: 'title'
    },
    '留言': {
      msg: '给你的活动留言啦',
      router: '/joinDetails/',
      idType: 'join',
      userType: 'user',
      text: 'title'
    },
    '关注': {
      msg: '关注了你',
      router: '/followers/',
      idType: 'to_user',
      userType: 'from_user'
    }
  }
  gotoRouter (item: any) {
    this.$router.push(this.typeObj[this.type]['router'] + item[this.typeObj[this.type]['idType']]._id)
  }
  created () {

  }
}
</script>

<style lang="less" scoped>
.comment-post-box{
  margin-top: 5px;
  padding: 12px 15px;
  background: #f1f2fb;
  border-radius: 5px;
  color: #666;
}
</style>
