<template>
  <div class="user-background">
    <div class="head"></div>
    <div class="page-head">
      <div class="page-head-bgc rpos">
        <img src="../../assets/images/user_page_bcg.webp" alt="" width="100%" height="192px">
        <div class="h-info flex-row pos-left-bottom">
          <div class="avatar-container rpos">
            <img :src="userInfo.avatar" alt="">
            <router-link :to="{ name: 'UserAccount' }"
              class="avatar-cover pos-left-up" v-show="userStore.userInfo.uid == geneUid(route.params.uid.toString())">
              更换头像
            </router-link>
          </div>
          <div class="h-basic flex-col-al">
            <div class="name-list flex-row-ac">
              <span id="h-name">{{ userInfo.nickname }}</span>
              <span id="gender"></span>
              <!-- TODO -->
              <!-- <div class="h-viptype">大会员</div> -->
            </div>
            <div class="h-basic-spacing">
              <!-- TODO -->
              <!-- <h4 class="h-sign">显示编辑后的个性签名</h4> -->
              <input id="h-sign" type="text" :disabled="userStore.userInfo.uid != geneUid(route.params.uid.toString())"
                :placeholder="userStore.userInfo.uid == geneUid(route.params.uid.toString()) ? '编辑个性标签' : '该用户暂无个性标签'"
                @change="descriptionChange" v-model="descriptionInput" class="space-input">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navigator">
      <div class="wrapper flex-row jc-spb">
        <div class="n-tab-links rpos flex-row-ac jc-start">
          <router-link @click="onNavOperate(item.id, true)" v-for="item in UserNavList"
            @mouseenter="onNavOperate(item.id, false)" @mouseleave="onNavOperate(curNavTag, false)" :key="item.id"
            :to="item.href" :class="item.id == curNavTag ? 'flex-row-ac focus' : 'flex-row-ac'">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span class="n-text">{{ item.tag }}</span>
          </router-link>
          <div class="n-search">
            <input placeholder="搜索视频、动态" ref="navSearch"
              @focus="changeStyle(navSearch, new Map<string, string>([['border', '1px solid #00aeec']]))"
              @blur="changeStyle(navSearch, new Map<string, string>([['border', '1px solid #ccd0d7']]))" />
            <span><i class="iconfont icon-faxianweixuanzhongxuanzhong"></i></span>
          </div>
          <div ref="cs" class="n-cursor"></div>
        </div>
        <div class="n-statistics flex-row-ac">
          <div class="n-data flex-col-ac jcc" @click="toFans">
            <p class="n-data-k">关注数</p>
            <p class="n-data-v">{{ formatCount(userStats.followCount) }}</p>
          </div>
          <div class="n-data flex-col-ac jcc" @click="toFans">
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
              <div class="list-create flex-col-ac jcc">
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
                  <li v-for="e in regularList" :key="e.id"
                    :style="e.id == curRegular ? 'color: #00aeec' : 'color: #000'" @click="onRegularChange(e.id)">{{
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
              <textarea :disabled="userStore.userInfo.uid != geneUid(route.params.uid.toString())" type="textarea"
                :placeholder="userStore.userInfo.uid == geneUid(route.params.uid.toString()) ? '编辑我的空间公告' : '暂无公告'"
                maxlength="150" rows="4" @focus="changeStyle(wordCount, new Map<string, string>([['opacity', '1']]))"
                @blur="changeStyle(wordCount, new Map<string, string>([['opacity', '0']]))" @change="noticeChange"
                v-model="noticeTextArea">
                </textarea>
              <div class="be-input-word-counter" ref="wordCount">{{ `${noticeWordCount}/150` }}</div>
            </div>
          </div>
          <div class="section user-info">
            <p class="user-info-title flex-row-ac jc-spb">
              <span class="info-title">个人资料</span>
              <a href="">
                <span class="change-info-btn">修改资料</span>
              </a>
            </p>
            <div class="info-content">
              <div class="info-personal flex-row-ac jc-spb">
                <div class="info-wrap">
                  <span class="info-command">uid</span>
                  <span class="info-value">{{ ` ${route.params.uid.toString()}` }}</span>

                  <span class="info-command" v-show="userStats.birthDate">生日</span>
                  <span class="info-value" v-show="userStats.birthDate">
                    {{ userStats.birthDate ? getFormatCurTime(userStats.birthDate.getTime(), DateStringType.Y_M_D) : ''
                    }}
                  </span>

                  <span class="info-command" v-show="userStats.school && userStats.school != ''">学校</span>
                  <span class="info-value" v-show="userStats.school && userStats.school != ''">{{
                    userStats.school }}</span>

                  <span class="info-command" v-show="userInfo.gender < 2">性别</span>
                  <span class="info-value" v-show="userInfo.gender < 2">
                    {{ userInfo.gender == 0 ? '男' : '女' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'

import { formatCount, formatVideoDuration, getFormatCurTime, changeStyle } from "@/util/index";
import { UserNav, Regular, defaultUserStats, UserStatsQueryVo, defaultUser, UserInfoQueryVo } from "@/api/UserPage/types";
import { UserStats, User, VideoVo, VideoQueryVo } from "@/api/Models";
import VideoCard from "@/components/VideoCard.vue";
import NoData from "@/components/NoData.vue";
import { DateStringType } from "@/api/enums"
import {
  getUserStatsByUid, getUserInfoByUid,
  getVideoListOfUser, updateNotice,
  updateDescription, updateMulti
} from "@/api/UserPage";
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
const followList = ref<User[]>([])
const fansList = ref<User[]>([])
const wordCount = ref<HTMLElement | null>(null);
const noticeWordCount = ref<number>(0)
const noticeTextArea = ref<string>("")
const navCursor = {
  1: { length: "51px", left: "0" },
  2: { length: "51px", left: "81px" },
  3: { length: "51px", left: "162px" },
  4: { length: "90px", left: "243px" },
  5: { length: "51px", left: "363px" },
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
    href: `/user_page/${route.params.uid.toString()}/favlist`
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
//跳转关注/粉丝界面
function toFans() {
  router.push('/user_page/fanslist')
  onNavOperate(1, true)
}
function geneUid(param: string | string[]): number {
  return parseInt(param.toString())
}
function onRegularChange(id: string) {
  curRegular.value = id
  onGetVideoListOfUser({
    size: 10,
    current: 1,
    uid: geneUid(route.params.uid.toString()),
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
//视频排序规则
const curRegular = ref<string>("upload_date");
const regularList: Regular[] = [
  { id: "upload_date", tag: "最新发布" },
  { id: "play", tag: "最多播放" },
  { id: "collect", tag: "最多收藏" },
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
    if(res.data.notice){
      noticeTextArea.value = res.data.notice
      noticeWordCount.value = noticeTextArea.value.length
    }else{
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
onMounted(() => {
  if (route.path.endsWith('/dynamic')) {
    onNavOperate(2, true)
  } else if (route.path.endsWith('/submit')) {
    onNavOperate(3, true)
  } else if (route.path.endsWith('/series')) {
    onNavOperate(4, true)
  } else if (route.path.endsWith('/favlist')) {
    onNavOperate(5, true)
  }
  onGetUserInfoByUid({
    uid: geneUid(route.params.uid.toString())
  })
  onGetUserStatsByUid({
    uid: geneUid(route.params.uid.toString())
  })
  onGetVideoListOfUser({
    size: 10,
    current: 1,
    uid: geneUid(route.params.uid.toString()),
    sortField: curRegular.value
  })
  onUpdateMulti({
    uid: geneUid(route.params.uid.toString())
  })
});
watch(noticeTextArea, (newValue: any) => {
  noticeWordCount.value = newValue.length
});
</script>

<style lang="less" scoped>
//公共
.focus {
  .n-text {
    color: var(--hover-blue);
  }
}

.user-background {
  height: auto;
  background-color: var(--bgc6);
}

.head {
  height: 64px;
}

.page-head {
  height: 192px;

  .page-head-bgc {
    width: 1283px;
    height: 192px;
    margin: auto;

    img {
      object-fit: cover;
    }

    .h-info {
      width: 100%;
      height: 76px;
      padding: 0 0 16px 20px;
      background-image: linear-gradient(to top,
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0));

      .avatar-container {
        width: 60px;
        height: 60px;
        border-radius: 50%;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          object-fit: cover;
        }

        .avatar-cover {
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.6);
          font-size: 12px;
          color: #fff;
          line-height: 60px;
          text-align: center;
          opacity: 0;
          border-radius: 50%;
          transition: opacity 0.2s;
        }

        .avatar-cover:hover {
          opacity: 0.7;
        }
      }

      .h-basic {
        width: 735px;
        height: 60px;
        padding: 5px 0 5px 0;
        margin-left: 22px;

        .name-list {
          width: 735px;
          height: 20px;

          span {
            display: inline-block;
            margin-right: 5px;
          }

          #h-name {
            color: var(--white);
            font-weight: 700;
            line-height: 18px;
            font-size: 18px;
            vertical-align: middle;
          }
        }

        .h-basic-spacing {
          width: 735px;
          height: 26px;
          margin-top: 6px;

          .space-input {
            width: 720px;
            height: 26px;
            padding: 0 5px;
            color: #fff;
            background: transparent;
            font-size: 12px;
            border-radius: 5px;
            border: 1px solid transparent;
            transition: all 0.3s ease;
          }

          .space-input::placeholder {
            color: var(--white);
          }

          .space-input:hover {
            opacity: 0.6;
            background-color: rgba(255, 255, 255, 0.5);
            border: 1px solid white;
          }
        }
      }
    }
  }
}

.navigator {
  height: 66px;
  margin-bottom: 10px;

  .wrapper {
    width: 1283px;
    height: 66px;
    padding: 0 20px;
    background-color: var(--white);
    margin: auto;

    .n-tab-links {
      width: auto;
      height: 100%;
      overflow: hidden;

      a {
        height: 100%;
        width: auto;
        margin-right: 30px;
        cursor: pointer;

        svg {
          height: 20px;
          width: 20px;
          margin-right: 5px;
        }

        .n-text {
          font-size: 13px;
          transition: all 0.3s ease;
        }
      }

      a:hover .n-text {
        color: var(--hover-blue);
      }

      .n-search {
        height: 30px;
        width: 134px;
        position: relative;

        input {
          height: 30px;
          width: 134px;
          padding: 0 29px 0 10px;
          line-height: 30px;
          color: var(--font-color-black2);
          font-size: 12px;
          border-radius: 15px;
          box-shadow: none;
          box-sizing: border-box;
          border: 1px solid #ccd0d7;
          transition: border 0.3s ease;
        }

        span {
          position: absolute;
          right: 8px;
          top: 3px;
          width: 18px;
          height: 30px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        span:hover {
          color: var(--hover-blue);
        }
      }

      .n-cursor {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 54px;
        background-color: var(--hover-blue);
        height: 3px;
        transition: all 0.2s ease;
      }
    }

    .n-statistics {
      height: 100%;
      width: auto;

      .n-data {
        width: auto;
        height: 66px;
        padding: 10px 5px;
        text-align: center;
        cursor: pointer;

        .n-data-k {
          line-height: 14px;
          font-size: 12px;
          color: var(--font-color-gray3);
          transition: color 0.3s ease;
        }

        .n-data-v {
          line-height: 16px;
          margin-top: 5px;
          color: var(--font-color-black2);
          font-size: 12px;
          transition: color 0.3s ease;
        }
      }

      .n-data:hover .n-data-k,
      .n-data:hover .n-data-v {
        color: var(--hover-blue);
      }
    }
  }
}

.total-content {
  width: 1283px;
  margin: auto;

  .col-1 {
    width: 921px;
    height: auto;
    background: var(--white);
    border: 1px solid var(--bgc7);
    border-radius: 4px;
    padding: 15px 20px;

    .section {
      border-bottom: 1px solid var(--bgc7);
      margin-bottom: 17px;
      position: relative;

      .t {
        display: inline-block;
        vertical-align: middle;
        color: var(--black);
      }

      .t:hover {
        color: var(--hover-blue);
      }

      .count {
        display: inline-block;
        background-color: var(--bgc6);
        border: 1px solid var(--bgc1);
        border-radius: 3px;
        color: var(--font-color-gray2);
        font-size: 12px;
        line-height: 18px;
        height: 18px;
        margin-left: 11px;
        padding: 0 5px;
        vertical-align: middle;
      }

      .more {
        position: absolute;
        top: 6px;
        right: 0;
        border: 1px solid var(--line_regular);
        border-radius: 4px;
        color: var(--font-color-gray3);
        font-size: 12px;
        line-height: 22px;
        transition: border 0.2s ease;
        padding: 0 8px 0 10px;

        i {
          font-size: 12px;
        }
      }
    }

    .i-pin-v {
      padding-bottom: 20px;

      .i-pin-part {
        .list-create {
          width: 280px;
          height: 175px;
          text-align: center;
          cursor: pointer;
          background: #fff;
          border: 2px dashed #b8c0cc;
          border-radius: 4px;
          transition: border 0.3s ease;

          .icon {
            width: 40px;
            height: 40px;

            i {
              transition: color 0.3s ease;
              font-size: 40px;
              font-weight: 700;
              color: var(--font-color-gray3);
            }
          }

          .text {
            line-height: 16px;
            margin-top: 15px;
            color: var(--font-color-gray2);
            transition: color 0.3s ease;
          }
        }

        .list-create:hover {
          border: 2px dashed var(--hover-blue);
        }

        .list-create:hover .text,
        .list-create:hover .icon i {
          color: var(--hover-blue);
        }

        .no-video {
          margin-left: 20px;
          width: 288px;
          height: 139px;
        }
      }
    }

    .video {
      .section-title {
        font-size: 20px;
        font-weight: 400;
        line-height: 33px;
        padding: 0 0 15px;

        a {
          transition: all 0.3s ease;
        }

        .be-tab {
          display: inline-block;
          line-height: 18px;
          vertical-align: middle;
          margin-left: 10px;

          ul li {
            cursor: pointer;
            display: inline;
            margin-right: 15px;
            font-size: 12px;
          }
        }
      }

      .no-data {
        padding: 15px 0;
      }

      .v-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 20px;
        width: 880px;
        max-height: 400px;
        padding-bottom: 15px;
        overflow: hidden;
      }
    }
  }

  .col-2 {
    width: 350px;
    height: auto;

    .section {
      background: #fff;
      border: 1px solid var(--bgc7);
      border-radius: 4px;
      padding: 15px 20px 18px;
      margin-bottom: 10px;
    }

    .section-title {
      border-bottom: 1px solid #e5e9ef;
      font-size: 14px;
      font-weight: 700;
      padding: 0;
      margin: -15px 0 10px;
      height: 45px;
      line-height: 45px;
      color: var(--font-color-black);
    }

    .i-m-r1 {
      width: 100%;
      height: 53px;
      text-align: center;
      padding: 0 10px 13px;

      span {
        display: block;
        width: 120px;
        height: 34px;
        background: url(../../assets/images/创作中心.png) no-repeat;
        background-size: 100% 100%;
      }

      i {
        display: block;
        padding-top: 4px;
        width: 28px;
        height: 28px;
      }
    }

    .i-m-r2 {
      width: 100%;
      height: 36px;
      border: 1px solid var(--bgc8);
      border-radius: 4px;
      padding: 7px 0;

      a {
        display: inline-block;
        color: var(--font-color-gray2);
        text-align: center;
        width: 152px;
        line-height: 20px;
        transition: color 0.3s ease;
      }

      a:hover {
        color: var(--hover-blue);
      }

      .i-m-upload {
        border-right: 1px solid var(--bgc8);
      }
    }

    .i-nna {
      .content {
        textarea {
          width: 306px;
          height: 172px;
          color: var(--font-color-gray1);
          font-size: 12px;
          font-family: Microsoft Yahei;
          line-height: 20px;
          padding: 10px;
          margin: -10px 0 0 -11px;
          border: 1px solid transparent;
          border-radius: 4px;
          box-sizing: content-box;
          resize: none;
          transition: border 0.3s ease;
        }

        textarea:hover {
          border: 1px solid var(--hover-blue);
        }

        .be-input-word-counter {
          position: absolute;
          right: 0;
          bottom: 3px;
          height: 30px;
          min-width: 40px;
          padding: 0 10px;
          line-height: 30px;
          text-align: center;
          font-size: 12px;
          color: var(--font-color-gray3);
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
      }
    }

    .user-info {
      .user-info-title {
        -ms-flex-pack: justify;
        box-sizing: border-box;
        padding-bottom: 18px;
        border-bottom: 1px solid var(--bgc8);
        margin-bottom: 10px;

        .info-title {
          line-height: 23px;
          font-size: 14px;
          color: var(--font-color-black2);
          font-family: Microsoft YaHei;
        }

        .change-info-btn {
          display: inline-block;
          width: 56px;
          height: 22px;
          color: var(--font-color-gray1);
          border: 0.5px solid #c0c9d4;
          text-align: center;
          font-size: 12px;
          line-height: 22px;
          border-radius: 4px;
        }
      }

      .info-content {
        vertical-align: baseline;

        .info-personal {
          flex-wrap: wrap;
          width: 100%;

          .info-wrap {
            flex-shrink: 0;
            width: 139px;
            margin: 10px 0;
            white-space: nowrap;

            .info-command {
              display: inline-block;
              min-width: 24px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              line-height: 16px;
              color: var(--font-color-gray1);
              margin-right: 6px;
            }

            .info-value {
              color: #61666d;
              font-family: Microsoft YaHei;
              font-size: 12px;
              line-height: 16px;
              padding-right: 36px;
            }
          }
        }
      }
    }
  }
}
</style>