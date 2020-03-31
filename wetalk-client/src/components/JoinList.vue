<template>
  <div class="gray-wrap">
    <van-pull-refresh class="max1100 refrsh-box" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getJoinList">
      <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="joinList[0]?'没有更多啦~':''"
          @load="getMore"
        >
        <template v-for="(item, index) in joinList">
          <transition name="van-slide-up" :key="index">
            <JoinBox v-show="!item.place || sameCity(item.place)" :currjoin="item" />
          </transition>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import JoinBox from '@/components/JoinBox.vue'
import { Getter } from 'vuex-class'

@Component({
  components: {
    JoinBox
  }
})
export default class JoinList extends Vue {
  @Getter myAddress!: any
  @Prop() text!: string
  @Prop() type!: number
  @Prop() order!: string
  @Prop() isCity!: string
  isRefresh: boolean = false
  loading: boolean = false
  finished: boolean = false
  getData: any = {
    page: 1,
    number: 20
  }
  joinList: Array<any> = []
  sameCity (place: string) {
    return !this.isCity || this.$win.eval('/' + this.myAddress.place + '$/').test(place.split('市')[0] + '市')
  }
  getJoinList () {
    this.getData.page = 1
    if (this.text && this.text.trim() !== '') {
      this.getData.name = this.text.trim()
    }
    if (this.type !== null && this.type !== -1) {
      this.getData.type = this.type
    } else {
      delete this.getData.type
    }
    if (this.order && this.order.trim() !== '') {
      this.getData.order = this.order
    }
    this.$toPost.getJoinList(this.getData).then((res: any) => {
      res.data.pop()
      // this.joinList = []
      this.joinList = res.data
      if (res.data.length < this.getData.number) {
        this.finished = true
      } else {
        this.finished = false
      }
      this.isRefresh = false
    }).catch((err: any) => {
      console.log(err)
      this.isRefresh = false
    })
  }
  getMore () {
    if (!this.joinList[0]) {
      this.loading = false
      return
    }
    this.getData.page += 1
    this.$toPost.getUserList(this.getData).then((res: any) => {
      res.data.pop()
      this.joinList = this.joinList.concat(res.data)
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
</script>
