<template>
    <div class="history-record">
        <div class="anchor flex-col">
            <el-button style="margin: 0;" @click="moveInPage(1)" ref="moveToTop">回到顶部</el-button>
            <el-button style="margin: 0;" @click="moveInPage(2)" v-show="conditions.curVData == 1">今日</el-button>
            <el-button style="margin: 0;" @click="moveInPage(3)" v-show="conditions.curVData == 1">昨日</el-button>
            <el-button style="margin: 0;" @click="moveInPage(4)" v-show="conditions.curVData == 1">最近一周</el-button>
            <el-button style="margin: 0;" @click="moveInPage(5)" v-show="conditions.curVData == 1">一周前</el-button>
        </div>
        <div class="main-head flex-row-ac jc-spb public-margin public-padding">
            <h1 class="main-title flex-row-ac">
                <el-icon :size="28" color="#18191c" style="margin-right: 15px;">
                    <Clock />
                </el-icon>历史记录
            </h1>
            <div class="main-actions flex-row-ac">
                <el-switch v-model="openBH" active-text="记录浏览历史" @click="wait" />
            </div>
        </div>
        <div class="main-breadcrumbs public-margin public-padding">
            <div class="breadcrumbs__top flex-row-ac jc-spb">
                <div class="left">
                    <div class="radio-tabs">
                        <div :class="curTab == 1 ? 'radio-tabs__item radio-tabs-active' : 'radio-tabs__item'"
                            @click="onTabClick(1)">综合</div>
                        <div :class="curTab == 2 ? 'radio-tabs__item radio-tabs-active' : 'radio-tabs__item'"
                            @click="onTabClick(2)">视频</div>
                        <div :class="curTab == 3 ? 'radio-tabs__item radio-tabs-active' : 'radio-tabs__item'"
                            @click="onTabClick(3)">直播</div>
                        <div :class="curTab == 4 ? 'radio-tabs__item radio-tabs-active' : 'radio-tabs__item'"
                            @click="onTabClick(4)">专栏</div>
                        <div class="radio-tabs__cursor" :style="`transform: translateX(${10 + (curTab - 1) * 80}px);`">
                        </div>
                    </div>
                </div>
                <div class="right flex-row-ac">
                    <el-input v-model="keyword" style="width: 200px;margin-right: 16px;" placeholder="搜索标题/up主名称">
                        <template #append>
                            <el-button :icon="Search" @click="getByKeyword" />
                        </template></el-input>
                    <el-button :icon="Delete" @click="confirmDialog = true">清空历史</el-button>
                    <el-button :icon="Fold" @click="wait">批量管理</el-button>
                </div>
            </div>
            <div class="breadcrumbs__bottom">
                <!-- TODO B站官方这里的过滤条件是封装成一个组件的估计 -->
                <!-- 目前这里直接复制粘贴视频搜索页面的过滤条件 -->
                <div class="search-condition-row flex-row-ac">
                    <button class="vui_button--tab" @click="durationChange(1, null, null)"
                        :style="conditions.curDuration == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部时长</button>
                    <button class="vui_button--tab" @click="durationChange(2, 0, 600)"
                        :style="conditions.curDuration == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">10分钟以下</button>
                    <button class="vui_button--tab" @click="durationChange(3, 600, 1800)"
                        :style="conditions.curDuration == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">10-30分钟</button>
                    <button class="vui_button--tab" @click="durationChange(4, 1800, 3600)"
                        :style="conditions.curDuration == 4 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">30-60分钟</button>
                    <button class="vui_button--tab" @click="durationChange(5, 3600, null)"
                        :style="conditions.curDuration == 5 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">60分钟以上</button>
                </div>
                <div class="search-condition-row flex-row-ac">
                    <button class="vui_button--tab" @click="dateChange(1, 5)"
                        :style="conditions.curVData == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部时间</button>
                    <button class="vui_button--tab" @click="dateChange(2, 1)"
                        :style="conditions.curVData == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">今日</button>
                    <button class="vui_button--tab" @click="dateChange(3, 2)"
                        :style="conditions.curVData == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">昨日</button>
                    <button class="vui_button--tab" @click="dateChange(4, 3)"
                        :style="conditions.curVData == 4 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">最近一周</button>
                    <button class="vui_button--tab" @click="dateChange(5, 4)"
                        :style="conditions.curVData == 5 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">一周前</button>
                </div>
                <div class="search-condition-row flex-row-ac">
                    <button class="vui_button--tab" @click="deviceChange(1, '')"
                        :style="conditions.curDevice == 1 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">全部设备</button>
                    <button class="vui_button--tab" @click="deviceChange(2, 'PC')"
                        :style="conditions.curDevice == 2 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">PC</button>
                    <button class="vui_button--tab" @click="deviceChange(3, 'PH')"
                        :style="conditions.curDevice == 3 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">手机</button>
                    <button class="vui_button--tab" @click="deviceChange(4, 'PL')"
                        :style="conditions.curDevice == 4 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">平板</button>
                    <button class="vui_button--tab" @click="deviceChange(5, 'TV')"
                        :style="conditions.curDevice == 5 ? 'background-color: #dff6fd;color:#00aeec;' : 'background-color: #fff;'">TV</button>
                </div>
            </div>
        </div>
        <div class="main-content public-margin public-padding">
            <el-timeline>
                <el-timeline-item timestamp="今天" placement="top" id="today">
                    <div class="flex-row jcc" v-show="todayList.length <= 0">
                        <NoData :message1="'暂无数据'"></NoData>
                    </div>
                    <div class="history-section" v-show="todayList.length > 0">
                        <div class="history-card flex-row" v-for="e in todayList" v-show="e.isDelete == 0">
                            <div class="history-card__left" @click="openPage(`/video/${e.vid}`)">
                                <img :src="e.coverUrl" alt="">
                                <div class="bili-cover-card__stats">
                                    <div class="bili-cover-card__stat">
                                        <span>
                                            {{ formatTimeGap(e.duration) + '/' +
                                                formatTimeGap(e.videoDuration) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="bili-cover-card__progress"
                                    :style="`width: ${e.duration / e.videoDuration}%`">
                                </div>
                            </div>
                            <div class="history-card__right">
                                <div class="info__top">
                                    <a class="title" @click="openPage(`/video/${e.vid}`)">{{ e.title }}</a>
                                    <div class="right-actions flex-row-ac">
                                        <el-icon :size="15" @click="deleteOne(e)">
                                            <Delete />
                                        </el-icon>
                                    </div>
                                </div>
                                <div class="info__bottom">
                                    <a class="meta flex-row-ac subtitle" @click="openPage(`/user_page/${e.authorUid}`)">
                                        <i class="iconfont icon-UPzhu"></i>
                                        <div class="text flex-row-ac">{{ e.nickname }}</div>
                                    </a>
                                    <div class="meta flex-row-ac">
                                        <el-icon>
                                            <Iphone />
                                        </el-icon>
                                        <!-- <el-icon><Monitor /></el-icon> -->
                                        <!-- <el-icon><Cellphone /></el-icon> -->
                                        <!-- <el-icon><Platform /></el-icon> -->
                                        {{ '今天' + e.viewTime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-timeline-item>
                <el-timeline-item timestamp="昨天" placement="top" id="yesterday">
                    <div class="flex-row jcc" v-show="yesterdayList.length <= 0">
                        <NoData :message1="'暂无数据'"></NoData>
                    </div>
                    <div class="history-section" v-show="yesterdayList.length > 0">
                        <div class="history-card flex-row" v-for="e in yesterdayList" v-show="e.isDelete == 0">
                            <div class="history-card__left" @click="openPage(`/video/${e.vid}`)">
                                <img :src="e.coverUrl" alt="">
                                <div class="bili-cover-card__stats">
                                    <div class="bili-cover-card__stat">
                                        <span>
                                            {{ formatTimeGap(e.duration) + '/' +
                                                formatTimeGap(e.videoDuration) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="bili-cover-card__progress"
                                    :style="`width: ${e.duration / e.videoDuration}%`">
                                </div>
                            </div>
                            <div class="history-card__right">
                                <div class="info__top">
                                    <a class="title" @click="openPage(`/video/${e.vid}`)">{{ e.title }}</a>
                                    <div class="right-actions flex-row-ac">
                                        <el-icon :size="15" @click="deleteOne(e)">
                                            <Delete />
                                        </el-icon>
                                    </div>
                                </div>
                                <div class="info__bottom">
                                    <a class="meta flex-row-ac subtitle" @click="openPage(`/user_page/${e.authorUid}`)">
                                        <i class="iconfont icon-UPzhu"></i>
                                        <div class="text flex-row-ac">{{ e.nickname }}</div>
                                    </a>
                                    <div class="meta flex-row-ac">
                                        <el-icon>
                                            <Iphone />
                                        </el-icon>
                                        <!-- <el-icon><Monitor /></el-icon> -->
                                        <!-- <el-icon><Cellphone /></el-icon> -->
                                        <!-- <el-icon><Platform /></el-icon> -->
                                        {{ '昨天' + e.viewTime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-timeline-item>
                <el-timeline-item timestamp="近一周" placement="top" id="week">
                    <div class="flex-row jcc" v-show="weekList.length <= 0">
                        <NoData :message1="'暂无数据'"></NoData>
                    </div>
                    <div class="history-section" v-show="weekList.length > 0">
                        <div class="history-card flex-row" v-for="e in weekList" v-show="e.isDelete == 0">
                            <div class="history-card__left" @click="openPage(`/video/${e.vid}`)">
                                <img :src="e.coverUrl" alt="">
                                <div class="bili-cover-card__stats">
                                    <div class="bili-cover-card__stat">
                                        <span>
                                            {{ formatTimeGap(e.duration) + '/' +
                                                formatTimeGap(e.videoDuration) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="bili-cover-card__progress"
                                    :style="`width: ${e.duration / e.videoDuration}%`">
                                </div>
                            </div>
                            <div class="history-card__right">
                                <div class="info__top">
                                    <a class="title" @click="openPage(`/video/${e.vid}`)">{{ e.title }}</a>
                                    <div class="right-actions flex-row-ac">
                                        <el-icon :size="15" @click="deleteOne(e)">
                                            <Delete />
                                        </el-icon>
                                    </div>
                                </div>
                                <div class="info__bottom">
                                    <a class="meta flex-row-ac subtitle" @click="openPage(`/user_page/${e.authorUid}`)">
                                        <i class="iconfont icon-UPzhu"></i>
                                        <div class="text flex-row-ac">{{ e.nickname }}</div>
                                    </a>
                                    <div class="meta flex-row-ac">
                                        <el-icon>
                                            <Iphone />
                                        </el-icon>
                                        <!-- <el-icon><Monitor /></el-icon> -->
                                        <!-- <el-icon><Cellphone /></el-icon> -->
                                        <!-- <el-icon><Platform /></el-icon> -->
                                        {{ e.viewTime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-timeline-item>
                <el-timeline-item timestamp="一周前" placement="top" id="lastWeek">
                    <div class="flex-row jcc" v-show="lastWeekList.length <= 0">
                        <NoData :message1="'暂无数据'"></NoData>
                    </div>
                    <div class="history-section" v-show="lastWeekList.length > 0">
                        <div class="history-card flex-row" v-for="e in lastWeekList" v-show="e.isDelete == 0">
                            <div class="history-card__left" @click="openPage(`/video/${e.vid}`)">
                                <img :src="e.coverUrl" alt="">
                                <div class="bili-cover-card__stats">
                                    <div class="bili-cover-card__stat">
                                        <span>
                                            {{ formatTimeGap(e.duration) + '/' +
                                                formatTimeGap(e.videoDuration) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="bili-cover-card__progress"
                                    :style="`width: ${e.duration / e.videoDuration}%`">
                                </div>
                            </div>
                            <div class="history-card__right">
                                <div class="info__top">
                                    <a class="title" @click="openPage(`/video/${e.vid}`)">{{ e.title }}</a>
                                    <div class="right-actions flex-row-ac">
                                        <el-icon :size="15" @click="deleteOne(e)">
                                            <Delete />
                                        </el-icon>
                                    </div>
                                </div>
                                <div class="info__bottom">
                                    <a class="meta flex-row-ac subtitle" @click="openPage(`/user_page/${e.authorUid}`)">
                                        <i class="iconfont icon-UPzhu"></i>
                                        <div class="text flex-row-ac">{{ e.nickname }}</div>
                                    </a>
                                    <div class="meta flex-row-ac">
                                        <el-icon>
                                            <Iphone />
                                        </el-icon>
                                        <!-- <el-icon><Monitor /></el-icon> -->
                                        <!-- <el-icon><Cellphone /></el-icon> -->
                                        <!-- <el-icon><Platform /></el-icon> -->
                                        {{ e.viewTime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
        <el-dialog v-model="confirmDialog" title="Tips" width="500">
            <span>即将清空所有历史记录，确定这样做吗？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="confirmDialog = false">取消</el-button>
                    <el-button type="primary" @click="clearHistory">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { Delete, Fold, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import NoData from '@/components/NoData.vue';
import { HistoryVo, HistoryQueryVo } from '@/api/History/types';
import { formatTimeGap, classifyDate, getTimeRanges } from '@/util';
import { getHistoryList, deleteByUid, deleteSingle } from '@/api/History/index'
import { useUserStore } from '@/util/userStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
//敬请期待
function wait() {
    ElMessage.warning('该功能建设中！')
}
//tab选项卡
const curTab = ref<number>(2);
function onTabClick(key: number) {
    curTab.value = key;
    if (key != 2) ElMessage.warning('该选项建设中！');
}
/**
 * @description 数据处理
 */
const todayList = ref<HistoryVo[]>([]);
const yesterdayList = ref<HistoryVo[]>([]);
const weekList = ref<HistoryVo[]>([]);
const lastWeekList = ref<HistoryVo[]>([]);

const openBH = ref<boolean>(true)
const conditions = reactive({
    curVData: 1,
    curDuration: 1,
    curDevice: 1,
    sortField: ''
})
function deviceChange(id: number, field: string) {
    conditions.curDevice = id
    conditions.sortField = field
    ElMessage.warning('该选项建设中！')
}
function durationChange(curL: number, s: number, e: number) {
    conditions.curDuration = curL
    startDuration.value = s;
    endDuration.value = e;
    reset()
    onGetHistoryList({
        current: curPage.value, size: 15, uid: userStore.userInfo.uid,
        keyword: keyword.value,
        startDuration: startDuration.value,
        endDuration: endDuration.value,
        startTime: startTime.value,
        endTime: endTime.value,
    })
}
function dateChange(id: number, type: number) {
    conditions.curVData = id
    let temp = getTimeRanges(type);
    startTime.value = temp.startDate;
    endTime.value = temp.endDate;
    console.log('startTime: ', startTime.value);
    console.log('endTime: ', endTime.value);
    reset()
    onGetHistoryList({
        current: curPage.value, size: 15, uid: userStore.userInfo.uid,
        keyword: keyword.value,
        startDuration: startDuration.value,
        endDuration: endDuration.value,
        startTime: startTime.value,
        endTime: endTime.value,
    })
}
function clearList() {
    todayList.value = [];
    yesterdayList.value = [];
    weekList.value = [];
    lastWeekList.value = [];
}
//将大数组按时间远近切分成四份
function divide(data: HistoryVo[]) {
    data.forEach(e => {
        if (classifyDate(e.viewTime) == 4) {
            lastWeekList.value.push(e);
        } else if (classifyDate(e.viewTime) == 3) {
            weekList.value.push(e);
        } else if (classifyDate(e.viewTime) == 2) {
            yesterdayList.value.push(e);
        } else if (classifyDate(e.viewTime) == 1) {
            todayList.value.push(e);
        }
    });
}
/**
 * @description 对话框
 */
const confirmDialog = ref<boolean>(false);
/**
 * @description 页面跳转
 */
function openPage(href: string) {
    const url = router.resolve({ path: href });
    window.open(url.href, "_blank");
}
/**
 * @description 滚动相关
 */
function debounce(fn, delay) {//防抖
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
function moveInPage(type: number) {
    if (type == 1) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (type == 2) {
        scrollToElement('today', 70);
    } else if (type == 3) {
        scrollToElement('yesterday', 70);
    } else if (type == 4) {
        scrollToElement('week', 70);
    } else if (type == 5) {
        scrollToElement('lastWeek', 70);
    }
}
function scrollToElement(elementId: string, offset: number) {
    const element = document.getElementById(elementId);
    const elementPosition = element.getBoundingClientRect().top;
    const position = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: position,
        behavior: 'smooth'
    });
}
/**
 * @description 请求相关 
 */
const startTime = ref<string | null>(null);
const endTime = ref<string | null>(null);
const startDuration = ref<number | null>(null)
const endDuration = ref<number | null>(null)
const curTotal = computed(() => {
    return todayList.value.length + yesterdayList.value.length + weekList.value.length + lastWeekList.value.length;
})
const curPage = ref<number>(1);
const keyword = ref<string>('');
const canGet = ref<boolean>(true);//总请求开关
const shake = ref<boolean>(true);//防抖
function reset() {
    clearList()
    curPage.value = 1;
    canGet.value = true;
    shake.value = true;
    moveInPage(1);
}
function getByKeyword() {
    if (keyword.value == '') {
        ElMessage.warning('请输入关键词！')
        return;
    }
    reset()
    onGetHistoryList({
        current: curPage.value, size: 15, uid: userStore.userInfo.uid,
        keyword: keyword.value,
        startDuration: startDuration.value,
        endDuration: endDuration.value,
        startTime: startTime.value,
        endTime: endTime.value,
    });
}
function clearHistory() {
    confirmDialog.value = false;
    reset();
    onDeleteByUid();
}
function deleteOne(e: HistoryVo) {
    e.isDelete = 1;
    onDeleteSingle(e.vid);
}
async function onDeleteSingle(vid: number) {
    try {
        await deleteSingle({ uid: userStore.userInfo.uid, vids: [vid] });
    } catch (error) {
        console.log(error)
    }
}
async function onDeleteByUid() {
    try {
        await deleteByUid({ uid: userStore.userInfo.uid });
    } catch (error) {
        console.log(error)
    }
}
async function onGetHistoryList(params: HistoryQueryVo) {
    try {
        const { data } = await getHistoryList(params);
        divide(data.records);
        curPage.value++;
        shake.value = true;
        if (curTotal.value >= data.total) {
            canGet.value = false;
        }
        ElMessage.success(`新增${data.records.length}条记录`)
    } catch (error) {
        ElMessage.error('获取历史记录失败！');
        console.log(error)
    }
}
onMounted(() => {
    window.addEventListener('scroll', debounce(function () {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition + windowHeight >= documentHeight - 10) {
            if (canGet.value && shake.value) {
                shake.value = false;
                onGetHistoryList({
                    current: curPage.value, size: 15, uid: userStore.userInfo.uid,
                    keyword: keyword.value,
                    startDuration: startDuration.value,
                    endDuration: endDuration.value,
                    startTime: startTime.value,
                    endTime: endTime.value,
                })
            }
        }
    }, 200))
    onGetHistoryList({ current: curPage.value, size: 15, uid: userStore.userInfo.uid })
})
</script>
<style lang="less" scoped>
.radio-tabs-active {
    color: #00aeec !important;
}

.public-margin {
    margin: 0 275px 0 275px;
}

.public-padding {
    padding-left: 72px;
}

.history-record {
    position: relative;
    background-color: #fff;
    padding-top: 90px;

    .anchor {
        position: fixed;
        row-gap: 10px;
        left: 15vw;
        bottom: 12vh;
        min-width: 80px;
        height: auto;
    }

    .main-head {
        margin-bottom: 10px;

        .main-title {
            color: #18191c;
            font-weight: 600;
            font-size: 28px;
            line-height: 40px;

        }
    }

    .main-breadcrumbs {
        padding-top: 14px;
        padding-bottom: 14px;

        .breadcrumbs__top {
            min-height: 46px;

            .left {
                .radio-tabs {
                    position: relative;
                    display: flex;
                    column-gap: 28px;

                    .radio-tabs__item {
                        flex-shrink: 0;
                        min-width: 52px;
                        font-weight: 500;
                        color: #61666d;
                        padding: 12px 10px;
                        line-height: 22px;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all .3s;
                    }

                    .radio-tabs__item:hover {
                        color: #00aeec;
                    }

                    .radio-tabs__cursor {
                        position: absolute;
                        bottom: 0;
                        width: 28px;
                        height: 4px;
                        border-radius: 2px;
                        background-color: #00aeec;
                        transition: all .3s;
                    }
                }
            }
        }
    }

    .main-content {
        padding-top: 15px;

        .history-section {
            display: flex;
            flex-direction: column;
            row-gap: 15px;

            .history-card {
                .history-card__left {
                    position: relative;
                    min-width: 178px;
                    max-height: 101px;
                    width: 178px;
                    height: 100px;
                    background-color: #ffd2d2;
                    border-radius: 8px;
                    cursor: pointer;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .bili-cover-card__stats {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        z-index: 2;
                        box-sizing: border-box;
                        padding: 14px 8px 6px;
                        width: 100%;
                        background-image: linear-gradient(180deg, #0000, #000c);
                        font-size: 13px;
                        opacity: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        pointer-events: none;

                        .bili-cover-card__stat {
                            display: flex;
                            align-items: center;
                            justify-content: end;
                            width: 100%;

                            span {
                                font-size: 13px;
                                color: #fff;
                            }
                        }
                    }

                    .bili-cover-card__progress {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 50;
                        height: 3px;
                        pointer-events: none;
                        background-color: #ff6699;
                    }
                }

                .history-card__right {
                    margin-left: 12px;
                    width: 100%;
                    max-height: 101px;

                    .info__top {
                        position: relative;

                        .title {
                            cursor: pointer;
                            margin-right: 80px;
                            color: #18191c;
                            line-height: 24px;
                            font-size: 16px;
                            font-weight: 500;
                            display: -webkit-box;
                            overflow: hidden;
                            word-break: break-all;
                            line-break: anywhere;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }

                        .title:hover {
                            color: #00aeec;
                        }

                        .right-actions {
                            position: absolute;
                            top: 0;
                            right: 0;
                            height: 24px;
                            cursor: pointer;
                        }
                    }

                    .info__bottom {
                        .meta {
                            width: fit-content;
                            margin-top: 6px;
                            font-size: 14px;
                            color: #9499a0;
                            line-height: 20px;

                            .text {
                                display: -webkit-box;
                                color: inherit;
                                font-size: inherit;
                                line-height: inherit;
                                overflow: hidden;
                                word-break: break-all;
                                line-break: anywhere;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }

                        .subtitle:hover {
                            color: #00aeec;
                        }
                    }
                }
            }
        }
    }
}

.search-condition-row {
    flex-wrap: wrap;

    .vui_button--tab {
        color: #61666d;
        border: none;
        border-radius: 8px;
        margin: 10px 10px 0 0;
        display: inline-block;
        height: 32px;
        padding: 0 15px;
        font-size: 14px;
        transition: all .2s;
    }

    .vui_button--tab:hover {
        color: var(--hover-blue);
    }
}
</style>