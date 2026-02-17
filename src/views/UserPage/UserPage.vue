<template>
  <div class="user-background">
    <div class="head"></div>
    <div class="page-head">
      <div class="page-head-bgc rpos">
        <img src="../../assets/images/user_page_bcg.webp" alt="" width="100%" height="192px">
        <div class="h-info flex-row pos-left-bottom">
          <div class="avatar-container rpos">
            <img :src="userInfo.avatar" alt="">
            <router-link :to="{ name: 'UserAccount' }" class="avatar-cover pos-left-up"
              v-show="userStore.userInfo.uid == geneId(route.params.uid.toString())">
              更换头像
            </router-link>
          </div>
          <div class="h-basic flex-col-al">
            <div class="name-list flex-row-ac">
              <span id="h-name">{{ userInfo.nickname }}</span>
              <span id="h-uid">uid: {{ geneId(route.params.uid.toString()) }}</span>
              <!-- <span id="gender"></span> -->
              <!-- TODO -->
              <!-- <div class="h-viptype">大会员</div> -->
            </div>
            <div class="h-basic-spacing">
              <!-- TODO -->
              <!-- <h4 class="h-sign">显示编辑后的个性签名</h4> -->
              <input id="h-sign" type="text" :disabled="userStore.userInfo.uid != geneId(route.params.uid.toString())"
                :placeholder="userStore.userInfo.uid == geneId(route.params.uid.toString()) ? '编辑个性标签' : '该用户暂无个性标签'"
                @change="descriptionChange" v-model="descriptionInput" class="space-input">
            </div>
          </div>
        </div>
        <div class="h-action flex-row" v-show="userInfo.uid != 0 && userInfo.uid != userStore.userInfo.uid">
          <div class="h-follow" v-show="isFollow == 0" @click="onFollow">关注</div>
          <router-link :to="{ name: 'MC_whisper', query: { targetId: geneId(route.params.uid.toString()) } }"
            class="h-message" target="_blank">发消息</router-link>
          <el-dropdown trigger="click">
            <a class="h-message" v-show="isFollow == 1">已关注</a>
            <template #dropdown>
              <div class="be-dropdown-menu">
                <div class="be-dropdown-item">设置分组</div>
                <div class="be-dropdown-item" @click="onUnfollow">取消关注</div>
              </div>
            </template>
          </el-dropdown>
          <div class="h-add-to-black"> <i class="iconfont icon-gengduo1"></i> </div>
        </div>
      </div>
    </div>
    <div class="navigator">
      <div class="wrapper flex-row jc-spb">
        <div class="n-tab-links rpos flex-row-ac jc-start">
          <router-link @click="onNavOperate(item.id, true)" v-for="item in UserNavList"
            @mouseenter="onNavOperate(item.id, false)" @mouseleave="onNavOperate(curNavTag, false)" :key="item.id"
            :to="{ path: item.href, query: { uid: route.params.uid.toString() } }"
            :class="item.id == curNavTag ? 'flex-row-ac focus' : 'flex-row-ac'">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span class="n-text">{{ item.tag }}</span>
          </router-link>
          <div class="n-search">
            <input placeholder="搜索视频、动态" ref="navSearch" @keydown="onSearchInputStop"
              @focus="changeStyle(navSearch, new Map<string, string>([['border', '1px solid #00aeec']]))"
              @blur="changeStyle(navSearch, new Map<string, string>([['border', '1px solid #ccd0d7']]))" />
            <span @click="wait"><i class="iconfont icon-faxianweixuanzhongxuanzhong"></i></span>
          </div>
          <div ref="cs" class="n-cursor"></div>
        </div>
        <div class="n-statistics flex-row-ac">
          <div class="n-data flex-col-ac jcc" @click="toFans(0)">
            <p class="n-data-k">关注数</p>
            <p class="n-data-v">{{ formatCount(userStats.followCount) }}</p>
          </div>
          <div class="n-data flex-col-ac jcc" @click="toFans(1)">
            <p class="n-data-k">粉丝数</p>
            <p class="n-data-v">{{ formatCount(userStats.fansCount) }}</p>
          </div>
          <div class="n-data flex-col-ac jcc">
            <p class="n-data-k">获赞数</p>
            <p class="n-data-v">{{ formatCount(userStats.likeCount) }}</p>
          </div>
          <div class="n-data flex-col-ac jcc">
            <p class="n-data-k">播放数</p>
            <p class="n-data-v">{{ formatCount(userStats.playCount) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="total-content">
      <router-view></router-view>
      <div class="flex-row jc-spb" v-show="curNavTag == 1">
        <div class="col-1">
          <div class="section i-pin-v">
            <div class="i-pin-part flex-row-ac">
              <div class="list-create flex-col-ac jcc" @click="wait">
                <div class="icon"><i class="iconfont icon-tianjia"></i></div>
                <div class="text">设置置顶视频</div>
              </div>
              <div class="no-video"><img src="../../assets/images/无置顶视频.png" alt="" width="100%" height="100%"></div>
            </div>
          </div>
          <div class="section video">
            <h3 class="section-title rpos">
              <a href="" class="t">TA的视频</a>
              <span class="count">{{ formatCount(userStats.videoCount) }}</span>
              <div class="be-tab">
                <ul>
                  <li v-for="e in regularList" :style="e.column == curRegular ? 'color: #00aeec' : 'color: #000'"
                    @click="onRegularChange(e.column)">{{
                      e.tag
                    }}
                  </li>
                </ul>
              </div>
              <router-link :to="`/user_page/${route.params.uid.toString()}/submit`" @click="onNavOperate(3, true)"
                class="more">更多<i class="iconfont icon-gengduo"></i></router-link>
            </h3>
            <div class="no-data flex-row jcc">
              <NoData :message1="'该用户尚未发布过视频'" v-show="userStats.videoCount == 0"></NoData>
            </div>
            <div class="v-content" v-show="userStats.videoCount > 0">
              <VideoCard v-for="e in videoList" :width="'100%'" :height="'100%'" :videoVo="e" :img-height="'100px'"
                :datetype="DateStringType.M_D"></VideoCard>
            </div>
          </div>
        </div>
        <div class="col-2 flex-col">
          <div class="section rpos">
            <div class="i-m-r1">
              <router-link :to="{ name: 'dataCenter' }" class="i-m-title flex-row-ac jcc">
                <span></span>
                <i class="iconfont icon-gengduo"></i>
              </router-link>
            </div>
            <div class="i-m-r2 flex-row-ac jcc">
              <router-link :to="{ name: 'upload' }" class="i-m-upload">视频投稿</router-link>
              <router-link :to="{ name: 'articleManage' }">内容管理</router-link>
            </div>
          </div>
          <div class="i-nna section">
            <h3 class="section-title">公告</h3>
            <div class="content rpos">
              <textarea :disabled="userStore.userInfo.uid != geneId(route.params.uid.toString())" type="textarea"
                :placeholder="userStore.userInfo.uid == geneId(route.params.uid.toString()) ? '编辑我的空间公告' : '暂无公告'"
                maxlength="150" rows="4" @focus="changeStyle(wordCount, new Map<string, string>([['opacity', '1']]))"
                @blur="changeStyle(wordCount, new Map<string, string>([['opacity', '0']]))" @change="noticeChange"
                v-model="noticeTextArea">
          </textarea>
              <div class="be-input-word-counter" ref="wordCount">{{ `${noticeWordCount}/150` }}</div>
            </div>
          </div>
          <PersonalInfoCard :uid="`${route.params.uid.toString()}`" :ui="userInfo" :us="userStats"></PersonalInfoCard>
        </div>
      </div>
    </div>
    <!-- <el-dialog>置顶视频
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import PersonalInfoCard from "@/components/UserPage/PersonalInfoCard.vue";

import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router'

import { formatCount, changeStyle, geneId } from "@/util/index";
import { UserNav, Regular, defaultUserStats, UserStatsQueryVo, defaultUser, UserInfoQueryVo } from "@/api/UserPage/types";
import { UserStats, User, VideoVo, VideoQueryVo, Follow } from "@/api/Models";
import VideoCard from "@/components/VideoCard.vue";
import NoData from "@/components/NoData.vue";
import { DateStringType } from "@/api/enums"
import {
  getUserStatsByUid, getUserInfoByUid,
  getVideoListOfUser, updateNotice,
  updateDescription, updateMulti
} from "@/api/UserPage";
import { getFollow, follow, unFollow } from '@/api/Video';
import { useUserStore } from "@/util/userStore";
import { ElMessage } from "element-plus";

// 获取当前路由对象
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
//聚焦时边框变蓝
const navSearch = ref<HTMLElement | null>(null);
const curNavTag = ref(1);
const cs = ref<HTMLElement | null>(null);
const userStats = ref<UserStats>(defaultUserStats)
const videoList = ref<VideoVo[]>([])
const userInfo = ref<User>(defaultUser)
const descriptionInput = ref<string>("")
const wordCount = ref<HTMLElement | null>(null);
const noticeWordCount = ref<number>(0)
const noticeTextArea = ref<string>("")
const navCursor = {
  1: { length: "51px", left: "0" },
  2: { length: "51px", left: "81px" },
  3: { length: "51px", left: "162px" },
  4: { length: "90px", left: "243px" },
  5: { length: "51px", left: "363px" },
  99: { length: "51px", left: "0" },
};
const UserNavList: UserNav[] = [
  {
    id: 1,
    tag: "主页",
    icon: "#icon-shouyexuanzhong-copy",
    href: `/user_page/${route.params.uid.toString()}`,
  },
  {
    id: 2,
    tag: "动态",
    icon: "#icon-dongtaixuanzhong-copy",
    href: `/user_page/${route.params.uid.toString()}/dynamic`
  },
  {
    id: 3,
    tag: "投稿",
    icon: "#icon-bofangqi-bofangxiaodianshi-copy",
    href: `/user_page/${route.params.uid.toString()}/submit`
  },
  {
    id: 4,
    tag: "合集和列表",
    icon: "#icon-heji-copy",
    href: `/user_page/${route.params.uid.toString()}/series`,
  },
  {
    id: 5, tag: "收藏", icon: "#icon-shoucangtianchong-copy",
    href: `/user_page/${route.params.uid.toString()}/favList`
  },
];
function onNavOperate(id: number, changId: boolean) {
  if (changId) {
    curNavTag.value = id;
  }
  changeStyle(
    cs.value,
    new Map<string, string>([
      ["width", navCursor[id]["length"]],
      ["left", navCursor[id]["left"]],
    ])
  );
}
function wait() {
  ElMessage.warning('敬请期待！')
}
//跳转关注/粉丝界面
function toFans(mode: number) {
  router.push({
    path: `/user_page/${geneId(route.params.uid)}/fansList`,
    query: {
      uid: route.params.uid.toString(),
      mode: mode
    }
  })
  onNavOperate(99, true)
}
function onRegularChange(id: string) {
  curRegular.value = id
  onGetVideoListOfUser({
    size: 10,
    current: 1,
    uid: geneId(route.params.uid.toString()),
    sortField: curRegular.value
  })
}
function noticeChange() {
  onUpdateNotice({
    uid: userStore.userInfo.uid,
    notice: noticeTextArea.value
  })
}
function descriptionChange() {
  onUpdateDescription({
    uid: userStore.userInfo.uid,
    description: descriptionInput.value
  })
}
function onSearchInputStop(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    (event.target as HTMLInputElement).blur();
    wait();
  }
}
//视频排序规则
const curRegular = ref<string>("upload_date");
const regularList: Regular[] = [
  { id: 1, tag: "最新发布", column: "upload_date" },
  { id: 2, tag: "最多播放", column: "play" },
  { id: 3, tag: "最多收藏", column: "collect" }
];
async function onGetUserInfoByUid(query: UserStatsQueryVo) {
  try {
    const res = await getUserInfoByUid(query)
    userInfo.value = res.data
    descriptionInput.value = res.data.description
  } catch (error) {
    console.log(error)
  }
}
async function onGetUserStatsByUid(query: UserStatsQueryVo) {
  try {
    const res = await getUserStatsByUid(query)
    userStats.value = res.data
    if (res.data.notice) {
      noticeTextArea.value = res.data.notice
      noticeWordCount.value = noticeTextArea.value.length
    } else {
      noticeWordCount.value = 0
    }
  } catch (error) {
    console.log(error)
  }
}
async function onGetVideoListOfUser(query: VideoQueryVo) {
  try {
    const res = await getVideoListOfUser(query)
    videoList.value = res.data.records
  } catch (error) {
    console.log(error)
  }
}
async function onUpdateDescription(query: UserInfoQueryVo) {
  try {
    const res = await updateDescription(query)
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '编辑成功！'
      })
    }
  } catch (error) {
    console.log(error)
  }
}
async function onUpdateNotice(query: UserStatsQueryVo) {
  try {
    const res = await updateNotice(query)
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '编辑成功！'
      })
    }
  } catch (error) {
    console.log(error)
  }
}
async function onUpdateMulti(params: UserStatsQueryVo) {
  try {
    await updateMulti(params)
  } catch (error) {
    console.log(error)
  }
}
/**
 * @description: 关注管理
 */
