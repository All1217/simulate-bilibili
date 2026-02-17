<template>
  <div class="col-full flex-row">
    <div class="fav-sidenav rpos">
      <div class="nav-container fav-container">
        <div class="favlist-title flex-row-ac jc-spb" @click="myCreate.visible = !myCreate.visible">
          <p>用户创建</p>
          <i class="i-icon icon-arrow"
            :style="`transform: rotate(${myCreate.visible ? '180deg' : '0deg'});transition: transform .3s ease;`"></i>
        </div>
        <div class="fav-list-container ps rpos" v-show="myCreate.visible">
          <div class="nav-title rpos flex-row-ac" v-show="userUid == userStore.userInfo.uid" @click="onAddClick()">
            <span title="创建收藏夹" class="i-icon icon-add"></span>
            <span class="text nto">新建收藏夹</span>
          </div>
          <div v-for="e in favList"
            v-show="e.isDelete == 0 && (e.visible == 1 || (e.visible == 0 && userStore.userInfo.uid == userUid))"
            :style="myCreate.curFocus == e.fid ? 'background-color:#00a1d6;' : myCreate.curHover == e.fid ? 'background-color:#e3e5e7;' : 'background-color:#fff;'"
            class="fav-item flex-row-ac rpos" @mouseenter="onEnter(e.fid)" @mouseleave="onLeave">
            <span :class="`iconfont ${e.visible ? 'icon-gongkai' : 'icon-simi'} iconfont-fav`"
              :style="myCreate.curFocus == e.fid ? 'color:#fff;' : 'color:#99a2aa'"></span>
            <a @click="onClick(e)" class="text nto"
              :style="myCreate.curFocus == e.fid ? 'color:#fff;' : myCreate.curHover == e.fid ? 'color:#00aeec;' : 'color:#222;'">{{
                e.title }}</a>
            <span class="num" v-show="myCreate.showMore != e.fid"
              :style="myCreate.curFocus == e.fid ? 'color:#fff;' : 'color:#99a2aa;'">{{ e.count }}</span>
            <el-popover :width="96" popper-style="padding: 6px 0;">
              <template #reference>
                <span class="iconfont icon-gengduo1 be-dropdown-trigger"
                  v-show="userStore.userInfo.uid == userUid && myCreate.showMore == e.fid"
                  :style="myCreate.curFocus == e.fid ? 'color:#fff' : ''"></span>
              </template>
              <div class="be-dropdown-item" @click="onModifyClick(e)">编辑信息</div>
              <div class="be-dropdown-item" @click="onRemove(e.fid)">删除</div>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="nav-container fav-container">
        <div class="favlist-title flex-row-ac jc-spb" @click="mySubscribe.visible = !mySubscribe.visible">
          <p>用户收藏和订阅</p>
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
            <img v-show="curSelectedFav.cover != '' && curSelectedFav.cover != null" :src="curSelectedFav.cover" alt=""
              class="up-fav-sel-cover">
            <i class="i-icon icon-favlist-info"></i>
          </a>
          <div class="favInfo-details">
            <a class="fav-name nto">{{ curSelectedFav.title }}</a>
            <div class="fav-meta">
              <span class="fav-up-name">创建者：{{ ui.nickname }}</span>
            </div>
            <div class="fav-meta">
              <span>{{ curSelectedFav.count }}个内容</span>
              <span class="dot">·</span>
              <span>{{ curSelectedFav.visible == 1 ? '公开' : '私密' }}</span>
            </div>
            <div class="fav-options flex-row-ac">
              <a @click="ElMessage.warning('敬请期待！')" class="fav-play">
                <i class="iconfont icon-bofang"></i>播放全部视频</a>
              <div @click="ElMessage.warning('敬请期待！')" class="meta">
                <i class="iconfont icon-dianzan_kuai"></i>点赞
              </div>
              <div @click="ElMessage.warning('敬请期待！')" class="meta">
                <i class="iconfont icon-fenxiang1"></i>分享
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fav-header">
        <div class="fav-info flex-row-ac jce" v-show="!batchOperation.state">
          <div class="fav-filters flex-row-ac">
            <div class="filter-item" @click="batchOperation.state = true" v-show="userUid == userStore.userInfo.uid">
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
                {{ curRegularTag }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <div class="be-dropdown-menu">
                  <div class="be-dropdown-item" v-for="e in favVideoArrange" :key="e.id"
                    @click="onRegularClick(e.tag, e.column)">
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
              <li @click="batchUnCollectClick()"><i class="i-icon icon-unstar"></i>取消收藏</li>
              <li @click="batchSelect('复制到', true, false)"><i class="i-icon icon-copy"></i>复制到</li>
              <li @click="batchSelect('移动到', false, true)"><i class="i-icon icon-move"></i>移动到</li>
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
        <NoData :message1="'该收藏夹还没有视频哦~'" v-show="curVideoVoList.length == 0"></NoData>
        <div class="fav-video-list" v-show="curVideoVoList.length > 0">
          <div class="small-item flex-col rpos" v-for="e in curVideoVoList">
            <router-link :to="{ name: 'Video', params: { vid: e.vid } }" class="cover rpos">
              <img :src="e.coverUrl" alt="" class="up-fav-cover">
              <span class="length">{{ formatTimeGap(e.duration) }}</span>
              <div class="meta-mask">
                <div class="meta-info">
                  <p>播放：{{ formatCount(e.play) }}</p>
                  <p>收藏：{{ formatCount(e.collect) }}</p>
                  <p class="nto">UP主：{{ e.nickname }}</p>
                  <p>投稿：{{ formatStringDate(e.uploadDate, DateStringType.Y_M_D) }}</p>
                </div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Video', params: { vid: e.vid } }" class="title nto2">{{ e.title }}</router-link>
            <div class="meta nto">收藏于：{{ formatStringDate(e.time, DateStringType.Y_M_D) }}</div>
            <el-dropdown ref="closeDropdown3" trigger="click">
              <div class="video-edit" v-show="userUid == userStore.userInfo.uid">
                <div class="be-dropdown-trigger">
                  <i class="iconfont icon-gengduo1"></i>
                </div>
              </div>
              <template #dropdown>
                <div class="be-dropdown-menu">
                  <div class="be-dropdown-item" @click="unCollect(e.vid)">取消收藏</div>
                  <div class="be-dropdown-item" @click="singleSelect('移动到', false, true, e.vid)">移动到</div>
                  <div class="be-dropdown-item" @click="singleSelect('复制到', true, false, e.vid)">复制到</div>
                </div>
              </template>
            </el-dropdown>
            <div class="video-check-container" v-show="batchOperation.state" @click="select(e.vid)">
              <div class="video-check i-icon"
                :style="batchOperation.selected.has(e.vid) ? 'background-position: -524px -1038px;' : 'background-position: -460px -1038px;'">
              </div>
            </div>
          </div>
        </div>
        <div class="be-pager flex-row jcc" v-show="checkFavListCount">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
            layout="total, prev, pager, next, jumper" :total="curTotal" @current-change="pageChange" />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialog.change" title="收藏夹信息" width="446" center>
      <div class="edit-info">
        <div class="cover-title">收藏夹封面</div>
        <label for="cover-upload-btn" class="upload-cover rpos">
          <img v-show="modify.coverUrl != ''" :src="modify.coverUrl" alt="" width="100%" height="100%"
            style="object-fit: cover;">
        </label>
        <input type="file" id="cover-upload-btn" class="upload-cover-img" name="file" @change="handleFileChange">
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
        <div class="submit-btn" @click="beforeAddFavor" v-show="!modify.isModify">提交</div>
        <div class="submit-btn" @click="beforeUpdateFavor" v-show="modify.isModify">确定</div>
      </div>
    </el-dialog>
    <el-dialog v-model="c_m" :title="dialog.title" width="420" center
      :before-close="() => { dialog.copy = dialog.move = false; }">
      <!-- 移动或复制 -->
      <div class="modal-body rpos">
        <ul class="target-favlist-container rpos">
          <li class="target-favitem flex-row-ac jc-spb" v-for="e in favList" @click="dialog.cur = e.fid">
            <div class="target-fav-title flex-row-ac">
              <div class="fav-select"
                :style="dialog.cur == e.fid ? 'background-color:#00a1d6;' : 'border: 1px solid #bec3cc;'">
              </div>
              <div class="fav-meta">
                <div class="fav-name nto">{{ e.title }}</div>
                <div class="fav-state">{{ e.visible == 1 ? '公开' : '私密' }}</div>
              </div>
            </div>
            <span class="target-fav-count">{{ e.count }}</span>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <div class="btn" @click="onBatchConfirmClick">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import NoData from "@/components/NoData.vue";
import { ComponentSize, ElMessage, DropdownInstance } from "element-plus";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { PartitionTag, Regular } from "@/api/UserPage/types";
import { Favorite, User, VideoFavoriteVo } from "@/api/Models";
import { useUserStore } from "@/util/userStore";
import { geneId, formatTimeGap, formatCount, formatStringDate } from "@/util/index";
import { DateStringType } from "@/api/enums"
import { getFavoriteList } from '@/api/favorite'
import { getUserInfoByUid, getFavorVideoVo, addFavorite, updateFavor, batchMove, batchCopy, batchUnCollect } from '@/api/UserPage/index'
import { defaultUserInfo } from '@/api/index'
import { onUploadCover } from '@/api/UploadManager/edit';
import { FavoriteUpdateVo } from '@/api/UserPage/types'
const route = useRoute()
const userStore = useUserStore()
//hover与focus状态
const myCreate = reactive({
  visible: true,
  curHover: -1,
  curFocus: 0,
  showMore: -1,
  curFid: 0
});
/**
 * @description: 用户信息
 */
//用户UID
const userUid = ref<number>(0)
//用户主要信息
const ui = ref<User>(defaultUserInfo)

/**
 * @description: 表单
 */
//新建&修改表单
const modify = reactive({
  isModify: true,//是修改模式还是新增模式
  fid: 0,
  isOpen: false,
  favListName: "",
  intro: "",
  coverUrl: '',
  //监听输入字数
  nameLength: 0,
  introLength: 0
});
function resetModifyForm(e: Favorite) {
  modify.fid = e == null ? 0 : e.fid;
  modify.isOpen = e == null ? false : e.visible == 0 ? false : true;
  modify.favListName = e == null ? '' : e.title;
  modify.intro = e == null ? '' : e.description;
  modify.coverUrl = e == null ? '' : e.cover;
}
//监听器集合
watch(modify, (newValue) => {
  modify.nameLength = newValue.favListName.length;
  modify.introLength = newValue.intro.length;
});
/**
 * @description: 文件上传
 */
const selectedFile = ref<File | null>(null);
const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (selectedFile.value.size > maxSize) {
      ElMessage.error('文件大小不能超过2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      modify.coverUrl = reader.result as string;
    };
    reader.readAsDataURL(selectedFile.value);
  }
};
/**
 * @description: 收藏管理
 */
