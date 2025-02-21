<!-- TODO 尝试将部分组件封装成模块，比如clear清空按钮、history-item标签等 -->
<template>
  <div :class="is_main_window && scrollFlag ? 'navBar' : 'navBar bgc-w navBar-shadow'">
    <!-- 导航栏内部组件 -->
    <div class="nav-left">
      <ul>
        <li>
          <router-link to="/main_window">
            <img alt="" width="60px" height="28px" src="./assets/images/Video-LOGO.png"
              v-show="!(is_main_window && scrollFlag)" />
            <i class="iconfont icon-xiankuangjiazaishibaidaitiicon fp-little-icon"
              v-show="is_main_window && scrollFlag"></i>
            <span id="first-page" :class="is_main_window && scrollFlag ? 'navBar-b-color' : 'navBar-a-color'"
              @mouseenter="switchDialog('firstPage')">首页&nbsp;
              <i class="iconfont icon-arrow" id="first-page-arrow"></i>
            </span>
          </router-link>
        </li>
        <li><a href=""><span
              :class="is_main_window && scrollFlag ? 'jump-left navBar-b-color' : 'jump-left navBar-a-color'">番剧</span></a>
        </li>
        <li><a href=""><span
              :class="is_main_window && scrollFlag ? 'jump-left navBar-b-color' : 'jump-left navBar-a-color'">直播</span></a>
        </li>
        <li><a href=""><span
              :class="is_main_window && scrollFlag ? 'jump-left navBar-b-color' : 'jump-left navBar-a-color'">游戏中心</span></a>
        </li>
      </ul>
    </div>

    <div class="nav-mid">
      <div ref="searchBox"
        :class="show_search_panel == 1 ? 'search-box shadow bgc-w' : 'search-box bgc-search-box-dark'">
        <div :class="show_search_panel == 1 ? 'head' : 'head head-bgc'">
          <form>
            <div class="search-content">
              <input type="text" @focus="show_search_panel = 1" :placeholder="placeHolder" @input="show_clear = 1"
                v-model="search_input">
              <div class="clear" v-show="show_clear == 1" @click="clearSearchInput">
                <el-icon color="var(--white)" size="10">
                  <Close />
                </el-icon>
              </div>
            </div>
            <div class="search-btn" @click="jumpTo('/searchResult/all', true, true, { keyword: search_input })">
              <el-icon size="16" color="#000">
                <Search />
              </el-icon>
            </div>
          </form>
        </div>
        <div class="body" v-show="show_search_panel == 1">
          <div class="search-history">
            <div class="history-head">
              <span class="title">搜索历史</span>
              <span class="clear">清空</span>
            </div>
            <div class="history-content">
              <div v-for="item in search_history" class="history-item"
                :class="{ showItemClear: show_item_clear === item.id }" @mouseenter="show_item_clear = item.id"
                @mouseleave="show_item_clear = -1">{{ item.content }}
                <div class="history-item-clear">
                  <el-icon color="var(--white)" size="12">
                    <Close />
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="popular">
            <div class="popular-head">
              <span>当前热搜</span>
            </div>
            <div class="popular-content">
              <div class="pop-content-left">
                <div v-for="(item, index) in popular_list" class="pop-title-item" v-show="index % 2 === 0 && index <= 8"
                  @click="openNewPage(item.href, true)">
                  <span class="pop-order" :style="(index + 1) <= 3 ? 'color: #18191c;' : 'color:9499a0:'">{{ index + 1
                    }}</span>
                  <span class="pop-title">{{ item.title }}</span>
                </div>
              </div>
              <div class="pop-content-right">
                <div v-for="(item, index) in popular_list" class="pop-title-item" v-show="index % 2 === 1 && index <= 9"
                  @click="openNewPage(item.href, true)">
                  <span class="pop-order" :style="(index + 1) <= 3 ? 'color: #18191c;' : 'color:9499a0:'">{{ index + 1
                    }}</span>
                  <span class="pop-title">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-right">
      <div class="avatar-box">
        <a class="avatar" v-show="login.isLogin" @mouseenter="switchDialog('user')">
          <img
            :src="userData.avatar ? userData.avatar : 'https://morton321.oss-cn-hangzhou.aliyuncs.com/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-02-11%20232613.png'"
            alt="">
        </a>
        <div class="un-login" v-show="!login.isLogin" @click="onLoginBtnClick(true, false)">登录</div>
      </div>
      <div>
        <router-link to="/message_center" target="_blank" @mouseenter="switchDialog('message')">
          <el-icon :color="is_main_window && scrollFlag ? 'var(--white)' : '#000'" size="20" class="jump-right">
            <Message />
          </el-icon>
          <span :class="is_main_window && scrollFlag ? 'navBar-b-color' : 'navBar-a-color'">消息</span>
        </router-link>
      </div>
      <div>
        <a href="" @mouseenter="switchDialog('dynamics')">
          <el-icon :color="is_main_window && scrollFlag ? 'var(--white)' : '#000'" size="20" class="jump-right">
            <Connection />
          </el-icon>
          <span :class="is_main_window && scrollFlag ? 'navBar-b-color' : 'navBar-a-color'">动态</span>
        </a>
      </div>
      <div>
        <a href="" @mouseenter="switchDialog('collect')">
          <el-icon :color="is_main_window && scrollFlag ? 'var(--white)' : '#000'" size="20" class="jump-right">
            <Star />
          </el-icon>
          <span :class="is_main_window && scrollFlag ? 'navBar-b-color' : 'navBar-a-color'">收藏</span>
        </a>
      </div>
      <div>
        <a href="" @mouseenter="switchDialog('browsingHistory')">
          <el-icon :color="is_main_window && scrollFlag ? 'var(--white)' : '#000'" size="20" class="jump-right">
            <Clock />
          </el-icon>
          <span :class="is_main_window && scrollFlag ? 'navBar-b-color' : 'navBar-a-color'">历史</span>
        </a>
      </div>
      <div>
        <button class="submit" @click="jumpTo('/upload_manager', true, false, {})">
          <i class="iconfont icon-shangchuan"></i>
          &nbsp;投稿
        </button>
      </div>
    </div>
    <!-- 悬浮窗 -->
    <!-- 首页分区 -->
    <Dialog :dWidth="'608px'" :dHeight="'auto'" :dPos="'top: 70px; left: 40px; background: var(--white);'"
      v-show="show_dialog['firstPage']" @mouseleave="show_dialog['firstPage'] = false">
      <template #body>
        <div class="first-page-dialog">
          <div class="fpd-col">
            <a v-for="(item, index) in partition_list" :key="item.id" href="" v-show="index % 4 === 0">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`${item.icon}`"></use>
              </svg>
              <span>{{ item.name }}</span>
            </a>
          </div>
          <div class="fpd-col">
            <a v-for="(item, index) in partition_list" :key="item.id" href="" v-show="index % 4 === 1">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`${item.icon}`"></use>
              </svg>
              <span>{{ item.name }}</span>
            </a>
          </div>
          <div class="fpd-col">
            <a v-for="(item, index) in partition_list" :key="item.id" href="" v-show="index % 4 === 2">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`${item.icon}`"></use>
              </svg>
              <span>{{ item.name }}</span>
            </a>
          </div>
          <div class="fpd-col">
            <a v-for="(item, index) in partition_list" :key="item.id" href="" v-show="index % 4 === 3">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`${item.icon}`"></use>
              </svg>
              <span>{{ item.name }}</span>
            </a>
          </div>
        </div>
      </template>
    </Dialog>
    <!-- 消息 -->
    <Dialog :dWidth="'142px'" :dHeight="'auto'" :dPos="'top: 70px; right: 270px; background: var(--white);'"
      v-show="show_dialog['message']" @mouseleave="show_dialog['message'] = false">
      <template #body>
        <div class="msg-type">
          <a v-for="item in msg_type" :key="item.id" href="" class="msg-type-item jc-spb">
            <span>{{ item.name }}</span>
            <div class="red-dot" v-show="unread[item.key] > 0"></div>
          </a>
        </div>
      </template>
    </Dialog>
    <!-- 动态 -->
    <Dialog :dWidth="'366px'" :dHeight="'auto'" :dPos="'top: 70px; right: 120px; background: var(--white);'"
      v-show="show_dialog['dynamics']" @mouseleave="show_dialog['dynamics'] = false">
      <template #body>
        <div class="dynamics-body">
          <div class="dynamics-head">
            <span class="living">正在直播</span>
            <span class="learn-more">查看更多></span>
          </div>
          <div class="dynamics-living">
            <div v-for="(item, index) in dynamics['LiveS_streaming']" :key="item.id" class="living-user"
              v-show="index <= 4">
              <div class="ablu">
                <el-avatar :size="40" :src="item.src" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </div>
              <div class="up-name">{{ item.name }}</div>
            </div>
          </div>
          <div class="divider"><el-divider content-position="center">历史动态</el-divider></div>
          <div class="dynamics-list" v-for="item in dynamics['dynamics']" :key="item.id">
            <div class="dylist-ava">
              <div class="dylist-avaBox">
                <el-avatar :size="36" :src="item.avatar" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </div>
            </div>
            <div class="dylist-des">
              <a class="name">{{ item.name }}</a>
              <div class="title nto2">{{ item.title }}</div>
              <span class="time">{{ item.time }}</span>
            </div>
            <div class="dylist-img">
              <div class="img"></div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <!-- 收藏 -->
    <div class="collect-dia" v-show="show_dialog['collect']" @mouseleave="show_dialog['collect'] = false">
      <div class="folders">
        <div v-for="(item, index) in favorites_list" :key="item.id" @click="onChangeCurActivated(item.id, item.name)"
          class="folders-item" v-show="index <= 9"
          :style="cur_activated == item.id ? 'background-color:#00aeec;' : 'background-color:#fff;'">
          <span class="name" :style="cur_activated == item.id ? 'color:#fff;' : 'color:#18191c;'">{{ item.name }}</span>
          <span class="number" :style="cur_activated == item.id ? 'color:#fff;' : 'color:#9499a0;'">{{ item.number
            }}</span>
        </div>
      </div>
      <div class="folder">
        <div class="collected-videos">
          <a v-for="item in favorites[cur_favorite_folder]" :key="item.id" class="collected-item">
            <div class="img">
              <span class="tag time-tag">{{ item.time }}</span>
            </div>
            <div class="des">
              <div class="title">{{ item.title }}</div>
              <div class="name">
                <i class="iconfont icon-UPzhu"></i>&nbsp;
                <span>{{ item.name }}</span>
              </div>
            </div>
          </a>
        </div>
        <div class="operate">
          <a>查看全部</a>
          <a class="play-all"><i class="iconfont icon-bofangqi-bofang"></i>&nbsp;播放全部</a>
        </div>
      </div>
    </div>
    <!-- 浏览历史 -->
    <Dialog :dWidth="'370px'" :dHeight="'auto'" :dPos="'top: 70px; right: 80px; background: var(--white);'"
      v-show="show_dialog['browsingHistory']" @mouseleave="show_dialog['browsingHistory'] = false">
      <template #head>
        <div class="bh-head">
          <div :class="cur_bh == '视频' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '视频'">视频</div>
          <div :class="cur_bh == '直播' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '直播'">直播</div>
          <div :class="cur_bh == '专栏' ? 'activated-bh' : 'unActivated-bh'" @click="cur_bh = '专栏'">专栏</div>
        </div>
      </template>
      <template #body>
        <div class="bh-list">
          <!-- 视频、直播 -->
          <div class="bh-list-item" v-for="item in bh_list[cur_bh]" :key="item.id"
            v-show="cur_bh == '视频' || cur_bh == '直播'">
            <div class="img">
              <span class="tag time-tag" v-show="cur_bh === '视频'">{{ item.time }}</span>
              <span class="tag isLiving" v-show="cur_bh === '直播' && item.is_living">直播中</span>
              <span class="tag unLiving" v-show="cur_bh === '直播' && !item.is_living">未开播</span>
            </div>
            <div class="des">
              <div class="title">{{ item.title }}</div>
              <div class="time">
                <i class="iconfont icon-lishijilu"></i>
                &nbsp;<span>{{ item.hisTime }}</span>
              </div>
              <div class="name">
                <i class="iconfont icon-UPzhu"></i>
                &nbsp;<span>{{ item.name }}</span>
              </div>
            </div>
          </div>
          <!-- 专栏 -->
          <div class="bh-list-item" v-for="item in bh_list[cur_bh]" :key="item.id" v-show="cur_bh == '专栏'">
            <div class="des">
              <div class="title">{{ item.title }}</div>
              <div class="time">
                <i class="iconfont icon-lishijilu"></i>
                &nbsp;<span>{{ item.hisTime }}</span>
              </div>
              <div class="name">
                <i class="iconfont icon-UPzhu"></i>
                &nbsp;<span>{{ item.name }}</span>
              </div>
            </div>
            <div class="img-right"></div>
          </div>
        </div>
      </template>
    </Dialog>
    <!-- 个人 -->
    <Dialog :dWidth="'300px'" :dHeight="'auto'" :dPos="'top: 70px; right: 300px; background: var(--white);'"
      v-show="userData && show_dialog['user']" @mouseleave="show_dialog['user'] = false">
      <template #body>
        <div class="user-panel">
          <a href="" class="nick-name">{{ userData.nickname }}</a>
          <div class="account">
            <span>硬币：</span>
            <a href="">{{ userData.coin }}&nbsp;</a>
            <span>V币：</span>
            <a href="">0</a>
          </div>
          <div class="socialize">
            <div class="socialize-item">
              <div class="count">0</div>
              <div class="socialize-type">关注</div>
            </div>
            <div class="socialize-item">
              <div class="count">0</div>
              <div class="socialize-type">粉丝</div>
            </div>
            <div class="socialize-item">
              <div class="count">0</div>
              <div class="socialize-type">动态</div>
            </div>
          </div>
          <router-link :to="`/user_page/${userStore.userInfo.uid}`" target="_blank" class="details">
            <div>
              <i class="iconfont icon-yonghu"></i>&nbsp;
              <span>个人中心</span>
            </div>
            <i class="iconfont icon-gengduo details-right-arrow"></i>
          </router-link>
          <router-link to="/upload_manager" target="_blank" class="details">
            <div>
              <i class="iconfont icon-tougaoguanli"></i>&nbsp;
              <span>投稿管理</span>
            </div>
            <i class="iconfont icon-gengduo details-right-arrow"></i>
          </router-link>
          <a href="" class="details">
            <div>
              <i class="iconfont icon-shoucang"></i>&nbsp;
              <span>推荐服务</span>
            </div>
            <i class="iconfont icon-gengduo details-right-arrow"></i>
          </a>
          <el-divider style="margin: 15px 0;" />
          <a class="details" @click="callLogout">
            <div>
              <i class="iconfont icon-tuichudenglu"></i>&nbsp;
              <span>退出登录</span>
            </div>
            <i class="iconfont icon-gengduo details-right-arrow"></i>
          </a>
        </div>
      </template>
    </Dialog>
  </div>
  <div id="login-dialog" class="flex-row-ac jcc" v-show="login.dialog">
    <div class="bili-mini-content-wp flex-row jcc"
      :style="login.isInputPass ? `background-image:url(${lp}),url(${rp});` : `background-image:url(${lunp}),url(${runp});`">
      <div class="bili-mini-close-icon" @click="login.dialog = false"></div>
      <div class="login-scan-wp flex-col-ac">
        <div class="login-scan-title">扫描二维码登录</div>
        <div class="login-scan-hover-wp flex-row-ac jcc">TODO</div>
        <div class="login-scan-desc">
          <p>TODO</p>
        </div>
      </div>
      <div class="bili-mini-line"></div>
      <div class="bili-mini-login-right-wp flex-col-ac">
        <div class="login-tab-wp flex-row jcc">
          <div :class="login.isReg ? 'login-tab-item unac' : 'login-tab-item ac'" @click="login.isReg = false">密码登录
          </div>
          <div class="login-tab-line"></div>
          <div :class="login.isReg ? 'login-tab-item ac' : 'login-tab-item unac'" @click="login.isReg = true">注册</div>
        </div>
        <div class="login-pwd-wp">
          <form class="tab__form" v-show="!login.isReg">
            <div class="form__item flex-row-ac jc-start">
              <div class="form_info">账号</div>
              <input type="text" autocomplete="on" maxlength="9" oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入账号" v-model="login.account">
            </div>
            <div class="form__separator-line"></div>
            <div class="form__item flex-row-ac jc-start">
              <div class="form_info">密码</div>
              <input type="password" autocomplete="on" maxlength="16" oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入密码" @focus="login.isInputPass = true" @blur="login.isInputPass = false"
                v-model="login.password">
            </div>
          </form>
          <form class="tab__form" v-show="login.isReg">
            <div class="form__item flex-row-ac jc-start">
              <div class="form_info">昵称</div>
              <input type="text" autocomplete="on" maxlength="20" oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入用户名" v-model.trim="login.nickname">
            </div>
            <div class="form__separator-line"></div>
            <div class="form__item flex-row-ac jc-start">
              <div class="form_info">密码</div>
              <input type="password" autocomplete="on" maxlength="16" oninput="value=value.replace(/\s+/g, '')"
                placeholder="请输入密码" @focus="login.isInputPass = true" @blur="login.isInputPass = false"
                v-model="login.password">
            </div>
          </form>
          <div :class="login.isReg ? 'btn_wp flex-row jcc' : 'btn_wp flex-row jc-spb'">
            <div class="btn_other" v-show="!login.isReg" @click="onLoginBtnClick(true, true)">注册</div>
            <div class="btn_other" v-show="login.isReg" @click="callRegister">注册</div>
            <div class="btn_primary" v-show="!login.isReg" @click="callLogin">登录</div>
          </div>
        </div>
      </div>
      <div class="login-agreement-wp">
        <p>TODO——TODO——</p>
        <p>TODO——TODO——TODO——TODO——</p>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";

