<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" title="评论帖子" fixed left-arrow
      @click-left="$router.go(-1)"
       />
    <div class="my-content-box">
      <van-pull-refresh class="max1100" pulling-text="下拉刷新" v-model="isLoading" @refresh="getPostById">
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
          </div>
        </div>
      </van-pull-refresh>
      <div class="comment-line">评论TA</div>
      <van-field
        v-model="text"
        type="textarea"
        placeholder="请输入评论内容"
        rows="3"
        autosize
      />
      <div class="pad15">
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="9"
        />
      </div>
      <van-button class="max-btn" type="info" @click="toPublish">发表评论</van-button>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'

@Component({
  components: {
    ImgBox
  }
})
export default class PostComment extends Vue {
  text: string =''
  fileList: Array<any> = []
  isLoading: boolean = false
  PostDetails: any ={}
  getPostById () {
    this.$toPost.getPostById({ id: this.$route.params.id }).then((res: any) => {
      this.PostDetails = res.data
      this.isLoading = false
    }).catch((err: any) => {
      console.log(err)
    })
  }
  toPublish () {
    if (this.text.trim() === '') {
      this.$toast('你输入点内容会死吗？')
      return
    }
    console.log(this.fileList)
    this.$dialog.confirm({
      title: '确认评论该帖子？'
    }).then(() => {
      this.text = ''
      this.fileList = []
    }).catch(() => {
      // on cancel
    })
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
