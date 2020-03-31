<template>
  <div class="white-wrap">
    <van-pull-refresh class="max1100 refrsh-box" :success-duration="1000" success-text="已刷新" pulling-text="下拉刷新" v-model="isRefresh" @refresh="getUserList">
      <div class="post-box">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="userList[0]?'没有更多啦~':''"
            @load="getMore"
          >
          <div class="list-box">
            <div class="list-item" v-for="(item, index) in userList" :key="index" @click="$router.push('/userhomepage/' + item._id)">
              <img v-lazy="item.avatar||'./imgs/avatar.png'">
              <div class="list-item-left">
                <b>{{item.name}}</b>
                <!-- <p>{{item.author}}</p> -->
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ImgBox from '@/components/ImgBox.vue'

@Component({
  components: {
    ImgBox
  }
})
export default class UserList extends Vue {
  @Prop() text!: string
  isRefresh: boolean = false
  loading: boolean = false
  finished: boolean = false
  getData: any = {
    page: 1,
    number: 20
  }
  userList: Array<any> = []
  getUserList () {
    this.getData.page = 1
    if (this.text && this.text.trim() !== '') {
      this.getData.name = this.text.trim()
    }
    this.$toPost.getUserList(this.getData).then((res: any) => {
      res.data.pop()
      this.userList = res.data
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
    if (!this.userList[0]) {
      this.loading = false
      return
    }
    this.getData.page += 1
    this.$toPost.getUserList(this.getData).then((res: any) => {
      res.data.pop()
      this.userList = this.userList.concat(res.data)
      this.loading = false
      if (res.data.length < this.getData.number) {
        this.finished = true
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
@import '../styles/listitem.less';
.list-box{
  padding: 0 10px;
  .list-item img{
    border-radius: 50%;
  }
}
</style>