const isFollow = ref<number>(-1);
async function onGetFollow(query: Follow) {
  try {
    const res = await getFollow(query)
    if (res.data == null) isFollow.value = 0;
    else isFollow.value = 1;
  } catch (error) {
    ElMessage.error('获取关注信息失败！')
  }
}
async function onFollow() {
  try {
    const res = await follow({ followerId: userStore.userInfo.uid, followeeId: geneId(route.params.uid.toString()) })
    if (res.code == 200) isFollow.value = 1;
  } catch (error) {
    ElMessage.error('关注失败！')
  }
}
async function onUnfollow() {
  try {
    const res = await unFollow({ followerId: userStore.userInfo.uid, followeeId: geneId(route.params.uid.toString()) })
    if (res.code == 200) isFollow.value = 0;
  } catch (error) {
    ElMessage.error('操作失败！')
  }
}
onMounted(() => {
  onGetUserInfoByUid({ uid: geneId(route.params.uid.toString()) })
  onGetUserStatsByUid({ uid: geneId(route.params.uid.toString()) })
  onGetVideoListOfUser({
    size: 10,
    current: 1,
    uid: geneId(route.params.uid.toString()),
    sortField: curRegular.value
  })
  onUpdateMulti({ uid: geneId(route.params.uid.toString()) })
  if (geneId(route.params.uid.toString()) != userStore.userInfo.uid) {
    onGetFollow({ followeeId: geneId(route.params.uid.toString()), followerId: userStore.userInfo.uid });
  }
  nextTick(() => {
    if (route.path.endsWith('/dynamic')) {
      onNavOperate(2, true)
    } else if (route.path.endsWith('/submit')) {
      onNavOperate(3, true)
    } else if (route.path.endsWith('/series')) {
      onNavOperate(4, true)
    } else if (route.path.endsWith('/favList')) {
      onNavOperate(5, true)
    } else if (route.path.endsWith('/fansList')) {
      onNavOperate(99, true)
    }
  })
});
watch(noticeTextArea, (newValue: any) => {
  noticeWordCount.value = newValue.length
});
</script>
<style lang="less" scoped>
//这么写可以避免外部导入的less造成样式冲突
@import '@/styles/UserPage/index.less';
</style>