import { ref, onMounted, onBeforeUnmount, reactive, watch } from "vue";
import { useRouter, LocationQueryRaw } from 'vue-router';

import Dialog from "./components/Dialog.vue";
import lp from '@/assets/images/login_password_left.png';
import rp from '@/assets/images/login_password_right.png';
import lunp from '@/assets/images/login_left_image.png';
import runp from '@/assets/images/login_right_image.png';
import { useUserStore } from '@/util/userStore'
import { validateAccount, validatePass, openNewPage } from "./util";
import { LOGIN_URL } from "./util/config";

import {
  partitonList, Partition, defaultUser, onLogin,
  getUserInfoByUid, onRegister, popular_list, getUnreadByUid,
  DefaultUnread, msg_type
} from '@/api/app'
import { Unread } from "./api/UserPage/types";
import { User } from '@/api/Models'

import '@/styles/app.less'

/**
 * @description: 重要或静态变量
 * @returns {*}
 */
const userStore = useUserStore()
const router = useRouter();
//分区列表
const partition_list = ref<Partition[]>(partitonList)

const searchBox = ref<HTMLDivElement | null>(null)

/**
 * @description: HTML绑定数据
 * @returns {*}
 */
//登录项
const login = reactive({
  account: "",
  password: "",
  nickname: "",
  dialog: false,
  isLogin: false,//是否已登录
  isPassword: true,
  isReg: false,
  isInputPass: false
})
//当前激活项
const cur_activated = ref(1)
const cur_favorite_folder = ref("默认收藏夹")
const cur_bh = ref("视频")
//二项标志
const show_item_clear = ref(-1)
const show_search_panel = ref(-1)
const show_clear = ref(-1)
const show_dialog = reactive({
  firstPage: false,
  message: false,
  dynamics: false,
  collect: false,
  browsingHistory: false,
  user: false,
})
//输入框绑定
const placeHolder = ref("某知名UP主 1小时前更新")
const search_input = ref("")
//搜索历史列表
const search_history = ref([
  { id: 1, content: "前端" },
  { id: 2, content: "css3" },
  { id: 3, content: "java" },
])
const unread = ref<Unread>(DefaultUnread)