//收藏夹列表
const favList = ref<Favorite[]>([{ fid: 0, uid: 0, type: 0, visible: 1, cover: 'string', title: '默认收藏夹', description: '默认收藏夹', count: 0, isDelete: 0 }]);
const curVideoVoList = ref<VideoFavoriteVo[]>([])
const curSelectedFav = ref<Favorite>({ fid: 0, uid: 0, type: 0, visible: 1, cover: 'string', title: '默认收藏夹', description: '默认收藏夹', count: 0, isDelete: 0 })
const checkFavListCount = computed(() => {//是否显示无数据
  if (myCreate.curFid == 0) return false;
  return curVideoVoList.value.length > 0;
});
const mySubscribe = reactive({
  visible: false,
});
function onEnter(id: number) {
  myCreate.curHover = myCreate.curFocus == id ? -1 : id;
  myCreate.showMore = id;
}
function onLeave() {
  myCreate.curHover = -1;
  myCreate.showMore = -1;
}
function onClick(e: Favorite) {
  curSelectedFav.value = e
  myCreate.curFocus = e.fid;
  myCreate.curFid = e.fid
  onGetFavorVideoVo(myCreate.curFid, 1, curRegularColumn.value)
}
async function onGetFavoriteList(uid: number) {
  try {
    const { data } = await getFavoriteList({ uid: uid, current: 1, size: 100 })
    favList.value = data.records
    if (favList.value.length > 0) {
      myCreate.curFid = favList.value[0].fid
      myCreate.curFocus = myCreate.curFid
      curSelectedFav.value = favList.value[0]
      onGetFavorVideoVo(myCreate.curFid, 1, curRegularColumn.value)
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('无法拉取收藏夹列表！')
  }
}
async function onGetFavorVideoVo(fid: number, cur: number, sort: string) {
  try {
    const { data } = await getFavorVideoVo(fid, cur, sort);
    curVideoVoList.value = data.records;
    curTotal.value = data.total;
  } catch (error) {
    console.log(error)
    ElMessage.error('无法获取视频列表！')
  }
}
//删除
async function onRemove(fid: number) {
  try {
    const q = { fid: fid, isDelete: 1 }
    favList.value.some((e, index) => {
      if (e.fid == fid) {
        favList.value[index].isDelete = 1;
      }
    })
    await updateFavor(q);
  } catch (error) {
    console.log(error)
  }
}
//新建收藏夹
const onAddClick = () => {
  if (favList.value.length >= 100) {
    ElMessage.warning('收藏夹数量已达上限！')
    return;
  }
  dialog.change = true;
  modify.isModify = false;
  resetModifyForm(null)
}
async function beforeAddFavor() {
  dialog.change = false;
  try {
    let query = {
      fid: 0,
      uid: userUid.value,
      type: 2,
      visible: modify.isOpen ? 1 : 0,
      cover: null,
      title: modify.favListName,
      description: modify.intro,
      count: 0,
      isDelete: 0
    }
    if (selectedFile.value == null) {//判断是否需要上传封面
      onAddFavorite(query)
    } else {
      const res = await onUploadCover(selectedFile.value)
      if (res.code == 200) {
        query.cover = res.data;
        onAddFavorite(query)
      }
    }
    selectedFile.value = null
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败！')
  }
}
async function onAddFavorite(query: Favorite) {
  try {
    const res = await addFavorite(query)
    if (res.code == 200) onGetFavoriteList(userUid.value)
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败！')
  }
}
//编辑信息
const onModifyClick = (e: Favorite) => {
  dialog.change = true;
  modify.isModify = true;
  resetModifyForm(e)
}
async function beforeUpdateFavor() {
  dialog.change = false;
  try {
    let query = {
      fid: modify.fid,
      visible: modify.isOpen ? 1 : 0,
      cover: null,
      title: modify.favListName,
      description: modify.intro,
    }
    //判断是否需要修改封面图片
    if (selectedFile.value == null) {
      onUpdateFavorite(query)
    } else {
      const res = await onUploadCover(selectedFile.value)
      if (res.code == 200) {
        query.cover = res.data;
        onUpdateFavorite(query)
      }
    }
    selectedFile.value = null
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败！')
  }
}
async function onUpdateFavorite(params: FavoriteUpdateVo) {
  try {
    const res = await updateFavor(params)
    if (res.code == 200) onGetFavoriteList(userUid.value)
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败！')
  }
}
/**
 * @description: 分页控件
 */
const currentPage = ref(1);
const pageSize = ref(20);
const size = ref<ComponentSize>("default");
const curTotal = ref<number>(0);
const pageChange = (val: number) => {
  currentPage.value = val;
  onGetFavorVideoVo(myCreate.curFid, currentPage.value, curRegularColumn.value)
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
  { id: 1, name: "音乐", count: 10 },
  { id: 2, name: "娱乐", count: 1 },
  { id: 3, name: "体育", count: 12 }
];
//收藏夹视频排序规则列表
const favVideoArrange: Regular[] = [
  { id: 1, tag: "最近收藏", column: 'time' },
  { id: 2, tag: "最多播放", column: 'play' },
  { id: 3, tag: "最新投稿", column: 'upload_date' }
];
//当前收藏夹视频排序规则tag
const curRegularTag = ref("最近收藏");
const curRegularColumn = ref("time");
const closeDropdown2 = ref<DropdownInstance>();
function onRegularClick(command: string, col: string) {
  curRegularTag.value = command;
  curRegularColumn.value = col
  //关闭下拉框
  if (!closeDropdown2.value) return;
  closeDropdown2.value.handleClose();
  onGetFavorVideoVo(myCreate.curFid, 1, curRegularColumn.value)
}
/**
 * @description: 移动或复制
 */
const dialog = reactive({//对话框
  change: false,//这个控制的是新增和修改收藏夹的对话框
  //以下两个变量控制对话框确定按钮点击后的走向
  //如果move为true，copy为false，则启动批量移动视频
  //反之启动批量复制视频
  //同时还控制目标收藏夹对话框的启停，任意一个为true都会打开对话框
  move: false,
  copy: false,
  title: "",
  vids: [],
  cur: -1,
  pre: -1
});
function singleSelect(title: string, copy: boolean, move: boolean, vid: number) {
  dialog.copy = copy;
  dialog.move = move;
  dialog.title = title;
  dialog.cur = myCreate.curFocus
  dialog.pre = myCreate.curFocus
  dialog.vids = []
  dialog.vids.push(vid)
}
function onBatchConfirmClick() {
  const isCopy = dialog.copy && !dialog.move;
  const isMove = dialog.move && !dialog.copy;
  dialog.copy = dialog.move = false;
  exitBatchOperation()
  if (dialog.cur == dialog.pre) return;//新旧收藏夹一样则不用发送请求
  if (isCopy) {
    onBatchCopy()
  } else if (isMove) {
    onBatchMove()
  }
}
//移动或复制视频
const c_m = computed(() => {
  return dialog.copy || dialog.move;
});
async function onBatchMove() {
  try {
    const res = await batchMove({ vids: dialog.vids, preFid: dialog.pre, newFid: dialog.cur })
    if (res.code == 200) {
      favList.value.forEach((e) => {
        if (e.fid == dialog.pre) e.count -= dialog.vids.length;
        else if (e.fid == dialog.cur) e.count += res.data;
      })
      onGetFavorVideoVo(myCreate.curFid, currentPage.value, curRegularColumn.value)
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败!')
  }
}
async function onBatchCopy() {
  try {
    const res = await batchCopy({ vids: dialog.vids, preFid: dialog.pre, newFid: dialog.cur })
    if (res.code == 200) {
      favList.value.forEach((e) => {
        if (e.fid == dialog.cur) e.count += res.data;
      })
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败!')
  }
}
/**
 * @description: 批量操作
 */
const batchOperation = reactive({
  state: false,//是否开启批量操作
  selectedCount: 0,
  selectAll: false,//是否全选
  selected: new Set<number>(),
});
function batchSelect(title: string, copy: boolean, move: boolean) {
  dialog.copy = copy;
  dialog.move = move;
  dialog.title = title;
  dialog.cur = myCreate.curFocus
  dialog.pre = myCreate.curFocus
  fillDialogVids()
}
/**
 * @description: 将1个或多个视频取消收藏。步骤：
 * 1.将所选视频ID塞入dialog.vids列表
 * 2.发送请求
 * 3.修改收藏夹信息，减去对应视频数量。
 * 4.发送请求更新视频列表
 * 5.退出批量操作模式
 */
function batchUnCollectClick() {
  dialog.cur = myCreate.curFocus
  dialog.pre = myCreate.curFocus
  fillDialogVids();
  onBatchUnCollect();
  exitBatchOperation()
}
function unCollect(vid: number) {
  dialog.cur = myCreate.curFocus
  dialog.pre = myCreate.curFocus
  dialog.vids = [];
  dialog.vids.push(vid);
  onBatchUnCollect();
}
async function onBatchUnCollect() {
  if (dialog.vids.length == 0) return;
  try {
    const res = await batchUnCollect({ vids: dialog.vids, preFid: dialog.pre, newFid: 0 })
    if (res.code == 200) {
      favList.value.forEach((e) => {
        if (e.fid == dialog.pre) e.count -= dialog.vids.length;
      })
      onGetFavorVideoVo(myCreate.curFid, currentPage.value, curRegularColumn.value)
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败！')
  }
}
function fillDialogVids() {
  dialog.vids = [];
  batchOperation.selected.forEach(id => {
    dialog.vids.push(id)
  })
}
function exitBatchOperation() {
  batchOperation.state = false;
  batchOperation.selectAll = false;
  batchOperation.selected.clear();
}
function allSelect() {//全选
  batchOperation.selectAll = !batchOperation.selectAll;
  const t = curVideoVoList.value;
  if (batchOperation.selectAll) {
    for (const k in t) {
      batchOperation.selected.add(t[k].vid);
    }
  } else {
    batchOperation.selected.clear();
  }
}
function select(e: number) {//单选
  if (batchOperation.selected.has(e)) {
    batchOperation.selected.delete(e);
  } else {
    batchOperation.selected.add(e);
  }
}

async function onGetUserInfo(uid: number) {
  try {
    const { data } = await getUserInfoByUid({ uid: uid })
    ui.value = data
    onGetFavoriteList(userUid.value)
  } catch (error) {
    console.log(error)
    ElMessage.error('无法获取该用户信息！')
  }
}
onMounted(() => {
  userUid.value = geneId(route.query.uid)
  if (userStore.token && userStore.userInfo.uid == userUid.value) {
    ui.value = userStore.userInfo
    onGetFavoriteList(userUid.value)
  } else {
    //发请求获取用户信息
    onGetUserInfo(userUid.value)
  }
})
</script>
<style scoped lang="less">
@import "@/styles/UserPage/index.less";
@import "@/styles/UserPage/fav.less";
</style>