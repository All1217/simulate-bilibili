<template>
  <div class="col-full flex-row">
    <div class="fav-sidenav rpos">
      <div class="nav-container">
        <div class="nav-title rpos">
          <span class="text">我的关注</span>
          <span
            title="创建新分组"
            class="i-icon icon-add"
          ></span>
        </div>
        <div class="follow-list-container rpos">
          <ul class="follow-list">
            <li class="follow-item nto rpos">
              <span class="i-icon icon-follow-all"></span>
              <a
                href=""
                class="text nto"
              >全部关注</a>
              <span class="num">42</span>
            </li>
            <li class="follow-item nto rpos">
              <span class="i-icon icon-follow-special"></span>
              <a
                href=""
                class="text nto"
              >特别关注</a>
              <span class="num">0</span>
            </li>
            <li class="follow-item nto rpos">
              <span class="i-icon icon-follow-silent"></span>
              <a
                href=""
                class="text nto"
              >悄悄关注</a>
              <span class="num">0</span>
            </li>
            <li class="follow-item nto rpos">
              <span class="i-icon icon-follow-default"></span>
              <a
                href=""
                class="text nto"
              >默认分组</a>
              <span class="num">0</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-container">
        <div class="nav-title rpos">
          <span class="text">我的粉丝</span>
        </div>
        <div class="follow-list-container rpos">
          <ul class="follow-list">
            <li class="follow-item nto rpos">
              <span class="i-icon icon-follow-fans"></span>
              <a
                href=""
                class="text nto"
              >我的粉丝</a>
              <span class="num">42</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fav-main rops">
      <div class="follow-header">
        <div class="breadcrumb rpos flex-row-ac jc-spb">
          <p class="item">默认分组</p>
          <div class="flex-row-ac"><i class="i-icon icon-multiple"></i></div>
        </div>
      </div>
      <div class="follow-content rpos">
        <div
          class="no-data flex-row jcc"
          v-show="cur.list.length == 0"
        >
          <NoData :message1="'你还没有该分组的用户哦~'"></NoData>
        </div>
        <div class="content">
          <ul class="relation-list">
            <li
              class="list-item rpos"
              v-for="e in cur.list"
              :key="e.id"
            >
              <div class="cover-container"></div>
              <div class="content rpos">
                <a
                  href=""
                  class="title nto"
                >
                  <span class="fans-name">{{e.name}}</span>
                </a>
                <p class="auth-description nto">{{e.intro}}</p>
                <div class="fans-action flex-row-ac">
                  <el-dropdown
                    ref="closeDropdown"
                    trigger="hover"
                  >
                    <div
                      class="fans-action-follow flex-row-ac"
                      v-show="e.isFollow && !e.isFan"
                    >
                      <i class="iconfont icon-caidan"></i>
                      <span class="fans-action-text">已关注</span>
                    </div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <div class="be-dropdown-item">设置分组</div>
                        <div class="be-dropdown-item">取消关注</div>
                      </div>
                    </template>
                  </el-dropdown>
                  <el-dropdown
                    ref="closeDropdown"
                    trigger="hover"
                  >
                    <div
                      class="fans-action-follow rpos"
                      v-show="e.isFollow && e.isFan"
                    >
                      <i class="iconfont icon-caidan"></i>
                      <span class="fans-action-text">已互粉</span>
                    </div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <div class="be-dropdown-item">设置分组</div>
                        <div class="be-dropdown-item">取消关注</div>
                      </div>
                    </template>
                  </el-dropdown>
                  <div
                    class="fans-action-btn"
                    v-show="!e.isFollow"
                  >关注</div>
                  <el-dropdown
                    ref="closeDropdown"
                    trigger="hover"
                  >
                    <div class="be-dropdown-trigger"><i class="iconfont icon-gengduo1"></i></div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <div class="be-dropdown-item">发消息</div>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </li>
          </ul>
          <div class="be-pager flex-row jcc" v-show="cur.list.length > 0">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :size="size"
              background
              layout="total, prev, pager, next, jumper"
              :total="cur.list.length"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/styles/UserPage/index.less";
import NoData from "../NoData.vue";
import { User, CurState } from "@/api/UserPage/types";
import { reactive, ref } from "vue";
import type { ComponentSize } from "element-plus";

