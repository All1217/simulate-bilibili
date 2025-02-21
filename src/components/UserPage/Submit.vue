<template>
  <div class="col-full flex-row">
    <div class="contribution-sidenav rpos">
      <div class="contribution-list-container rpos">
        <ul>
          <li
            :class="curActivatedLi == 1 ? 'contribution-item rpos ac-li' : curHoverLi == 1 ? 'contribution-item rpos hover-li' : 'contribution-item rpos normal-li'"
            @mouseenter="curHoverLi = curActivatedLi == 1 ? -1 : 1"
            @mouseleave="curHoverLi = -1"
          >
            <a
              :class="curActivatedLi == 1 ? 'ac-a' : curHoverLi == 1 ? 'hover-a' : 'normal-a'"
              @click="curActivatedLi = 1"
            >视频</a>
            <span
              class="num"
              :style="curActivatedLi == 1 ? 'color: #fff' : ''"
            >81</span>
          </li>
          <li
            :class="curActivatedLi == 2 ? 'contribution-item rpos ac-li' : curHoverLi == 2 ? 'contribution-item rpos hover-li' : 'contribution-item rpos normal-li'"
            @mouseenter="curHoverLi = curActivatedLi == 2 ? -1 : 2"
            @mouseleave="curHoverLi = -1"
          >
            <a
              :class="curActivatedLi == 2 ? 'ac-a' : curHoverLi == 2 ? 'hover-a' : 'normal-a'"
              @click="curActivatedLi = 2"
            >图文</a>
            <span
              class="num"
              :style="curActivatedLi == 2 ? 'color: #fff' : ''"
            >0</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-content">
      <div class="page-head flex-row-ac jc-spb">
        <div class="page-head-left flex-row-ac">
          <p class="video-title">{{curActivatedLi == 1 ? '视频列表' : '图文列表'}}</p>
          <div
            class="be-tab"
            v-show="curActivatedLi == 1"
          >
            <ul>
              <li
                v-for="e in regularList"
                :key="e.id"
                :style="e.id == curRegular ? 'color: #00aeec' : 'color: #000'"
                @click="curRegular = e.id"
              >{{e.tag}}</li>
            </ul>
          </div>
        </div>
        <div
          class="page-head-right flex-row-ac"
          v-show="curActivatedLi == 1"
        >
          <i
            class="iconfont icon-datubiao list"
            :style="curArrangeRegular == VideoArrangeRegular.BIG_ICON ? 'color: #00aeec;' : ''"
            @click="curArrangeRegular = VideoArrangeRegular.BIG_ICON"
          ></i>
          <i
            class="iconfont icon-liebiaopaixu"
            :style="curArrangeRegular == VideoArrangeRegular.LIST ? 'color: #00aeec;' : ''"
            @click="curArrangeRegular = VideoArrangeRegular.LIST"
          ></i>
        </div>
      </div>
      <div
        class="waterfall-content flex-row jcc"
        v-show="curActivatedLi == 2"
      >
        <NoData :message1="'无数据'"></NoData>
      </div>
      <div
        class="submit-video-type-filter flex-row-ac"
        v-show="curActivatedLi == 1"
      >
        <a
          v-for="e in pList"
          :key="e.id"
          :style="curPartition == e.id ? 'color: #00aeec;' : ''"
          class="flex-row-ac"
          @click="curPartition = e.id"
        >{{e.name}}<span class="count">{{e.count}}</span></a>
      </div>
      <div
        class="submit-video"
        v-show="curActivatedLi == 1"
      >
        <VideoCard
          v-for="e in videoList"
          :key="e.id"
          :count="e.count"
          :title="e.title"
          :length="e.length"
          :publish-time="e.publishTime"
          :width="'100%'"
          :height="'190px'"
          :img-height="'120px'"
        ></VideoCard>
      </div>
      <div
        class="be-pager flex-row-ac jcc"
        v-show="curActivatedLi == 1"
      >
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :size="size"
            background
            layout="total, prev, pager, next, jumper"
            :total="400"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NoData from "@/components/NoData.vue";
