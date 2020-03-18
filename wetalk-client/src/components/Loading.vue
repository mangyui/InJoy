<template>
  <div v-show="showMask" class="white-mask">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop() showMask!: Boolean
}
</script>
