<template>
  <div class="col-full flex-row">
    <div class="fav-sidenav rpos">
      <div class="nav-container">
        <div class="nav-title rpos">
          <span class="text">我的关注</span>
          <span @click="wait" title="创建新分组" class="i-icon icon-add"></span>
        </div>
        <div class="follow-list-container rpos">
          <ul class="follow-list">
            <li class="follow-item nto rpos" @mouseenter="curHover = 0" @mouseleave="curHover = -1"
              :style="curFocus == 0 ? 'background-color:#00a1d6' : curHover == 0 ? 'background-color:#e3e5e7' : ''">
              <span class="i-icon icon-follow-all"
                :style="curFocus == 0 ? 'background-position: -86px -856px;' : ''"></span>
              <a @click="onFollowClick(0, '全部关注')" class="text nto"
                :style="curFocus == 0 ? 'color:#fff' : curHover == 0 ? 'color:#00aeec' : ''">全部关注</a>
              <span class="num" :style="curFocus == 0 ? 'color:#fff' : ''">{{ totalFollow }}</span>
            </li>
            <li class="follow-item nto rpos" @mouseenter="curHover = 1" @mouseleave="curHover = -1"
              :style="curFocus == 1 ? 'background-color:#00a1d6' : curHover == 1 ? 'background-color:#e3e5e7' : ''">
              <span class="i-icon icon-follow-special"></span>
              <a @click="wait" class="text nto"
                :style="curFocus == 1 ? 'color:#fff' : curHover == 1 ? 'color:#00aeec' : ''">特别关注</a>
              <span class="num">0</span>
            </li>
            <li class="follow-item nto rpos" @mouseenter="curHover = 2" @mouseleave="curHover = -1"
              :style="curFocus == 2 ? 'background-color:#00a1d6' : curHover == 2 ? 'background-color:#e3e5e7' : ''">
              <span class="i-icon icon-follow-silent"></span>
              <a @click="wait" class="text nto"
                :style="curFocus == 2 ? 'color:#fff' : curHover == 2 ? 'color:#00aeec' : ''">悄悄关注</a>
              <span class="num">0</span>
            </li>
            <li class="follow-item nto rpos" @mouseenter="curHover = 3" @mouseleave="curHover = -1"
              :style="curFocus == 3 ? 'background-color:#00a1d6' : curHover == 3 ? 'background-color:#e3e5e7' : ''">
              <span class="i-icon icon-follow-default"></span>
              <a @click="wait" class="text nto"
                :style="curFocus == 3 ? 'color:#fff' : curHover == 3 ? 'color:#00aeec' : ''">默认分组</a>
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
            <li class="follow-item nto rpos" @mouseenter="curHover = 4" @mouseleave="curHover = -1"
              :style="curFocus == 4 ? 'background-color:#00a1d6' : curHover == 4 ? 'background-color:#e3e5e7' : ''">
              <span class="i-icon icon-follow-fans"
                :style="curFocus == 4 ? 'background-position: -86px -984px;' : ''"></span>
              <a @click="onFansClick(4, '我的粉丝')" class="text"
                :style="curFocus == 4 ? 'color:#fff' : curHover == 4 ? 'color:#00aeec' : ''">我的粉丝</a>
              <span class="num" :style="curFocus == 4 ? 'color:#fff' : ''">{{ totalFans }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fav-main rops">
      <div class="follow-header">
        <div class="breadcrumb rpos flex-row-ac jc-spb">
          <p class="item">{{ curTag }}</p>
          <div class="flex-row-ac"><i class="i-icon icon-multiple"></i></div>
        </div>
      </div>
      <div class="follow-content rpos">
        <div class="no-data flex-row jcc" v-show="curUserList.length == 0">
          <NoData :message1="'你还没有该分组的用户哦~'"></NoData>
        </div>
        <div class="content">
          <ul class="relation-list">
            <li class="list-item" v-for="e in curUserList" v-show="e.status == 0">
              <router-link :to="`/user_page/${e.uid}`" class="cover-container" target="_blank">
                <img :src="e.avatar" alt="" style="width: 100%;height: 100%;object-fit: cover;">
              </router-link>
              <div class="content rpos">
                <router-link :to="`/user_page/${e.uid}`" class="title nto" target="_blank">
                  <span class="fans-name">{{ e.nickname }}</span>
                </router-link>
                <p class="auth-description nto">{{ e.description == '' || e.description ==
                  null ? '[该用户暂无个性标签]' : e.description }}</p>
                <div class="fans-action flex-row-ac">
                  <el-dropdown ref="closeDropdown" trigger="hover">
                    <div class="fans-action-follow flex-row-ac" v-show="curMode == 0 && e.role == 0">
                      <i class="iconfont icon-caidan"></i>
                      <span class="fans-action-text">已关注</span>
                    </div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <div @click="wait" class="be-dropdown-item">设置分组</div>
                        <div class="be-dropdown-item" @click="onUnFollowClick(e.uid)">取消关注</div>
                      </div>
                    </template>
                  </el-dropdown>
                  <el-dropdown ref="closeDropdown" trigger="hover">
                    <div class="fans-action-follow rpos" v-show="e.role == 1">
                      <i class="iconfont icon-caidan"></i>
                      <span class="fans-action-text">已互粉</span>
                    </div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <div @click="wait" class="be-dropdown-item">设置分组</div>
                        <div class="be-dropdown-item" @click="onUnFollowClick(e.uid)">取消关注</div>
                      </div>
                    </template>
                  </el-dropdown>
                  <div class="fans-action-btn" v-show="curMode == 1 && e.role == 0" @click="onFollowBtnClick(e.uid)">
                    关注TA</div>
                  <el-dropdown ref="closeDropdown" trigger="hover">
                    <div class="be-dropdown-trigger"><i class="iconfont icon-gengduo1"></i></div>
                    <template #dropdown>
                      <div class="be-dropdown-menu">
                        <router-link :to="{ name: 'MC_whisper', query: { targetId: e.uid } }"
                          class="be-dropdown-item">发消息</router-link>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </li>
          </ul>
          <div class="be-pager flex-row jcc" v-show="curUserList.length > 0">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" background
              layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/styles/UserPage/index.less";
import NoData from "@/components/NoData.vue";
import { getFollowList, getFansList } from '@/api/UserPage/index'
import { ref, onMounted } from "vue";
import { User } from '@/api/Models'
import { ComponentSize, ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { geneId } from "@/util";
import { useUserStore } from "@/util/userStore";
import { unFollow, follow } from '@/api/Video/index'

const userStore = useUserStore()
const route = useRoute()

const curMode = ref<number>(0)//当前显示模式，0显示关注，1显示粉丝
const curFocus = ref<number>(0)
const curHover = ref<number>(-1)
const curTag = ref<string>('全部关注')
const curUserList = ref<User[]>([])
const totalFollow = ref<number>(0)
const totalFans = ref<number>(0)

function onFollowClick(type: number, tag: string) {//打开关注列表
  curFocus.value = type;
  curTag.value = tag;
  curMode.value = 0;
  onGetFollowList(1)
}
function onFansClick(type: number, tag: string) {
  curFocus.value = type;
  curTag.value = tag;
  curMode.value = 1;
  onGetFansList(1)
}
//分页控件
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref<number>(0)
const size = ref<ComponentSize>("default");
const handleCurrentChange = (val: number) => {
  if (curMode.value == 0) onGetFollowList(val);
  else onGetFansList(val);
};
//敬请期待！
function wait() {
  ElMessage.warning('敬请期待!')
}
function onUnFollowClick(uid: number) {
  if (curMode.value == 0) {
    curUserList.value.some(e => {
      if (e.uid == uid) e.status = 2;
    })
    onUnfollow(userStore.userInfo.uid, uid)
  } else {
    curUserList.value.some(e => {
      if (e.uid == uid) e.role = 0;
    })
    onUnfollow(userStore.userInfo.uid, uid)
  }
}
function onFollowBtnClick(uid: number) {//关注某人的按钮
  curUserList.value.some(e => {
    if (e.uid == uid) e.role = 1;
  })
  onFollow(uid);
}
async function onFollow(ee: number) {
  try {
    await follow({ followerId: userStore.userInfo.uid, followeeId: ee })
  } catch (error) {
    ElMessage.error('关注失败！')
  }
}
async function onUnfollow(er: number, ee: number) {
  try {
    await unFollow({ followerId: er, followeeId: ee })
  } catch (error) {
    ElMessage.error('操作失败！')
  }
}
async function onGetFollowList(curPage: number) {
  try {
    const res = await getFollowList({
      followeeId: -1,
      followerId: userStore.userInfo.uid,
      current: curPage, size: 15, sortField: 'created_at'
    })
    curUserList.value = res.data.records
    total.value = res.data.total
    totalFollow.value = total.value
    console.log(res.data.records)
  } catch (error) {
    console.log(error)
    ElMessage.error('获取关注列表失败！')
  }
}
async function onGetFansList(curPage: number) {
  try {
    const res = await getFansList({
      followeeId: userStore.userInfo.uid,
      followerId: -1,
      current: curPage, size: 15, sortField: 'created_at'
    })
    curUserList.value = res.data.records
    total.value = res.data.total
    totalFans.value = total.value
  } catch (error) {
    console.log(error)
    ElMessage.error('获取关注列表失败！')
  }
}
onMounted(() => {
  curMode.value = geneId(route.query.mode)
  console.log(curMode.value)
  if (curMode.value == 0) {
    onFollowClick(0, '我的关注')
  } else {
    onFansClick(4, '我的粉丝')
  }
})
</script>

<style lang="less" scoped>
@import '@/styles/UserPage/fans.less';
</style>