import VideoCard from "@/components/VideoCard.vue";
import "@/styles/UserPage/index.less";
import type { ComponentSize } from "element-plus";
import {
  Regular,
  VideoArrangeRegular,
  Partition,
  Video,
} from "@/api/UserPage/types";

//投稿-当前悬浮li
const curHoverLi = ref(-1);
//投稿-当前激活li
const curActivatedLi = ref(1);
//视频排序规则
const curRegular = ref(1);
const regularList: Regular[] = [
  { id: 1, tag: "最新发布" },
  { id: 2, tag: "最多播放" },
  { id: 3, tag: "最多收藏" },
];
//视频排列规则
const curArrangeRegular = ref(1);
//当前选择视频分区
const curPartition = ref(1);
// 分区列表
const pList: Partition[] = [
  { id: 1, name: "全部", count: 187, href: "" },
  { id: 2, name: "娱乐", count: 187, href: "" },
  { id: 3, name: "美食", count: 187, href: "" },
  { id: 4, name: "科技", count: 1, href: "" },
];
//视频
const videoList: Video[] = [
  {
    id: 1,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 2,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 3,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 4,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 5,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 6,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 7,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 8,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 9,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 10,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
  {
    id: 11,
    imgSrc: "",
    href: "",
    title: "长沙市规划研究土壤",
    publishTime: "1-17",
    count: "128万",
    length: "11:17",
  },
];
//分页控件
const currentPage = ref(1);
const pageSize = ref(30);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="less" scoped>
// 公共
//li悬停变灰
.hover-li {
  background-color: var(--bgc1);
}
//li普通白
.normal-li {
  background-color: var(--white);
}
//li激活蓝
.ac-li {
  background-color: var(--cur-blue);
}
//a普通黑
.normal-a {
  color: var(--font-color-black);
}
//a悬停蓝
.hover-a {
  color: var(--hover-blue);
}
//激活白
.ac-a {
  color: var(--white);
}

.col-full {
  .contribution-sidenav {
    width: 210px;
    margin-right: -1px;
    font-size: 14px;
    color: #222;
    border-right: 1px solid var(--bgc7);
    box-sizing: border-box;
    .contribution-list-container {
      max-height: 420px;
      margin: 10px 0 20px;
      overflow: hidden;
      .contribution-item {
        padding-left: 30px;
        white-space: nowrap;
        font-size: 0;
        overflow: hidden;
        transition: background-color 0.3s ease;
        a {
          display: inline-block;
          width: 130px;
          line-height: 44px;
          margin-right: 5px;
          font-size: 14px;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .num {
          display: inline-block;
          width: 32px;
          font-size: 12px;
          color: var(--font-color-gray1);
          vertical-align: middle;
          text-align: center;
          font-family: Arial;
        }
      }
    }
  }
  .main-content {
    width: 1071px;
    padding: 20px;
    box-sizing: border-box;
    border-left: 1px solid var(--bgc7);
    .page-head {
      .page-head-left {
        .video-title {
          font-size: 20px;
          line-height: 26px;
          height: 26px;
          color: #222;
        }
        .be-tab {
          display: inline-block;
          line-height: 18px;
          vertical-align: middle;
          margin-left: 15px;
          ul li {
            cursor: pointer;
            display: inline;
            margin-right: 15px;
            font-size: 12px;
          }
        }
      }
      .page-head-right {
        .list {
          margin-right: 10px;
        }
        i {
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
          margin-top: 2px;
        }
        i:hover {
          color: var(--hover-blue);
        }
      }
    }
    .waterfall-content {
      padding: 20px;
    }
    .submit-video-type-filter {
      background: #edf2f9;
      border-radius: 4px;
      line-height: 36px;
      margin: 18px 0 10px;
      padding: 0 20px;
      flex-wrap: wrap;
      a {
        margin-right: 30px;
        cursor: pointer;
        .count {
          color: var(--bgc2);
          margin-left: 8px;
        }
      }
      a:hover {
        color: var(--hover-blue);
      }
    }
    .submit-video {
      display: grid;
      padding-top: 15px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
    }
  }
}
</style>