//动态列表
const dynamics = ref({
  LiveS_streaming: [
    { id: 1, name: "用户", src: "" },
    { id: 2, name: "用户123456用户123456用户123456", src: "" },
    { id: 3, name: "模组的", src: "" },
    { id: 4, name: "aKdn789", src: "" },
    { id: 5, name: "用户123456", src: "" },
    { id: 6, name: "用户123456", src: "" },
  ],
  dynamics: [
    {
      id: 1,
      name: "用户123456",
      src: "",
      avatar: "",
      title:
        "视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 2,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 3,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 4,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 5,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 6,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 7,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 8,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 9,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 10,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 11,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
    {
      id: 12,
      name: "用户123456",
      src: "",
      avatar: "",
      title: "视频标题视频标题",
      time: "36分钟前",
    },
  ],
})
//收藏夹列表
const favorites_list = ref([
  { id: 1, name: "默认收藏夹", number: 46 },
  { id: 2, name: "稍后再看", number: 21 },
  { id: 3, name: "我的收藏夹1", number: 0 },
  { id: 4, name: "我的收藏夹2", number: 14 },
])
//收藏列表
const favorites = ref({
  默认收藏夹: [
    {
      id: 1,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 2,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 3,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 4,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 5,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 6,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
  ],
  稍后再看: [
    {
      id: 5,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 6,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
  ],
  我的收藏夹1: [
    {
      id: 5,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 6,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
  ],
  我的收藏夹2: [
    {
      id: 5,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
    {
      id: 6,
      title:
        "高仿B站(微服务版) springcloud项目实战 easylive 计算机毕业设计 简历项目 项目经验",
      name: "程序员老罗",
      src: "",
      time: "1:14:41",
    },
  ],
})
//浏览历史列表
const bh_list = ref({
  视频: [
    {
      id: 1,
      title:
        "标题十五字标题十五字标题十五字标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 2,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 3,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 4,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 5,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 6,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 7,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 8,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 9,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      time: "00:14/14:25",
      hisTime: "今天 12:25",
      src: "",
    },
  ],
  直播: [
    {
      id: 8,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      hisTime: "今天 12:25",
      src: "",
      is_living: true,
    },
    {
      id: 9,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      hisTime: "今天 12:25",
      src: "",
      is_living: false,
    },
  ],
  专栏: [
    {
      id: 8,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      hisTime: "今天 12:25",
      src: "",
    },
    {
      id: 9,
      title: "标题十五字标题十五字标题十五字",
      name: "某UP主",
      hisTime: "今天 12:25",
      src: "",
    },
  ],
})
//用户数据
const userData = ref<User>(defaultUser)

/**
 * @description: 方法&函数
 * @returns {*}
 */
const handleOutSearchbox = (event: MouseEvent) => {
  if (searchBox.value && !searchBox.value.contains(event.target as Node)) {
    show_search_panel.value = -1
  }
}
function onLoginBtnClick(showLoginPanel: boolean, showReg: boolean) {
  login.dialog = showLoginPanel
  login.isReg = showReg
  login.account = ""
  login.password = ""
  login.nickname = ""
}
//页面跳转
function jumpTo(href: string, isBlank: boolean, isQuery: boolean, query: LocationQueryRaw) {
  const url = router.resolve({
    path: href,
    query: isQuery ? query : null
  });
  if (isBlank) {
    window.open(url.href, "_blank");
  } else {
    window.open(url.href);
  }
}
function clearSearchInput() {
  search_input.value = "";
  show_clear.value = -1;
}
//头像加载失败
function errorHandler() {
  return true;
}
function resetFlag() {
  cur_activated.value = 1
  cur_favorite_folder.value = "默认收藏夹"
  cur_bh.value = "视频"
  show_item_clear.value = -1
  show_search_panel.value = -1
  show_clear.value = -1
}
function switchDialog(selected: string) {
  resetFlag();
  //打开其中一个悬浮窗前，关闭其他所有悬浮窗
  for (let key in show_dialog) {
    if (key !== selected) {
      show_dialog[key] = false;
    } else {
      show_dialog[key] = true;
    }
  }
}
function onChangeCurActivated(id: number, name: string) {
  cur_activated.value = id;
  cur_favorite_folder.value = name;
}
//请求
async function callLogin() {
  if (!validateAccount(login.account)) {
    ElMessage.error("账号不符合格式，必须是9位数字！")
    return;
  }
  if (!validatePass(login.password)) {
    ElMessage.error("密码不符合要求，必须是6~16位,且只能由字母、数字、“,.!/”组成！")
    return;
  }
  try {
    const { data } = await onLogin({ username: login.account, password: login.password })
    login.isLogin = true
    userStore.setToken(data)
    login.dialog = false
    const userD = await getUserInfoByUid()
    userStore.setUserInfo(userD.data)
    userData.value = userStore.userInfo

    onGetUnread()
  } catch (error) {
    console.log(error)
  }
}

async function callLogout() {
  login.isLogin = false
  userStore.Logout()
  router.replace(LOGIN_URL)
}

async function callRegister() {
  if (!validatePass(login.password)) {
    ElMessage.error("密码不符合要求，必须是6~16位,且只能由字母、数字、“,.!/”组成！")
    return;
  }
  try {
    const tPass = login.password;
    const res = await onRegister({ nickname: login.nickname, password: login.password })
    ElMessage({
      message: '注册成功！',
      type: 'success',
    })
    login.account = res.data
    login.password = tPass
    callLogin()
  } catch (error) {
    ElMessage.error('注册失败！')
  }
}

async function onGetUnread() {
  if (!userStore.token) {
    ElMessage.error('获取未读消息数量失败！')
    return;
  }
  try {
    const res = await getUnreadByUid({ uid: userStore.userInfo.uid })
    unread.value = res.data
  } catch (error) {
    ElMessage.error('获取未读消息数量失败！')
  }
}

const is_main_window = ref(false)
const scrollFlag = ref(true)
function onBodyScroll(e: any) {
  let scrollTop = e.target.scrollingElement.scrollTop;
  if (is_main_window && scrollFlag && scrollTop >= 100) {
    scrollFlag.value = false
  } else if (is_main_window && scrollFlag && scrollTop < 100) {
    scrollFlag.value = true
  }
}
onMounted(() => {
  document.addEventListener('click', handleOutSearchbox)
  window.addEventListener("scroll", onBodyScroll);
  if (!userStore.token) {
    login.isLogin = false
  } else {
    login.isLogin = true
    if (userStore.userInfo) {
      userData.value = userStore.userInfo
      onGetUnread()
    }
  }
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onBodyScroll);
  window.removeEventListener('click', handleOutSearchbox);
})
watch(() => router.currentRoute.value.path, (toPath) => {
  window.scrollTo({
    top: 0,
  });
  if (toPath == "/main_window") {
    is_main_window.value = true;
  }
  else {
    is_main_window.value = false;
  }
}, { immediate: true, deep: true }
)
</script>

<style scoped lang="less">
.not-password {
  background-image: url(./assets/images/login_left_image.png), url(./assets/images/login_right_image.png);
}

.password {
  background-image: url(./assets/images/login_left_image.png), url(./assets/images/login_right_image.png);
}
</style>