import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainWindow from '@/views/MainWindow/MainWindow.vue'
import Test from '@/views/Test/Test.vue'
import { useUserStore } from '@/util/userStore'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/util/config'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main_window'
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/main_window',
    name: 'main_window',
    component: MainWindow
  },
  {
    path: '/account',
    name: 'UserAccount',
    redirect: '/account/userSetting',
    component: () => import('@/views/UserPage/Account.vue'),
    children: [
      { path: 'userSetting', component: () => import('@/components/UserPage/Account/UserSetting.vue') },
      { path: 'changeAvatar', component: () => import('@/components/UserPage/Account/ChangeAvatar.vue') },
    ]
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    redirect: '/searchResult/all',
    component: () => import('@/views/MainWindow/SearchResult.vue'),
    children: [
      { path: 'all', component: () => import('@/components/MainWindow/All.vue') },
      { path: 'user', component: () => import('@/components/MainWindow/User.vue') },
    ]
  },
  {
    path: '/message_center',
    name: 'MessageCenter',
    redirect: '/message_center/whisper',
    component: () => import('@/views/MessageCenter/MC.vue'),
    children: [
      { name: 'MC_whisper', path: 'whisper', component: () => import('@/components/MessageCenter/Whisper.vue') },
      { name:'MC_system', path: 'system', component: () => import('@/components/MessageCenter/System.vue') },
    ]
  },
  {
    path: '/user_page/:uid',
    name: 'UserPage',
    component: () => import('@/views/UserPage/UserPage.vue'),
    children: [
      { path: 'submit', component: () => import('@/components/UserPage/Submit.vue') },
      { path: 'dynamic', component: () => import('@/components/UserPage/Dynamic.vue') },
      { path: 'series', component: () => import('@/components/UserPage/Series.vue') },
      { path: 'favList', component: () => import('@/components/UserPage/FavList.vue') },
      {
        name: 'userPageFansList',
        path: 'fansList',
        component: () => import('@/components/UserPage/fans/FansList.vue')
      },
    ]
  },
  {
    path: '/video/:vid',
    name: 'Video',
    component: () => import('@/views/Video/Video.vue'),
  },
  {
    path: '/upload_manager',
    name: 'upload_manager',
    redirect: '/upload_manager/upload',
    component: () => import('@/views/UploadManager/UploadManager.vue'),
    children: [
      { name: 'articleManage', path: 'article', component: () => import('@/components/UploadManager/Article.vue') },
      { name: 'upload', path: 'upload', component: () => import('@/components/UploadManager/Upload.vue') },
      { path: 'edit', component: () => import('@/components/UploadManager/EditUpload.vue') },
      { name: 'dataCenter', path: 'data_center', component: () => import('@/components/UploadManager/DataCenter.vue') },
    ]
  },
  {
    path: '/browseHistory',
    name: 'BH',
    component: () => import('@/views/BrowseHistory/BrowseHistory.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
//导航守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 1.判断是访问首页
  if (to.path === LOGIN_URL) {
    // if (userStore.token) return next(from.fullPath)
    return next()
  }
  // 2.判断访问页面是否在路由白名单(不需要登陆)地址中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next()
  // 3.判断是否前往在线视频观看
  const regex = new RegExp('^\/video');
  if (regex.test(to.path)) {
    return next()
  }
  // 4.判断是否有 Token，没有token跳转到首页并且携带原目标路径
  if (!userStore.token) {
    return next({ path: LOGIN_URL, query: { redirect: to.fullPath } })
  }
  // 5.上述条件都不满足，直接放行
  return next()
})
/**
 * @description 路由跳转结束
 * */
// router.afterEach(() => {
//   console.log()
// })
/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  console.warn('路由错误', error.message)
})
export default router