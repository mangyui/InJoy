<template>
  <div class="bgWhite">
    <van-nav-bar class="litheme" :border="false" title="发帖子" fixed left-arrow right-text="发表"
      @click-left="$router.go(-1)"
      @click-right="toPublish"
       />
    <div class="my-content-fix">
      <div class="max1100">
        <van-field
          v-model="text"
          type="textarea"
          placeholder="请输入内容"
          rows="6"
          autosize
        />
        <div class="pad15">
          <van-uploader
            :preview-size="100"
            v-model="fileList"
            multiple
            :after-read="afterRead"
            :max-count="9"
          />
        </div>
        <div class="pad15">
          <van-cell-group>
            <van-cell icon="smile-comment" :title="topic?topic.name:' '" is-link :value="topic?'':'请选择合适的话题'" to="/topic"/>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
@Component({
})
export default class PostAdd extends Vue {
  @Getter topic!: any
  text: string =''
  fileList: Array<any> = []
  imgList: Array<string> = []
  toPublish () {
    if (!this.$store.getters.user || !this.$store.getters.user._id) {
      this.$router.push('/login')
      return
    }
    if (this.text.trim() === '') {
      this.$toast('内容不能为空！')
      return
    }
    this.$dialog.confirm({
      title: '确认发表该帖子？',
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
      message: '帖子发表中...'
    })
    let postData: any = {
      content: this.text,
      user: this.$store.getters.user._id
    }
    if (this.topic && this.topic._id) {
      postData.topic = this.topic._id
    }
    if (this.imgList[0]) {
      postData.imgList = this.imgList.join(',')
    }
    this.$toPost.addPost(postData).then((res: any) => {
      this.text = ''
      this.fileList = []
      this.imgList = []
      this.$toast.clear()
      this.$toast('发表成功！')
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
  afterRead (file: any) {
  }
  created () {
  }
}
</script>
