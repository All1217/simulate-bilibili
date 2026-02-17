<template>
  <div class="system-container">
    <div class="no-data flex-row-ac jcc" v-show="!listReactive.noticeList || listReactive.noticeList.length == 0">
      <NoData :message1="'暂无系统通知'"></NoData>
    </div>
    <div
      class="card system-item"
      v-for="e in listReactive.noticeList"
      :key="e.id"
    >
      <div class="top">
        <span class="title">{{e.title}}</span>
        <span class="time">{{e.time}}</span>
      </div>
      <div class="bottom">
        <span
          class="text"
          v-show="!e.isHtml"
        >{{ e.text }}</span>
        <span
          class="text"
          v-show="e.isHtml"
          v-html="e.sText"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NoData from "@/components/NoData.vue";

const listReactive = reactive({
  noticeList: [
    {
      id: 1,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
      isHtml: false,
      sText: "",
    },
    {
      id: 2,
      isHtml: true,
      sText:
        "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>><br><a class='im-dynamic-link'><i class='iconfont icon-lianjie'></i>网页链接</a>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
    {
      id: 3,
      isHtml: false,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
    {
      id: 4,
      isHtml: false,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
    {
      id: 5,
      isHtml: false,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
    {
      id: 6,
      isHtml: false,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
    {
      id: 7,
      isHtml: false,
      text: "珍贵的回忆已经为你打包完毕！今年你登录B站多少天？谁成为了你的最爱？戳链接回顾2024，查收UP主送来的惊喜彩蛋>>",
      time: "2024年12月20日 20:00",
      title: "你的B站2024年度报告来啦！",
    },
  ],
});
</script>

<style lang="less" scoped>
.system-container {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  padding-right: 8px;
  .no-data {
    background-color: #fff;
    height: 100%;
  }
}
.system-item {
  line-height: 24px;
  position: relative;
}
.card {
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  margin-bottom: 10px;
  border-radius: 4px;
}
.top {
  .title {
    color: #333;
    font-weight: 700;
  }
  .time {
    color: #999;
    font-size: 12px;
    line-height: 22px;
    margin: 0 10px;
  }
}
.bottom {
  padding-left: 8px;
  .text {
    word-break: break-word;
    line-height: 19px;
    color: #666;
  }
}
.im-dynamic-link {
  color: #1389bf;
  padding: 0 5px;
  text-decoration: none;
  i {
    display: inline-block;
    vertical-align: bottom;
    font-size: 14px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
  }
}
</style>