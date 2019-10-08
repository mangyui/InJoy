<template>
  <div class="bgMax">
    <van-nav-bar class="litheme" :border="false" title="评论帖子" fixed left-arrow
      @click-left="$router.go(-1)"
       />
    <div class="my-content-fix">
      <van-pull-refresh class="max1100"  :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isLoading" @refresh="getPostById">
        <div class="post-box">
          <div class="post-item">
            <div v-if="PostDetails.user" class="post-user">
              <img :src="PostDetails.user.avatar || './imgs/avatar.png'" @click.stop="$router.push('/userhomepage/' + PostDetails.user._id)">
              <div class="post-user-text">
                <b @click.stop="$router.push('/userhomepage/' + PostDetails.user._id)">{{PostDetails.user?PostDetails.user.name:'该用户不存在'}}</b>
                <p>{{$formatTime(PostDetails.time)}}</p>
              </div>
              <van-button round size="mini" type="info">关注</van-button>
            </div>
            <div class="post-content">
              <p>{{PostDetails.content}}</p>
              <ImgBox v-if="PostDetails.imgList" :imgList="PostDetails.imgList.split(',')"/>
            </div>
          </div>
        </div>
      <div class="comment-line">评论TA</div>
      <div class="white-wrap">
        <van-field
          v-model="text"
          type="textarea"
          placeholder="请输入评论内容"
          rows="3"
          autosize
        />
        <div class="pad15" >
          <van-uploader
            v-model="fileList"
            multiple
            :max-count="9"
          />
        </div>
        <br/>
        <van-button class="max-btn" type="info" @click="toPublish">发表评论</van-button>
        <br />
      </div>
      </van-pull-refresh>
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
  imgList: Array<string> = []
  isLoading: boolean = false
  PostDetails: any ={}
  getPostById () {
    this.$toPost.getPostById({ id: this.$route.params.id }).then((res: any) => {
      if (res.data._id) {
        this.PostDetails = res.data
      } else {
        this.$notify({ type: 'warning', message: '帖子不存在' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }
      this.isLoading = false
    }).catch((err: any) => {
      console.log(err)
      this.isLoading = false
    })
  }
  toPublish () {
    if (!this.$store.getters.user || !this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (this.text.trim() === '') {
      this.$toast('你输入点内容会死吗？')
      return
    }
    this.$dialog.confirm({
      title: '确认评论该帖子？',
      closeOnPopstate: true
    }).then(() => {
      if (this.fileList.length > 0) {
        this.uploadImgs()
      } else {
        this.submitPost()
      }
    }).catch(() => {
      // on cancel
    })
  }
  submitPost () {
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '评论中...'
    })
    let commentData: any = {
      content: this.text,
      user: this.$store.getters.user._id,
      post: this.$route.params.id
    }
    if (this.imgList[0]) {
      commentData.imgList = this.imgList.join(',')
    }
    this.$toPost.addfComment(commentData).then((res: any) => {
      this.text = ''
      this.fileList = []
      this.imgList = []
      this.$toast.clear()
      this.$toast('评论成功！')
      this.$router.go(-1)
    }).catch((err: any) => {
      console.log(err)
      this.$toast.clear()
    })
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
      this.imgList = res.data
      this.submitPost()
    }).catch((err: any) => {
      console.log(err)
      this.$toast.fail('图片上传失败')
    })
  }
  created () {
    this.getPostById()
  }
}
</script>
