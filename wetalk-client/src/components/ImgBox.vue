<template>
  <div>
    <div v-if="imgList.length==1" class="img1-box">
      <van-image
        fit="scale-down"
        lazy-load
        :src="imgList[0]"
        @click.stop="toShowImg(0)"
        />
    </div>
    <van-grid v-else :border="false" :column-num="3" square gutter="6">
      <van-grid-item v-for="(imgitem,imgindex) in imgList" :key="imgindex"  @click.stop="toShowImg(imgindex)">
        <van-image
          fit="cover"
          lazy-load
          :src="imgitem"
        />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ImgBox extends Vue {
  @Prop() imgList!: Array<any>
  // @Prop() num!: number
  showImg: boolean = false
  created () {
    // for (let i = 0; i < this.num; i++) {
    //   this.imgList.push('https://img.zcool.cn/community/01ad565d4e60c3a8012187f462bf0e.jpg@1280w_1l_2o_100sh.jpg')
    // }
    // if (this.imgList.length > 9) {
    //   this.imgList.splice(9)
    // }
  }
  toShowImg (index: number) {
    this.$ImagePreview({
      images: this.imgList,
      startPosition: index,
      closeOnPopstate: true,
      loop: false,
      lazyLoad: true,
      closeable: true
    })
  }
}
</script>

<style lang="less" scoped>
.img1-box{
  .van-image{
    min-width: 110px;
    min-height: 110px;
  }
  /deep/ img{
    max-width: 100%;
    max-height: 200px;
    width: auto;
    height: auto;
    border-radius: 5px;
    object-position: left;
  }
}
.img9-box{
  display: flex;
  flex-wrap: wrap;
  >div{
    font-size: 0;
    margin-right: 7.5px;
    margin-top: 7.5px;
    &:nth-child(3n){
      margin-right: 0;
    }
  }
  .van-image{
    width: 110px;
    height: 110px;
    /deep/ img{
      border-radius: 5px;
    }
  }
}

.van-grid-item /deep/ .van-grid-item__content{
  overflow: hidden;
  padding: 0;
  .van-image{
    height: 100%;
    img{
      border-radius: 5px;
    }
  }
}
</style>
