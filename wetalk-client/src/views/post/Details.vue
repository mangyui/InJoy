<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="帖子详情" fixed left-arrow right-text="评论"
      @click-left="$router.go(-1)"
      @click-right="$router.push('/postcomment/'+ $route.params.id)" />
    <div class="my-content-box">
      <van-pull-refresh v-if="PostDetails" class="max1100" pulling-text="下拉刷新" v-model="isLoading" @refresh="getPostById"  @click.native="isComment=false">
        <div class="post-box">
          <div class="post-item">
            <div class="post-user" @click="$router.push('/userhomepage/' + PostDetails.user._id)">
              <img :src="PostDetails.user.avatar || './imgs/ico.png'">
              <div class="post-user-text">
                <p>{{PostDetails.user?PostDetails.user.name:'该用户不存在'}}</p>
                <span>{{PostDetails.time.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</span>
              </div>
              <van-button round size="mini" type="info">关注</van-button>
            </div>
            <div class="post-content">
              <p>{{PostDetails.content}}</p>
              <ImgBox v-if="PostDetails.imgList" :imgList="PostDetails.imgList.split(',')"/>
            </div>
            <br />
            <div class="post-san">
              <div><van-icon name="share"/>{{PostDetails.count_forward}}</div>
              <div><van-icon name="comment-o" />{{PostDetails.count_comment}}</div>
              <div><van-icon name="upgrade" />{{PostDetails.count_agree}}</div>
            </div>
          </div>
        </div>
        <div class="post-details-tag">
          <van-image
            fit="cover"
            :src="PostDetails.topic.img||'./imgs/ico.png'"
          />
          <div class="tag-right">
              <p># {{PostDetails.topic.name}}</p>
              <!-- <span>666 只沙雕</span> -->
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="comment-line">评论</div>
        <div class="comment-box post-box">
          <div class="post-item" v-for="(item,index) in 15" :key="index">
            <div class="post-user">
              <img src="http://p2.music.126.net/MHIswsnZuYdel2_roaLlYg==/109951164192558480.jpg?param=300x300">
              <div class="post-user-text">
                <p>沙雕</p>
                <span>9/13 21:46</span>
              </div>
              <div class="comment-right-icon">
                <van-icon name="upgrade" />
                <span>8</span>
              </div>
            </div>
            <div class="post-content">
              <p>突然有一天西游记没经费了，于是师徒四人.....</p>
              <!-- <ImgBox :num="index" /> -->
            </div>
            <div class="my-right">
              <span class="comment-item-btn" @click.stop="isComment=true">评论Ta</span>
            </div>
          </div>
        </div>
      </van-pull-refresh>
      <InputBox v-if="isComment" @toSend="toSend"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'
import InputBox from '@/components/InputBox.vue'

@Component({
  components: {
    ImgBox,
    InputBox
  }
})
export default class PostDetails extends Vue {
  isLoading: boolean = false
  isComment: boolean = false
  PostDetails: any = null
  getPostById () {
    this.$toPost.getPostById({ id: this.$route.params.id }).then((res: any) => {
      this.PostDetails = res.data
      this.isLoading = false
    }).catch((err: any) => {
      console.log(err)
    })
  }
  toSend () {
  }
  activated () {
    if (this.$store.getters.isForward) {
      this.getPostById()
    }
  }
  created () {
    // this.getPostById()
  }
}
</script>

<style lang="less" scoped>
.post-details-tag{
  margin-bottom: 8px;
  display: flex;
  background: #fff;
  padding: 10px 15px;
  align-items: center;
  .van-image{
    width: 60px;
    height: 60px;
    /deep/ img {
      border-radius: 5px;
    }
  }
  .tag-right{
    padding-left: 10px;
    flex-grow: 1;
    p{
      font-size: 15px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    span{
      font-size: 12px;
      color: #666;
    }
  }
}
.comment-item-btn{
  display: inline-block;
  font-size: 13px;
  color: #7232dd;
  margin-top: 10px;
}
</style>
