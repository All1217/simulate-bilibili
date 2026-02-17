<template>
  <div class="small-item" :style="'width: ' + width + ';' + 'height: ' + height + ';'">
    <router-link :to="{ name: 'Video', params: {vid: videoVo.vid} }" class="cover" :style="'height: ' + imgHeight + ';'">
      <img :src="videoVo.coverUrl" alt="">
      <span class="length">{{ length }}</span>
    </router-link>
    <router-link :to="{ name: 'Video', params: {vid: videoVo.vid} }" class="title">{{ videoVo.title }}</router-link>
    <div class="meta">
      <span class="play">
        <i class="iconfont icon-bofangshu"></i>
        <span>{{ formatCount(videoVo.play) }}</span>
      </span>
      <span class="time">{{ formatStringDate(videoVo.uploadDate, datetype) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { DateStringType } from "@/api/enums";
import { formatStringDate, formatCount } from '@/util/index'
import { VideoVo } from "@/api/Models";
import { defaultVideoVo } from "@/api/Video";
const props = defineProps({
  width: String,
  height: String,
  length: String,
  imgHeight: String,
  datetype: {
    type: Object as PropType<DateStringType>,
    default: DateStringType.ALL
  },
  videoVo: {
    type: Object as PropType<VideoVo>,
      default: defaultVideoVo
  }
});
</script>

<style scoped lang="less">
.small-item {
  display: flex;
  flex-direction: column;

  .cover {
    position: relative;
    background-color: var(--bgc1);
    border-radius: 4px;
    display: block;
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .length {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px 0 0 0;
      color: #fff;
      line-height: 20px;
      transition: top 0.2s ease;
      padding: 0 6px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .title {
    display: block;
    line-height: 20px;
    color: var(--font-color-black);
    height: 38px;
    margin-top: 6px;
    overflow: hidden;
  }

  .title:hover {
    color: var(--hover-blue);
  }

  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--font-color-gray1);
    white-space: nowrap;
    font-size: 0;
    margin-top: 5px;
    height: 16px;
    line-height: 16px;

    .play {
      width: 92px;

      i {
        margin-right: 5px;
        font-size: 15px;
      }
    }

    span {
      white-space: nowrap;
      height: 16px;
      line-height: 18px;
      font-size: 12px;
      overflow: hidden;
    }
  }
}
</style>