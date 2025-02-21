<template>
  <div class="video-container-v1 flex-row jcc" ref="vcv">
    <div class="left-container scroll-sticky">
      <div class="video-info-container win">
        <div class="video-info-title">
          <div class="video-info-title-inner flex-row-ac">
            <h1 class="video-title nto">{{ video.title }}</h1>
          </div>
          <div class="show-more">
            <div class="show-more-btn flex-row" @mouseenter="showTitlePanel = true"
              @mouseleave="showTitlePanel = false"><i class="iconfont icon-arrow"></i></div>
          </div>
          <div class="overflow-panel" v-show="showTitlePanel">
            <div class="title">{{ video.title }}</div>
            <div class="video-info-detail-list info pop-mode flex-row-ac">
              <div class="view item flex-row-ac">
                <i class="iconfont icon-bofangshu v-icon"></i>
                <div class="nto">{{ formatCount(videoStats.play) }}</div>
              </div>
              <div class="dm item">
                <i class="iconfont icon-danmushu v-icon"></i>
                <div class="nto">{{ formatCount(videoStats.danmu) }}</div>
              </div>
              <div class="pubdate-ip item flex-row-ac">
                <div class="nto">{{ video.uploadDate }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="video-info-meta flex-row-ac">
          <div class="video-info-detail-list video-info-detail-content flex-row-ac">
            <div class="view item flex-row-ac">
              <i class="iconfont icon-bofangshu v-icon"></i>
              <div class="nto">{{ formatCount(videoStats.play) }}</div>
            </div>
            <div class="dm item">
              <i class="iconfont icon-danmushu v-icon"></i>
              <div class="nto">{{ formatCount(videoStats.danmu) }}</div>
            </div>
            <div class="pubdate-ip item flex-row-ac">
              <div class="not">{{ video.uploadDate }}</div>
            </div>
            <!-- <div class="copyright item"></div> -->
          </div>
        </div>
      </div>
      <Player @get-instance="getInstance" :dynamicUrl="video.videoUrl"
        :uid="userStore.token ? userStore.userInfo.uid : -1" :vid="video.vid" :danmu-list="danmuList"></Player>
      <div class="video-toolbar-container flex-row-ac jc-spb">
        <div class="video-toolbar-left flex-row-ac">
          <div class="video-toolbar-left-main flex-row-ac">
            <div class="toolbar-left-item-wrap">
              <div title="点赞" class="video-like video-toolbar-left-item flex-row-ac"
                @click="interact(Interaction.LIKE)">
                <i class="iconfont icon-dianzan_kuai" :style="userVideo.love == 1 ? 'color:#00aeec;' : ''"></i>
                <span class="nto" :style="userVideo.love == 1 ? 'color:#00aeec;' : ''">{{ formatCount(videoStats.good)
                }}</span>
              </div>
            </div>
            <div class="toolbar-left-item-wrap">
              <div title="投币" class="video-like video-toolbar-left-item flex-row-ac" @click="onCoinClick">
                <i class="iconfont icon-toubix" :style="userVideo.coin >= 1 ? 'color:#00aeec;' : ''"></i>
                <span class="nto" :style="userVideo.coin >= 1 ? 'color:#00aeec;' : ''">{{ formatCount(videoStats.coin)
                }}</span>
              </div>
            </div>
            <div class="toolbar-left-item-wrap">
              <div title="收藏" class="video-like video-toolbar-left-item flex-row-ac">
                <i class="iconfont icon-shoucangtianchong" :style="userVideo.collect == 1 ? 'color:#00aeec;' : ''"></i>
                <span class="nto" :style="userVideo.collect == 1 ? 'color:#00aeec;' : ''">{{
                  formatCount(videoStats.collect)
                }}</span>
              </div>
            </div>
            <div class="toolbar-left-item-wrap">
              <div title="分享" class="video-like video-toolbar-left-item flex-row-ac">
                <i class="iconfont icon-fenxiang1" :style="userVideo.share == 1 ? 'color:#00aeec;' : ''"></i>
                <span class="nto" :style="userVideo.share == 1 ? 'color:#00aeec;' : ''">{{ formatCount(videoStats.share)
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="video-toolbar-right flex-row-ac">
          <div class="video-tool-more">
            <el-dropdown trigger="click">
              <span class="dropdown-tag flex-row-ac">
                <i class="iconfont icon-gengduo1 more-operate"></i>
              </span>
              <template #dropdown>
                <div class="be-dropdown-menu">
                  <div class="be-dropdown-item">稿件举报</div>
                </div>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="video-desc-container">
        <div class="basic-desc-info" :style="showMoreIntro ? 'height:auto;' : 'height:84px;'">
          <span class="desc-info-text">{{ video.descr }}</span>
        </div>
        <div class="toggle-btn" @click="showMoreIntro = !showMoreIntro">
          <div class="toggle-btn-text">{{ showMoreIntro ? '展开更多' : '收起' }}</div>
        </div>
      </div>
      <div class="video-tag-container">
        <div class="video-tag-panel flex-row-ac" :style="showMoreTags ? 'height:auto;' : 'height:36px;'">
          <div class="video-tag-r">
            <div class="show-more-tags" @click="showMoreTags = !showMoreTags"
              :style="showMoreTags ? 'transform:rotate(180deg);' : ''">
              <i class="iconfont icon-arrow"></i>
            </div>
          </div>
          <div class="video-tag" v-for="e in video.tags.split(' ')">
            <div class="firstchannel-tag">
              <a class="tag-link">{{ e }}</a>
            </div>
          </div>
        </div>
      </div>
      <Comments ref="comments" v-if="userStore.token" :video-id="video.vid" :author-id="video.uid"></Comments>
      <div class="comment-unlogin" v-else>登录后查看评论</div>
    </div>
    <div class="right-container">
      <div class="right-container-inner">
        <div class="up-info-container flex-row-ac">
          <div class="up-info--left">
            <div class="up-avatar-wrap flex-row-ac jcc">
              <router-link :to="{name: 'UserPage', params: {uid: user.uid}}" class="up-avatar">
                <img :src="user.avatar" alt="">
              </router-link>
            </div>
          </div>
          <div class="up-info--right">
            <div class="up-info__detail">
              <div class="up-detail-top flex-row-ac">
                <router-link :to="{name: 'UserPage', params: {uid: user.uid}}" class="up-name nto">{{ user.nickname }}</router-link>
                <a class="send-msg flex-row-ac">
                  <i class="iconfont icon-sixin"></i>发消息
                </a>
              </div>
              <div class="up-description nto" title="up主简介">{{ user.description }}</div>
            </div>
            <div class="up-info__btn-panel flex-row">
              <!-- <div>充电</div> -->
              <div class="follow-btn follow flex-row-ac jcc" v-show="!upInfo.isFollow">
                <i class="iconfont icon-tianjia"></i>关注{{ upInfo.fansCount }}
              </div>
              <div class="follow-btn unfollow flex-row-ac jcc" v-show="upInfo.isFollow">
                <i class="iconfont icon-caidan"></i>已关注{{ upInfo.fansCount }}
              </div>
            </div>
          </div>
        </div>
        <DanmuBox :danmu-list="danmuList"></DanmuBox>
        <Collection></Collection>
      </div>
    </div>
    <div class="fixed-sidenav-storage" v-show="showTop">
      <div class="back-to-top-wrap" @click="backToTop">
        <div class="back-to-top flex-col-ac">
          <svg class="c-icon" aria-hidden="true">
            <use xlink:href="#icon-shouqixiao"></use>
          </svg>
          顶部
        </div>
      </div>
    </div>

    <el-dialog v-model="showCoin" width="430">
      <template #header="{ titleId }">
        <div class="my-header">
          <div :id="titleId" class="coin-title">给UP主投上<span>{{ coinCount }}</span>枚硬币</div>
        </div>
      </template>
      <div class="flex-row jc-spb">
        <div :class="coinCount == 1 ? 'mc-box left mc-box-ac' : 'mc-box left mc-box-unac'" @click="coinCount = 1">
          <div class="coin-run-box"
            :style="coinCount == 1 ? 'background-color: #fff;' : 'background-color: transparent;'">
            <img src="../../assets/images/22-coin-ani.png" alt=""
              :style="coinCount == 1 ? 'opacity: 1;' : 'opacity: 0;'">
          </div>
          <span class="c-num" :style="coinCount == 1 ? 'color:#00aeec;' : 'color:#9499a0;'">1硬币</span>
        </div>
        <div :class="coinCount == 2 ? 'mc-box right mc-box-ac' : 'mc-box right mc-box-unac'" @click="coinCount = 2">
          <div class="coin-run-box"
            :style="coinCount == 2 ? 'background-color: #fff;' : 'background-color: transparent;'">
            <img src="../../assets/images/33-coin-ani.png" alt=""
              :style="coinCount == 2 ? 'opacity: 1;' : 'opacity: 0;'">
          </div>
          <span class="c-num" :style="coinCount == 2 ? 'color:#00aeec;' : 'color:#9499a0;'">2硬币</span>
        </div>
      </div>
      <div class="coin-bottom">
        <span class="bi-btn" @click="interact(coinCount == 1 ? Interaction.COIN_ONE : Interaction.COIN_TWO)">确定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

import Comments from "@/components/Video/Comments.vue";
import Collection from '@/components/Video/Collection.vue';
import DanmuBox from '@/components/Video/DanmuBox.vue';
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Player from './Player.vue';

import '@/styles/Video/video.less'
import { formatCount, getFormatCurTime } from '@/util/index'
import { useUserStore } from '@/util/userStore'
import { Video, User, VideoStats, UserVideo, Danmu } from "@/api/Models";
import { getVideo, getUserInfo, getVideoStats, defaultUserInfo, defaultVideo, defaultVideoStats } from '@/api/index'
import { getInterAction, UserVideoQuery, interactWithoutPlay, getDanmuList } from '@/api/Video';
import Artplayer from 'artplayer';
import { DateStringType, Interaction } from '@/api/enums';

const userStore = useUserStore()
const route = useRoute()
const video = ref<Video>(defaultVideo)
const videoStats = ref<VideoStats>(defaultVideoStats)
const user = ref<User>(defaultUserInfo)
const showTitlePanel = ref(false);
const showCoin = ref<boolean>(false)
const comments = ref(null);
const coinCount = ref<number>(1)
const emit = defineEmits(['callLoginPanel']);
const userVideo = ref<UserVideo>({
  id: 0,
  uid: 0,
  vid: 0,
  play: 0,
  love: 0,
  unlove: 0,
  coin: 0,
  collect: 0,
  share: 0,
  playTime: "2100-15-15 15:15:15",
  loveTime: "2100-15-15 15:15:15",
  coinTime: "2100-15-15 15:15:15"
})
//是否展开简介
const showMoreIntro = ref(false);
//是否展开标签
const showMoreTags = ref(false);
//up主信息
const upInfo = reactive({
  isFollow: true,
  fansCount: "468万"
})
//是否显示返回顶部按钮
const showTop = ref(false)
const vcv = ref<HTMLElement | null>(null);
const danmuList = ref<Danmu[]>([])
function handleBodyScroll() {
  if (!showTop.value && window.scrollY > 800) {
    showTop.value = true
  }
  if (showTop.value && window.scrollY <= 800) {
    showTop.value = false
  }
}
function backToTop() {
  window.scrollTo(0, 0)
}
function geneVid(param: string | string[]): number {
  return parseInt(param.toString())
}
function getInstance(art: Artplayer) {
  console.log(art);
}
function interact(type: Interaction) {
  showCoin.value = false
  const time = new Date()
  const query: UserVideoQuery = {
    uid: userStore.userInfo.uid,
    vid: video.value.vid,
    actionType: type,
    actionTime: getFormatCurTime(time.getTime(), DateStringType.ALL)
  }
  onInteract(query)
}
function onCoinClick() {
  if (userVideo.value.coin >= 1) {
    interact(Interaction.COIN_ONE)
  } else {
    showCoin.value = true
  }
}

async function onGetDanmuList(vid: number | string) {
  try{
    const res = await getDanmuList(vid)
    danmuList.value = res.data
  }catch(error){
    console.log(error)
  }
}
async function onGetVideo(vid: number) {
  try {
    const { data } = await getVideo(vid)
    video.value = data
    onGetUserInfo(data.uid)
    onGetDanmuList(data.vid)
    if (userStore.token) {
      onGetInteraction({
        uid: userStore.userInfo.uid,
        vid: video.value.vid
      })
    }
  } catch (error) {
    ElMessage.error('获取视频失败！')
  }
}
async function onGetVideoStats(vid: number) {
  try {
    const { data } = await getVideoStats(vid)
    videoStats.value = data
  } catch (error) {
    ElMessage.error('获取视频数据失败！')
  }
}
async function onGetUserInfo(uid: number) {
  try {
    const { data } = await getUserInfo(uid)
    user.value = data
  } catch (error) {
    ElMessage.error('获取作者信息失败！')
  }
}
async function onGetInteraction(query: UserVideoQuery) {
  try {
    const { data } = await getInterAction(query)
    if (data) {
      userVideo.value = data
    }
  } catch (error) {
    ElMessage.error('获取交互信息失败！')
  }
}
async function onInteract(query: UserVideoQuery) {
  try {
    const res = await interactWithoutPlay(query)
    if (res.code == 200) {
      onGetInteraction({
        uid: userStore.userInfo.uid,
        vid: video.value.vid
      })
    }
  } catch (error) {
    ElMessage.error('获取交互信息失败！')
  }
}
onMounted(() => {
  window.addEventListener("scroll", handleBodyScroll)
  onGetVideo(geneVid(route.params.vid))
  onGetVideoStats(geneVid(route.params.vid))
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleBodyScroll);
});
</script>

<style lang="less" scoped>
@keyframes coin-run-animation {
  0% {
    transform: translate3d(0px, 0, 0);
  }

  100% {
    transform: translate3d(-2767px, 0, 0);
  }
}

.mc-box-unac {
  border: 2px dashed #ccd0d6;
}

.mc-box-ac {
  border: 2px solid #00aeec !important;
}

.coin-bottom {
  text-align: center;
  padding: 25px 0;

  .bi-btn {
    display: inline-block;
    padding: 4px 18px;
    background: var(--hover-blue);
    color: var(--white);
    font-size: 14px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .bi-btn:hover {
    background-color: #07bdff;
  }
}

.mc-box {
  display: inline-block;
  position: relative;
  margin-top: 20px;
  width: 160px;
  height: 230px;
  overflow: hidden;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;

  .coin-run-box {
    width: 120px;
    height: 206px;
    overflow: hidden;
    margin: 0 auto;

    img {
      animation: coin-run-animation 2s steps(23) infinite;
      height: 193px;
      margin-top: 19px;
    }
  }

  .c-num {
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    position: absolute;
    left: 15px;
    top: 0px;
  }
}

.mc-box:hover {
  border: 2px dashed #00aeec;
}

.left {
  margin-left: 35px;
  margin-right: 30px;
  background-image: url(../../assets/images/22-coin.png);
  background-size: 120px;
}

.right {
  margin-right: 30px;
  background-image: url(../../assets/images/33-coin.png);
  background-size: 120px;
}

.coin-title {
  font-size: 16px;
  margin-top: 20px;
  color: var(--font-color-black);
  text-align: center;

  span {
    font-size: 30px;
    color: var(--hover-blue);
    text-align: center;
  }
}
</style>