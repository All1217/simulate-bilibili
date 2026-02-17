<template>
  <div class="col-full series">
    <div class="channel-index rpos">
      <div class="series-page-head">
        <div class="series-page-head-left">
          <p class="video-title">合集和视频列表</p>
          <i class="icon arrow" v-show="curSeriesState == DisplaySeriesDetail.SHOW"></i>
          <p class="video-title"  v-show="curSeriesState == DisplaySeriesDetail.SHOW">合集和视频列表</p>
        </div>
      </div>
      <div class="content">
        <div
          class="channel-list flex-col rpos"
          v-for="e in seriesList"
          :key="e.id"
        >
          <a
            href=""
            class="cover rpos"
          >
            <div class="video-num">
              <span>3</span>
              <em class="iconfont icon-heji1"></em>
            </div>
          </a>
          <span class="playall"><i class="iconfont icon-bofang"></i></span>
          <span class="title">{{e.title}}</span>
          <div class="meta flex-row-ac">
            <span class="time">{{e.publishTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="be-pager flex-row-ac jcc">
      <!-- TODO 合集一页最多18个 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :size="size"
        background
        layout="total, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Series, DisplaySeriesDetail } from "@/api/UserPage/types";

//合集
const seriesList: Series[] = [
  {
    id: 1,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 2,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 3,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 4,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 5,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 6,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
  {
    id: 7,
    imgSrc: "",
    href: "",
    title:
      "长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤长沙市规划研究土壤",
    publishTime: "1-17",
    count: 16,
  },
];
//分页控件
import type { ComponentSize } from "element-plus";
const currentPage = ref(4);
const pageSize = ref(30);
const size = ref<ComponentSize>("default");
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
//是否显示合集详情
const curSeriesState = ref(DisplaySeriesDetail.HIDDEN);
</script>

<style lang="less">
@import "@/styles/UserPage/index.less";
.series {
  padding: 20px;
}
.col-full {
  .channel-index {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
    .series-page-head {
      .series-page-head-left {
        .video-title {
          font-size: 20px;
          line-height: 26px;
          height: 26px;
          color: #222;
        }
        .arrow {
          width: 26px;
          height: 20px;
          background-position: -339px -405px;
        }
      }
    }
    .content {
      display: grid;
      padding-top: 15px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
      .channel-list {
        width: 100%;
        height: 190px;
        .cover {
          background-color: var(--bgc1);
          border-radius: 4px;
          display: block;
          width: 100%;
          height: 120px;
          overflow: hidden;
          .video-num {
            position: absolute;
            top: 0;
            right: 0;
            width: 70px;
            height: 100%;
            color: #e5e9ef;
            text-align: center;
            font-size: 12px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.5);
            span {
              margin-top: 38px;
              display: block;
              line-height: 20px;
              font-size: 18px;
              color: #fff;
              font-weight: 400;
              font-family: Arial;
            }
            em {
              display: block;
              height: 18px;
              font-size: 25px;
            }
          }
        }
        .playall {
          position: absolute;
          right: 4px;
          top: 92px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          width: 24px;
          height: 24px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          i {
            font-size: 12px;
            line-height: 24px;
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
        .meta {
          color: var(--bgc2);
          white-space: nowrap;
          font-size: 0;
          margin-top: 5px;
          height: 16px;
          line-height: 16px;
          span {
            white-space: nowrap;
            height: 16px;
            line-height: 18px;
            font-size: 12px;
            overflow: hidden;
          }
        }
      }
    }
  }
  .be-pager {
    text-align: center;
    margin: 15px 0;
  }
}
</style>