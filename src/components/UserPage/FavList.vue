<template>
  <div class="col-full flex-row">
    <div class="fav-sidenav rpos">
      <div class="nav-container fav-container">
        <div class="favlist-title flex-row-ac jc-spb" @click="myCreate.visible = !myCreate.visible">
          <p>我的创建</p>
          <i class="i-icon icon-arrow"
            :style="`transform: rotate(${myCreate.visible ? '180deg' : '0deg'});transition: transform .3s ease;`"></i>
        </div>
        <div class="fav-list-container ps rpos" v-show="myCreate.visible">
          <div class="nav-title rpos flex-row-ac" @click="dialog.change = IsShow.SHOW">
            <span title="创建收藏夹" class="i-icon icon-add"></span>
            <span class="text nto">新建收藏夹</span>
          </div>
          <div class="fav-item flex-row-ac rpos"
            :style="myCreate.curFocus == 0 ? 'background-color:#00a1d6;' : myCreate.curHover == 0 ? 'background-color:#e3e5e7;' : 'background-color:#fff;'"
            @mouseenter="onEnter(0)" @mouseleave="onLeave">
            <span class="iconfont icon-simi iconfont-fav"
              :style="myCreate.curFocus == 0 ? 'color:#fff;' : 'color:#99a2aa'"></span>
            <a @click="onClick({
              id: 0, href: '', title: '默认收藏夹', count: 18, isOpen: false, videoList: [
                { id: 11, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 1, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 2, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 3, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 4, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 5, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 6, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 7, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 8, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 9, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
                { id: 10, imgSrc: '', href: '', title: '长沙市规划研究土壤', publishTime: '1-17', count: '128万', length: '11:17' },
              ]
            })" class="text nto" title="默认收藏夹"
              :style="myCreate.curFocus == 0 ? 'color:#fff;' : myCreate.curHover == 0 ? 'color:#00aeec;' : 'color:#222;'">默认收藏夹</a>
            <span class="num" v-show="myCreate.showMore != 0"
              :style="myCreate.curFocus == 0 ? 'color:#fff;' : 'color:#99a2aa;'">24</span>
            <el-popover :width="96" popper-style="padding: 6px 0;">
              <template #reference>
                <span class="iconfont icon-gengduo1 be-dropdown-trigger" v-show="myCreate.showMore == 0"></span>
              </template>
              <div class="be-dropdown-item nto">编辑信息</div>
            </el-popover>
          </div>
          <div v-for="e in favs" :key="e.id"
            :style="myCreate.curFocus == e.id ? 'background-color:#00a1d6;' : myCreate.curHover == e.id ? 'background-color:#e3e5e7;' : 'background-color:#fff;'"
            class="fav-item flex-row-ac rpos" @mouseenter="onEnter(e.id)" @mouseleave="onLeave">
            <span :class="`iconfont ${e.isOpen ? 'icon-gongkai' : 'icon-simi'} iconfont-fav`"
              :style="myCreate.curFocus == e.id ? 'color:#fff;' : 'color:#99a2aa'"></span>
            <a @click="onClick(e)" class="text nto"
              :style="myCreate.curFocus == e.id ? 'color:#fff;' : myCreate.curHover == e.id ? 'color:#00aeec;' : 'color:#222;'">{{ e.title }}</a>
            <span class="num" v-show="myCreate.showMore != e.id"
              :style="myCreate.curFocus == e.id ? 'color:#fff;' : 'color:#99a2aa;'">{{ e.count }}</span>
            <el-popover :width="96" popper-style="padding: 6px 0;">
              <template #reference>
                <span class="iconfont icon-gengduo1 be-dropdown-trigger" v-show="myCreate.showMore == e.id"></span>
              </template>
              <div class="be-dropdown-item nto" @click="console.log(e)">编辑信息</div>
              <div class="be-dropdown-item nto">删除</div>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="nav-container fav-container">
        <div class="favlist-title flex-row-ac jc-spb" @click="mySubscribe.visible = !mySubscribe.visible">
          <p>我的收藏和订阅</p>
          <i class="i-icon icon-arrow"
            :style="`transform: rotate(${mySubscribe.visible ? '180deg' : '0deg'});transition: transform .3s ease;`"></i>
        </div>
        <div class="fav-list-container ps rpos" v-show="mySubscribe.visible"></div>
      </div>
    </div>
    <div class="fav-main rops">
      <div class="favList-info">
        <div class="favInfo-box flex-row">
          <a class="favInfo-cover rpos">
            <i class="i-icon icon-favlist-info"></i>
          </a>
          <div class="favInfo-details">
            <a href="" class="fav-name nto">默认收藏夹</a>
            <div class="fav-meta">
              <span class="fav-up-name">创建者：AAA</span>
            </div>
            <div class="fav-meta">
              <span>24个内容</span>
              <span class="dot">·</span>
              <span>私密</span>
            </div>
            <div class="fav-options flex-row-ac">
              <a href="" class="fav-play">
                <i class="iconfont icon-bofang"></i>播放全部视频</a>
              <div class="meta">
                <i class="iconfont icon-dianzan_kuai"></i>点赞
              </div>
              <div class="meta">
                <i class="iconfont icon-fenxiang1"></i>分享
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fav-header">
        <div class="fav-info flex-row-ac jce" v-show="!batchOperation.state">
          <div class="fav-filters flex-row-ac">
            <div class="filter-item" @click="batchOperation.state = IsOpen.OPEN">
              <span class="text">批量操作</span>
            </div>
            <el-dropdown ref="closeDropdown" trigger="click">
              <span class="dropdown-tag flex-row-ac">
                {{ curTag }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <div class="fav-filter-dropdown">
                  <div class="ffd-item" @click="onTagsClick('全部分区')">
                    <span>全部分区</span>
                    <i>44</i>
                  </div>
                  <div v-for="e in tags" :key="e.id" class="ffd-item" @click="onTagsClick(e.name)">
                    <span>{{ e.name }}</span>
                    <i>{{ e.count }}</i>
                  </div>
                </div>
              </template>
            </el-dropdown>
            <el-dropdown ref="closeDropdown2" trigger="click">
              <span class="dropdown-tag flex-row-ac">
                {{ curRegular }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <div class="be-dropdown-menu">
                  <div class="be-dropdown-item" v-for="e in favVideoArrange" :key="e.id" @click="onRegularClick(e.tag)">
                    {{ e.tag }}</div>
                </div>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div v-show="batchOperation.state" class="fav-action-top">
          <div class="back-to-info back i-icon" @click="exitBatchOperation">返回</div>
          <div class="back-to-info clear-invalid-video">清除失效内容</div>
        </div>
        <div v-show="batchOperation.state" class="fav-action-bottom rpos">
          <div class="fav-action-fixtop flex-row-ac jc-spb">
            <ul>
              <li @click="allSelect()"><i
                  :class="`i-icon ${batchOperation.selectAll ? 'icon-selece-all-active' : 'icon-selece-all'}`"></i>全选
              </li>
              <li><i class="i-icon icon-unstar"></i>取消收藏</li>
              <li><i class="i-icon icon-copy"></i>复制到</li>
              <li><i class="i-icon icon-move"></i>复制到</li>
            </ul>
            <div class="edit-detail">
              <span class="select-counter">{{ `已选择${batchOperation.selectedCount}个视频` }}</span>
              <span class="select-cancel" v-show="batchOperation.state && batchOperation.selectedCount > 0"
                @click="batchOperation.selectedCount = 0">取消选择</span>
            </div>
          </div>
        </div>
      </div>
      <div class="fav-content rpos flex-col-ac">
        <NoData :message1="'该收藏夹还没有视频哦~'" v-show="!checkFavListCount"></NoData>
        <div class="fav-video-list" v-show="checkFavListCount">
          <div class="small-item flex-col rpos" v-for="e in myCreate.curFavList.videoList" :key="e.id">
            <a href="" class="cover rpos">
              <span class="length">{{ e.length }}</span>
              <div class="meta-mask">
                <div class="meta-info">
                  <p>播放：{{ e.count }}</p>
                  <p>收藏：1.6万</p>
                  <p class="nto">UP主：某up主</p>
                  <p>投稿：{{ e.publishTime }}</p>
                </div>
              </div>
            </a>
            <a href="" class="title nto">{{ e.title }}</a>
            <div class="meta nto">收藏于：1-11</div>
            <el-dropdown ref="closeDropdown3" trigger="click">
              <div class="video-edit">
                <div class="be-dropdown-trigger">
                  <i class="iconfont icon-gengduo1"></i>
                </div>
              </div>
              <template #dropdown>
                <div class="be-dropdown-menu">
                  <div class="be-dropdown-item">取消收藏</div>
                  <div class="be-dropdown-item" @click="onMoveOpen">移动到</div>
                  <div class="be-dropdown-item" @click="onCopyOpen">复制到</div>
                </div>
              </template>
            </el-dropdown>
            <div class="video-check-container" v-show="batchOperation.state" @click="select(e.id)">
              <div class="video-check i-icon"
                :style="batchOperation.selected.has(e.id) ? 'background-position: -524px -1038px;' : 'background-position: -460px -1038px;'">
              </div>
            </div>
          </div>
        </div>
        <div class="be-pager flex-row jcc" v-show="checkFavListCount">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
            layout="total, prev, pager, next, jumper" :total="myCreate.curFavList ? myCreate.curFavList.count : 0"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialog.change" title="收藏夹信息" width="446" center>
      <div class="edit-info">
        <div class="cover-title">收藏夹封面</div>
        <label for="cover-upload-btn" class="upload-cover rpos"></label>
        <input type="file" id="cover-upload-btn" class="upload-cover-img" name="file">
        <div class="info-wrap rpos">
          <label for="media-list-name" class="title">
            <span class="red-signal">*</span>收藏夹名称
          </label>
          <input type="text" placeholder="收藏夹名称" maxlength="20" class="name-input" id="media-list-name"
            v-model.trim="modify.favListName">
          <span class="name-num-limit">{{ modify.nameLength }}/20</span>
        </div>
        <div class="info-wrap rpos">
          <label for="media-list-intro" class="title">
            简介：
          </label>
          <textarea id="media-list-intro" typeof="text" maxlength="200" placeholder="可填写简介" class="media-list-intro"
            v-model.trim="modify.intro"></textarea>
          <span class="intro-num-limit">{{ modify.introLength }}/200</span>
        </div>
        <div class="media-list-type">
          <el-checkbox v-model="modify.isOpen" label="公开收藏夹" />
        </div>
        <div class="submit-btn" @click="dialog.change = IsShow.HIDDEN">提交</div>
      </div>
    </el-dialog>
    <el-dialog v-model="c_m" :title="dialog.title" width="420" center :before-close="closeCM">
      <div class="modal-body rpos">
        <ul class="target-favlist-container rpos">
          <li class="target-favitem flex-row-ac jc-spb" v-for="e in favs" :key="e.id" @click="CM.cur = e.id">
            <div class="target-fav-title flex-row-ac">
              <div class="fav-select"
                :style="CM.cur == e.id ? 'background-color:#00a1d6;' : 'border: 1px solid #bec3cc;'">
              </div>
              <div class="fav-meta">
                <div class="fav-name nto">{{ e.title }}</div>
                <div class="fav-state">{{ e.isOpen ? '公开' : '私密' }}</div>
              </div>
            </div>
            <span class="target-fav-count">{{ e.count }}</span>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <div class="btn" @click="closeCM">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import NoData from "@/components/NoData.vue";
import type { ComponentSize } from "element-plus";
import { reactive, ref, computed, watch } from "vue";
import type { DropdownInstance } from "element-plus";
import "@/styles/UserPage/index.less";
import { FavList, PartitionTag, Regular } from "@/api/UserPage/types";
import { IsShow, IsOpen } from "@/api/enums";
//收藏夹列表
const favs: FavList[] = [
  {
    id: 1,
    href: "",
    title: "我的收藏夹1我的收藏夹1我的收藏夹1",
    count: 0,
    icon: "icon-simi",
    isOpen: true,
    videoList: [],
  },
  {
    id: 2,
    href: "",
    title: "我的收藏夹2",
    count: 188,
    icon: "icon-gongkai",
    isOpen: false,
    videoList: [],
  },
  {
    id: 3,
    href: "",
    title: "我的收藏夹3",
    count: 0,
    icon: "icon-gongkai",
    isOpen: false,
    videoList: [],
  },
];
//hover与focus状态
const myCreate = reactive({
  visible: IsShow.SHOW,
  curHover: -1,
  curFocus: 0,
  showMore: -1,
  curFavList: {
    id: 0,
    href: "",
    title: "默认收藏夹",
    count: 18,
    isOpen: false,
    videoList: [
      {
        id: 11,
        imgSrc: "",
        href: "",
        title: "长沙市规划研究土壤",
        publishTime: "1-17",
        count: "128万",
        length: "11:17",
      },
      {
        id: 1,
        imgSrc: "",
        href: "",
        title: "长沙市规划研究土壤",
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
    ],
  },
});
const mySubscribe = reactive({
  visible: IsShow.HIDDEN,
});
function onEnter(id: number) {
  myCreate.curHover = myCreate.curFocus == id ? -1 : id;
  myCreate.showMore = id;
}
function onLeave() {
  myCreate.curHover = -1;
  myCreate.showMore = -1;
}
function onClick(e: FavList) {
  myCreate.curFocus = e.id;
  myCreate.curFavList = e;
}
//分页控件
const currentPage = ref(1);
const pageSize = ref(20);
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
//收藏夹过滤器分区tag
const curTag = ref("全部分区");
const closeDropdown = ref<DropdownInstance>();
function onTagsClick(command: string) {
  curTag.value = command;
  if (!closeDropdown.value) return;
  closeDropdown.value.handleClose();
}
const tags: PartitionTag[] = [
  {
    id: 1,
    name: "音乐",
    count: 10,
  },
  {
    id: 2,
    name: "娱乐",
    count: 1,
  },
  {
    id: 3,
    name: "体育",
    count: 12,
  },
];
//收藏夹视频排序规则
const favVideoArrange: Regular[] = [
  {
    id: 1,
    tag: "最近收藏",
  },
  {
    id: 2,
    tag: "最多播放",
  },
  {
    id: 3,
    tag: "最新投稿",
  },
];
//当前收藏夹视频排序规则
const curRegular = ref("最近收藏");
const closeDropdown2 = ref<DropdownInstance>();
function onRegularClick(command: string) {
  curRegular.value = command;
  if (!closeDropdown2.value) return;
  closeDropdown2.value.handleClose();
}
//是否开启批量操作
const batchOperation = reactive({
  state: IsOpen.CLOSE,
  selectedCount: 0,
  selectAll: false,
  selected: new Set<number>(),
});
function exitBatchOperation() {
  batchOperation.state = IsOpen.CLOSE;
  batchOperation.selectAll = false;
  batchOperation.selected.clear();
}
function allSelect() {
  batchOperation.selectAll = !batchOperation.selectAll;
  const t = myCreate.curFavList.videoList;
  if (batchOperation.selectAll) {
    for (const k in t) {
      batchOperation.selected.add(t[k].id);
    }
  } else {
    batchOperation.selected.clear();
  }
}
function select(e: number) {
  if (batchOperation.selected.has(e)) {
    batchOperation.selected.delete(e);
  } else {
    batchOperation.selected.add(e);
  }
}
//对话框开闭
const dialog = reactive({
  change: false,
  move: false,
  copy: false,
  title: "",
});
function onCopyOpen() {
  dialog.copy = true;
  dialog.title = "复制视频";
}
function onMoveOpen() {
  dialog.move = true;
  dialog.title = "移动视频";
}
function closeCM() {
  dialog.copy = dialog.move = false;
}
//对话框表单
//编辑收藏夹信息
const modify = reactive({
  isOpen: IsOpen.CLOSE,
  favListName: "",
  intro: "",
  nameLength: 0,
  introLength: 0,
});
//移动或复制
const CM = reactive({
  cur: -1,
});
//监听器集合
watch(modify, (newValue) => {
  modify.nameLength = newValue.favListName.length;
  modify.introLength = newValue.intro.length;
});
//计算属性
const checkFavListCount = computed(() => {
  if (!myCreate.curFavList) return false;
  return myCreate.curFavList.count > 0;
});
//移动或复制视频
const c_m = computed(() => {
  return dialog.copy || dialog.move;
});
</script>

<style scoped lang="less">
.fav-filter-dropdown {
  display: flex;
  flex-wrap: wrap;
  padding: 6px 20px;
  width: 242px;

  .ffd-item {
    width: 100px;
    line-height: 36px;
    height: 36px;
    text-align: left;
    cursor: pointer;

    span {
      font-size: 14px;
      color: #222;
    }

    i {
      margin-left: 4px;
      font-size: 12px;
      color: var(--font-color-gray1);
    }
  }

  .ffd-item:hover span,
  .ffd-item:hover i {
    color: var(--hover-blue);
  }
}

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

    .favlist-title {
      height: 54px;
      padding-left: 19px;
      padding-right: 11px;
      line-height: 54px;
      font-size: 14px;
      color: var(--font-color-gray3);
      cursor: pointer;

      .icon-arrow {
        width: 16px;
        height: 20px;
        background-position: -1305px -215px;
      }

      .icon-arrow::before {
        content: "";
      }
    }

    .fav-list-container {
      max-height: 420px;
      margin-bottom: 10px;

      .text {
        display: block;
        line-height: 24px;
        width: 111px;
        margin-right: 10px;
        font-size: 14px;
      }

      .nav-title {
        cursor: pointer;
        height: 44px;
        padding-left: 20px;

        .icon-add {
          background-position: -86px -1170px;
          width: 30px;
          height: 30px;
        }
      }

      .fav-item {
        height: 44px;
        padding-left: 20px;
        font-size: 0;
        transition: background-color 0.3s ease;

        .iconfont-fav {
          font-size: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .num {
          display: inline-block;
          width: 32px;
          font-size: 12px;
          vertical-align: middle;
          text-align: center;
          font-family: Arial;
        }

        .be-dropdown-trigger {
          display: inline-block;
          width: 32px;
          color: var(--font-color-gray3);
          font-size: 15px;
          vertical-align: middle;
          text-align: center;
          font-family: Arial;
        }
      }
    }
  }
}

.fav-main {
  width: 1070px;
  min-height: 600px;
  border-left: 1px solid var(--bgc7);

  .favList-info {
    padding: 20px 0;
    margin: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--bgc8);

    .favInfo-box {
      height: 119px;

      .favInfo-cover {
        display: block;
        height: 119px;
        width: 190px;
        overflow: hidden;
        background-color: var(--bgc4);

        .icon-favlist-info {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAspJREFUWAntWD2IGlEQds0PSfSwjQSJRKKCNoGA2JhrAilMCiEY0gdiKls7bSy00UasQuQw4KU70OZSiSAikkYRE9SLihoFf+AgGohmJrkDWXaeq5y3G7iB2bdv3sz7vp03zspyin+igeEpqB5UDSqlnAL4Cegx6JSDC5J7C3obVE7yE8jEr8HlOeg9OTE743IDxj0lXPRnBjkOeiQodc2xEqNGgrIW2RO8vm36yuXya4vF8lBMfKVS+Wa1Wj+K8eX7XFYGl3xgsXPsg36xzlL4XVYGt362jWpwk7qjGG1aj1JkcKN6vKpB6qjF2qU4YrHc/vqRPxK73a5JpVIvdTrdLv/pLNvtdtftdn/K5/NTIeZkBsPh8JMdk0M+HGIA1r4QObSRBFUq1S0q6KLtarWaxCIJDgYDwZQLkfP7/YdOpzNWr9e/C62vs/V6vQnlQxKE2iCD+JsFAoFqOp0eGo3GD/F4PPMLhO/Dmnc6HRKLJNhoNMggCmyxWCg8Hk/R4XDEarVag/Lj25vNJolFEqxWq2QQH4A/LxQKU7PZfBCNRo/m8/mMv86fs7BIgqVSaWuC5wS8Xu8Xl8v1frlcLs5tQmOxWCSxSIKtVgsefv3TCwGu2maz2W+O40gcWJ9BDc5XY1bvyUB0Go1G5JOtbkLdRyKRR5lM5g21jvbxeMzEIN8kGDwcDidarfYu3m8iNptNk0gkXphMpgfr4hCD5cPMYL/fZwbzN1YqlYpYLPY4m82+E0MO47vdLhODmUGxvdDn85mgrUxDodAzg8Fwn0+cNWf1QIxjEhTbC4PB4CsWCdYaqwdiHPOI4ah+sDa/iLV1GEyCuVxukkwmP8Obi2wD25LEHoZ7IwZrj6u//KzsiFljHrGYDXbt818QxG/CcpVTzOCJXNkhNySIX9Pxg7XcBDkd40d07HFl0D3QO6A3QaUULLmvoIeg0z8kQfSabrii0gAAAABJRU5ErkJggg==);
          background-size: 100%;
        }
      }

      .favInfo-details {
        margin-left: 18px;

        .fav-name {
          display: block;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #212121;
          line-height: 17px;
          margin-bottom: 14px;
          width: 368px;
          height: 17px;
        }

        .fav-meta {
          color: var(--font-color-gray3);
          font-size: 0;
          letter-spacing: 0;
          line-height: 16px;
          margin-bottom: 6px;

          span {
            display: inline-block;
            font-size: 12px;
            vertical-align: middle;
          }

          .fav-up-name {
            margin-right: 20px;
            line-height: 16px;
            color: var(--font-color-gray3);
          }

          .dot {
            margin: 0 8px;
          }
        }
      }

      .fav-options {
        margin-top: 16px;

        .fav-play {
          width: 120px;
          height: 32px;
          background: #00a1d6;
          border-radius: 2px;
          font-size: 14px;
          color: #fff;
          line-height: 32px;
          text-align: center;
          margin-right: 42px;
          cursor: pointer;
        }

        .fav-play:hover {
          background-color: var(--hover-blue);
        }

        .meta {
          font-size: 12px;
          color: #505050;
          line-height: 16px;
          margin-right: 48px;
          cursor: pointer;

          i {
            font-size: 22px;
            vertical-align: sub;
          }
        }
      }
    }
  }

  .fav-header {
    margin: 20px 20px 0;

    .fav-info {
      height: 30px;
      margin-top: 15px;

      .fav-filters {
        .filter-item {
          line-height: 30px;
          margin-right: 26px;
          font-size: 14px;
          color: var(--font-color-black2);

          .text {
            cursor: pointer;
          }
        }

        .filter-item:hover {
          color: var(--hover-blue);
        }

        .dropdown-tag {
          font-size: 14px;
          color: var(--font-color-black2);
          cursor: pointer;
          line-height: 30px;
          margin-right: 26px;
        }
      }
    }

    .fav-action-top {
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e9ef;

      .back-to-info {
        height: 30px;
        cursor: pointer;
        line-height: 28px;
        padding-right: 10px;
        text-align: right;
        border: 1px solid #ccd0d7;
        border-radius: 4px;
        font-size: 14px;
        color: #222;
        background-position: -147px -1171px;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
      }

      .back {
        width: 60px;
      }

      .clear-invalid-video {
        width: auto;
        padding-left: 10px;
        float: right;
      }
    }

    .fav-action-bottom {
      height: 59px;
      font-size: 14px;

      .fav-action-fixtop {
        position: absolute;
        left: -20px;
        top: 0px;
        width: 1070px;
        padding: 19px 20px 0;
        height: 59px;
        box-sizing: border-box;
        background-color: #fff;

        ul li {
          display: inline;
          color: var(--font-color-black2);
          line-height: 20px;
          margin-right: 30px;
          cursor: pointer;
        }

        ul li:hover {
          color: var(--hover-blue);
        }

        i {
          width: 22px;
          height: 22px;
          margin-right: 6px;
        }

        .icon-selece-all {
          background-position: -340px -1045px;
        }

        .icon-selece-all-active {
          background-position: -403px -1045px;
        }

        .icon-unstar {
          background-position: -470px -1109px;
        }

        .icon-copy {
          background-position: -533px -1109px;
        }

        .icon-move {
          background-position: -597px -1109px;
        }

        .edit-detail {
          .select-counter {
            display: inline-block;
            font-size: 14px;
            color: var(--font-color-gray3);
            margin-right: 15px;
            vertical-align: middle;
          }

          .select-cancel {
            font-size: 14px;
            color: var(--cur-blue);
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }

  .fav-content {
    .fav-video-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
      margin: 20px 20px 50px;

      .small-item {
        width: 100%;
        height: auto;

        .cover {
          width: 190px;
          height: 119px;
          display: block;
          background-color: var(--bgc4);
          border-radius: 4px;
          overflow: hidden;

          .length {
            position: absolute;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 5px 0 0 0;
            color: #fff;
            line-height: 20px;
            padding: 0 6px;
          }

          .meta-mask {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 4;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.45);
            color: #e5e9ef;
            transition: opacity 0.2s ease;

            .meta-info {
              position: relative;
              top: 50%;
              left: 15px;
              transform: translateY(-50%);

              p {
                display: block;
                width: 125px;
              }
            }
          }
        }

        .cover:hover .length {
          opacity: 0;
        }

        .cover:hover .meta-mask {
          opacity: 1;
        }

        .title {
          display: block;
          line-height: 20px;
          height: 38px;
          margin-top: 6px;
        }

        .title:hover {
          color: var(--hover-blue);
        }

        .meta {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          height: 16px;
          line-height: 16px;
        }

        .video-edit {
          position: absolute;
          display: inline-block;
          cursor: pointer;
          bottom: -5px;
          right: -14px;

          .be-dropdown-trigger {
            width: 24px;
            height: 24px;
            margin: auto;
            text-align: center;
            display: block;
            line-height: 24px;
            font-size: 24px;
            color: #999;
          }
        }

        .video-check-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 5;

          .video-check {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 40px;
            height: 40px;
            z-index: 6;
            cursor: pointer;
          }
        }
      }
    }
  }
}

//对话框
.edit-info {
  padding: 0 23px;

  .cover-title {
    font-size: 14px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 16px;
  }

  .upload-cover {
    display: inline-block;
    width: 114px;
    height: 70px;
    border-radius: 2px;
    cursor: pointer;
    vertical-align: top;
    background: url(../../assets/images/load_fail_background.png) 50% no-repeat;
    background-size: 100% 100%;
    margin-top: 8px;
  }

  .upload-cover-img {
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .info-wrap {
    margin-top: 16px;

    .name-input {
      display: block;
      width: 374px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      padding: 0 12px;
      border-radius: 2px;
      border: 1px solid #ccd0d7;
      margin-top: 8px;
      cursor: auto;
    }

    .name-input:focus {
      border: 1px solid var(--hover-blue);
    }

    .name-num-limit {
      position: absolute;
      right: 12px;
      bottom: 6px;
      font-size: 12px;
      color: var(--font-color-gray3);
    }

    .media-list-intro {
      width: 374px;
      height: 138px;
      border: 1px solid #ccd0d7;
      border-radius: 2px;
      font-size: 14px;
      line-height: 22px;
      padding: 5px 12px 24px;
      margin-top: 8px;
      overflow: auto;
      resize: none;
    }

    .intro-num-limit {
      position: absolute;
      right: 12px;
      bottom: 12px;
      font-size: 12px;
      color: var(--font-color-gray3);
      margin-right: 5px;
    }

    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      cursor: pointer;
    }

    .red-signal {
      color: var(--font-color-red);
    }
  }

  .submit-btn {
    width: 65px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: var(--white);
    background-color: var(--cur-blue);
    text-align: center;
    border-radius: 2px;
    margin: 8px auto 0;
    cursor: pointer;
  }

  .submit-btn:hover {
    background-color: var(--hover-blue);
  }
}

.modal-body {
  border-top: 1px solid var(--bgc8);
  margin-bottom: 20px;
  overflow: hidden;
  padding: 10px 20px;
  box-sizing: border-box;
  min-height: 270px;
  max-height: 344px;

  .target-favlist-container {
    min-height: 270px;

    .target-favitem {
      height: 40px;
      margin-bottom: 16px;
      overflow: hidden;
      cursor: pointer;
      font-size: 14px;

      .target-fav-title {
        .fav-select {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-top: 3px;
        }

        .fav-meta {
          text-align: left;
          margin-left: 19px;

          .fav-name {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: var(--font-color-black2);
          }

          .fav-state {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #99a2aa;
          }
        }
      }

      .target-fav-count {
        font-size: 14px;
        color: #222;
      }
    }
  }
}

.modal-footer {
  border-top: 1px solid var(--bgc8);
  padding: 15px 0 0;

  .btn {
    margin: auto;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #00a1d6;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>