<template>
  <div class="max1100">
    <div class="list-box">
      <van-swipe-cell v-for="(item, index) in chatList" :key="index" :title="deleteIndex">
        <div class="list-item"  v-if="index.split('To')[0] === user._id&&item.mesgList[item.mesgList.length-1]" @click="$router.push('/UserChat/' + index.split('To')[1])">
          <img :src="item.user.avatar||'./imgs/avatar.png'">
          <div class="mess-right-l">
            <b>{{item.user.name}}</b>
            <p>{{item.mesgList[item.mesgList.length-1].content}}</p>
          </div>
          <span>{{item.mesgList[item.mesgList.length-1].time}}</span>
        </div>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="toDeleteChat(index)"/>
        </template>
      </van-swipe-cell>
      <div class="white-wrap my-tip-box">
        你这么高冷，怎么找对象？
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Getter } from 'vuex-class'

@Component({
  computed: {
    ...mapGetters(['chatList'])
  }
})
export default class PrivateChat extends Vue {
  @Getter user!: any
  deleteIndex: any = 0
  toDeleteChat (index: any) {
    this.$store.commit('RM_USER', index)
    this.deleteIndex = index
  }
  created () {
  }
}
</script>

<style lang="less" scoped>
.list-box{
  padding: 0 0px 45px;
  .list-item{
    display: flex;
    padding: 10px 15px 0;
    &:active{
      background-color: #ebe9ff;
    }
    >img{
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    .mess-right-l{
      flex-grow: 1;
      padding: 8px 0px 13px 15px;
      border-bottom: 1px solid #f9f9f9;
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        color: #888;
      }
      b{
        display: block;
        font-size: 15px;
        color: #111;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    span{
      font-size: 11px;
      color: #888;
    }
  }
}
</style>
