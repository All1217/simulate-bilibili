<template>
  <div class="container">
    <div class="img">
      <img v-show="imgType == 1"
        src="../assets/images/无数据.png"
        alt=""
        width="256px"
        height="256px"
      >
      <img v-show="imgType == 2"
        src="../assets/images/无数据.png"
        alt=""
        width="256px"
        height="256px"
      >
    </div>
    <span class="sign">{{message1}}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  message1: String,
  imgType: {
    type: Number,
    default: 1,
  }
});
</script>

<style lang="less" scoped>
.container {
    width: 271px;
    height: auto;
    padding: 15px;
  .img {
    width: 256px;
    height: 256px;
    margin: auto;
  }
  .sign {
    display: block;
    height: 20px;
    width: 100%;
    text-align: center;
    color: var(--font-color-gray1);
    font-size: 14px;
    line-height: 20px;
  }
}
</style>