const followList: User[] = [
  {
    id: 1,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: true,
    isFan: true,
  },
  {
    id: 2,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: false,
    isFan: true,
  },
  {
    id: 3,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: true,
    isFan: false,
  },
  {
    id: 4,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: false,
    isFan: false,
  },
];
const fansList: User[] = [
  {
    id: 1,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: true,
    isFan: true,
  },
  {
    id: 2,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: false,
    isFan: true,
  },
  {
    id: 3,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: true,
    isFan: false,
  },
  {
    id: 4,
    name: "string",
    intro: "string",
    imgSrc: "string",
    isFollow: false,
    isFan: false,
  },
];
const cur = reactive({
  cur: CurState.FOLLOW,
  list: followList,
});
//分页控件
const currentPage = ref(1);
const pageSize = ref(20);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="less" scoped>
.fav-sidenav {
  width: 210px;
  margin-right: -1px;
  font-size: 14px;
  color: var(--font-color-black2);
  border-right: 1px solid #eee;
  box-sizing: border-box;
  .nav-container {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: var(--font-color-black2);
    .nav-title {
      height: 44px;
      padding: 20px 0px 0px 20px;
      .text {
        display: block;
        line-height: 24px;
        color: rgb(153, 162, 170);
        width: 103px;
        margin-right: 10px;
        cursor: pointer;
      }
      .icon-add {
        position: absolute;
        bottom: -4px;
        right: 8px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-position: -81px -1170px;
      }
    }
    .follow-list-container {
      max-height: 440px;
      margin: 10px 0px 20px;
      .follow-list {
        .follow-item {
          padding-left: 20px;
          transition: background-color 0.3s;
          font-size: 0px;
          .i-icon {
            width: 20px;
            height: 18px;
            margin-right: 6px;
          }
          .icon-follow-all {
            background-position: -150px -856px;
          }
          .icon-follow-special {
            background-position: -150px -791px;
          }
          .icon-follow-silent {
            background-position: -278px -983px;
          }
          .icon-follow-default {
            background-position: -22px -1112px;
          }
          .icon-follow-fans {
            background-position: -21px -984px;
          }
          .text {
            display: inline-block;
            line-height: 44px;
            width: 103px;
            margin-right: 10px;
            font-size: 14px;
            vertical-align: middle;
            cursor: pointer;
          }
          .num {
            display: inline-block;
            width: 50px;
            font-size: 12px;
            vertical-align: middle;
            text-align: center;
          }
        }
      }
    }
  }
}
.fav-main {
  width: 1070px;
  min-height: 600px;
  border-left: 1px solid var(--bgc7);
  .follow-header {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(229, 233, 239);
    margin: 20px 20px 0px;
    min-height: 30px;
    .breadcrumb {
      line-height: 30px;
      .item {
        color: var(--font-color-black2);
        display: inline-block;
        font-size: 18px;
        vertical-align: middle;
      }
      .icon-multiple {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-image: url(../../assets/images/icon-multiple.png);
        background-size: cover;
      }
    }
  }
  .follow-content {
    .no-data {
      width: 100%;
      padding: 15px 0;
    }
    .content {
      padding-bottom: 10px;
      .relation-list {
        padding: 0px 20px 20px;
        .list-item {
          border-bottom: 1px solid #eee;
          display: block;
          padding: 20px 0;
          line-height: 1;
          .cover-container {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: var(--bgc7);
            border-radius: 50%;
          }
          .content {
            padding: 0px 200px 0px 0px;
            margin-left: 88px;
            margin-top: 10px;
            .title {
              font-size: 16px;
              line-height: 19px;
              height: 20px;
              margin-bottom: 10px;
              display: inline-block;
              max-width: 680px;
              .fans-name {
                color: var(--pink);
              }
            }
            .auth-description {
              line-height: 14px;
              font-size: 12px;
              color: rgb(109, 117, 122);
            }
            .fans-action {
              position: absolute;
              right: 0px;
              top: 9px;
              .fans-action-btn {
                border: 1px solid rgb(204, 208, 215);
                border-radius: 4px;
                width: 74px;
                line-height: 22px;
                margin-left: 15px;
                color: var(--font-color-gray1);
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
              }
              .fans-action-btn:hover {
                border: 1px solid var(--hover-blue);
                color: var(--hover-blue);
              }
              .be-dropdown-trigger {
                width: 24px;
                height: 24px;
                margin: auto;
                text-align: center;
                i {
                  display: block;
                  line-height: 24px;
                  font-size: 18px;
                  color: var(--font-color-gray1);
                }
              }
            }
          }
        }
      }
    }
  }
}
.fans-action-follow {
  background-color: rgb(229, 233, 239);
  border-radius: 4px;
  padding: 4px 11px 4px 9px;
  line-height: 16px;
  margin-left: 15px;
  i {
    margin-right: 2px;
    font-size: 14px;
  }
  .fans-action-text {
    color: rgb(109, 117, 122);
    line-height: 16px;
    font-size: 12px;
    vertical-align: middle;
  }
}
</style>